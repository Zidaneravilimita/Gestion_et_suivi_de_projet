<template>
  <div class="bg-white p-6 rounded shadow">
    <div v-for="(project, index) in projects" :key="project.id" class="border p-4 rounded mb-4 shadow-sm">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-black">{{ project.title }}</h3>
          <p class="text-gray-800">{{ project.description }}</p>
          <p class="text-sm text-gray-700 mt-1">Statut : {{ project.status }} | Deadline : {{ project.deadline }}</p>
        </div>
        <div class="flex flex-col items-end space-y-2">
          <button @click="openEditModal(project)" class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Modifier</button>
          <button @click="deleteProject(project.id)" class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Supprimer</button>
        </div>
      </div>
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
import { ref, onMounted } from 'vue'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const projects = ref([])
const editModalVisible = ref(false)
const editedProject = ref({})

const loadProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'))
    projects.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erreur lors du chargement des projets :', error)
  }
}

const deleteProject = async (projectId) => {
  if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
    try {
      await deleteDoc(doc(db, 'projects', projectId))
      projects.value = projects.value.filter(p => p.id !== projectId)
    } catch (error) {
      console.error('Erreur lors de la suppression du projet :', error)
    }
  }
}

const openEditModal = (project) => {
  editedProject.value = { ...project }
  editModalVisible.value = true
}

const updateProject = async () => {
  try {
    const projectRef = doc(db, 'projects', editedProject.value.id)
    const { id, ...projectData } = editedProject.value
    await updateDoc(projectRef, projectData)
    await loadProjects()
    editModalVisible.value = false
  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet :", error)
  }
}

onMounted(loadProjects)
</script>

<style scoped>
</style>
