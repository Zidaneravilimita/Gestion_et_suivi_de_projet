<template>
  <div class="bg-white p-6 rounded shadow">
    <!-- Barre de recherche & filtre -->
    <div class="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
      <input v-model="keyword" type="text" placeholder="Rechercher un projet..."
             class="flex-1 mb-3 md:mb-0 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"/>

      <select v-model="statusFilter" class="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black">
        <option value="">Tous les statuts</option>
        <option>En cours</option>
        <option>Terminé</option>
        <option>En attente</option>
      </select>
    </div>

    <!-- Liste filtrée -->
    <div v-for="project in filteredProjects" :key="project.id" class="border p-4 rounded mb-4 shadow-sm">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-black">{{ project.title }}</h3>
          <p class="text-gray-800">{{ project.description }}</p>
          <p class="text-sm text-gray-700 mt-1">
            Statut :
            <span :class="statusClass(project.status)">{{ project.status }}</span>
            | Deadline : {{ project.deadline || '—' }}
          </p>
        </div>
        <div class="flex flex-col items-end space-y-2">
          <button @click="openEditModal(project)" class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Modifier</button>
          <button @click="deleteProject(project.id)" class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Supprimer</button>
        </div>
      </div>
    </div>

    <!-- Pagination basique -->
    <div v-if="hasMore" class="text-center mt-4">
      <button @click="loadMore" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black">Charger plus</button>
    </div>

    <!-- Modale d'édition -->
    <div v-if="editModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4 text-black">Modifier le projet</h3>
        <form @submit.prevent="updateProject">
          <div class="mb-4">
            <label class="block text-sm font-medium text-black">Titre</label>
            <input v-model="editedProject.title" type="text" class="w-full border rounded px-3 py-2 text-black" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-black">Description</label>
            <textarea v-model="editedProject.description" class="w-full border rounded px-3 py-2 text-black" rows="3"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-black">Statut</label>
            <select v-model="editedProject.status" class="w-full border rounded px-3 py-2 text-black">
              <option>En cours</option>
              <option>Terminé</option>
              <option>En attente</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-black">Deadline</label>
            <input v-model="editedProject.deadline" type="date" class="w-full border rounded px-3 py-2 text-black" />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="editModalVisible = false" class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Annuler</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, limit, startAfter, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useToast } from 'vue-toastification'

const toast = useToast()

const projects = ref([])
const lastDoc = ref(null)
const hasMore = ref(true)
const pageSize = 5

const keyword = ref('')
const statusFilter = ref('')

const editModalVisible = ref(false)
const editedProject = ref({})

const statusClass = (status) => {
  return {
    'text-green-600 font-semibold': status === 'Terminé',
    'text-yellow-600 font-semibold': status === 'En attente',
    'text-blue-600 font-semibold': status === 'En cours'
  }
}

const loadProjects = async (initial = false) => {
  try {
    let q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(pageSize))
    if (!initial && lastDoc.value) q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), startAfter(lastDoc.value), limit(pageSize))
    const snap = await getDocs(q)
    if (initial) projects.value = []
    projects.value.push(...snap.docs.map(d => ({ id: d.id, ...d.data() })))
    lastDoc.value = snap.docs[snap.docs.length - 1]
    hasMore.value = snap.docs.length === pageSize
  } catch (e) {
    console.error(e)
  }
}

const loadMore = () => loadProjects()

const filteredProjects = computed(() => {
  return projects.value.filter(p => {
    const matchKeyword = !keyword.value || p.title.toLowerCase().includes(keyword.value.toLowerCase())
    const matchStatus = !statusFilter.value || p.status === statusFilter.value
    return matchKeyword && matchStatus
  })
})

const deleteProject = async (id) => {
  if (confirm('Supprimer ce projet ?')) {
    try {
      await deleteDoc(doc(db, 'projects', id))
      projects.value = projects.value.filter(p => p.id !== id)
      toast.success('Projet supprimé !')
    } catch (e) {
      toast.error("Échec de la suppression")
    }
  }
}

const openEditModal = (project) => {
  editedProject.value = { ...project }
  editModalVisible.value = true
}

const updateProject = async () => {
  try {
    const { id, ...data } = editedProject.value
    await updateDoc(doc(db, 'projects', id), data)
    toast.success('Projet mis à jour !')
    editModalVisible.value = false
    await loadProjects(true)
  } catch (e) {
    toast.error("Échec de la mise à jour")
  }
}

onMounted(() => loadProjects(true))
</script>

<style scoped>
</style>
