<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 text-black">
    <!-- Projet associé -->
    <div>
      <label class="block mb-1">Projet associé</label>
      <select v-model="selectedProject" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option disabled value="">-- Sélectionner un projet --</option>
        <option v-for="project in projects" :key="project.id" :value="project.id">
          {{ project.title }}
        </option>
      </select>
    </div>

    <!-- Titre de la tâche -->
    <div>
      <label class="block mb-1">Titre de la tâche</label>
      <input v-model="title" type="text" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    <!-- Description -->
    <div>
      <label class="block mb-1">Description</label>
      <textarea v-model="description" rows="3" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
    </div>

    <!-- Priorité -->
    <div>
      <label class="block mb-1">Priorité</label>
      <select v-model="priority" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option>Basse</option>
        <option>Moyenne</option>
        <option>Haute</option>
      </select>
    </div>

    <!-- Date limite -->
    <div>
      <label class="block mb-1">Date limite</label>
      <input v-model="deadline" type="date" required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    <!-- Assigner à -->
    <div>
      <label class="block mb-1">Assigner à</label>
      <input v-model="assignee" type="text" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom d'utilisateur ou email" />
    </div>

    <!-- Progression -->
    <div>
      <label class="block mb-1">Progression (%)</label>
      <input v-model.number="progress" type="number" min="0" max="100" required
             class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
             placeholder="0 à 100" />
    </div>

    <!-- Boutons -->
    <div class="flex space-x-4">
      <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Créer</button>
      <button type="button" @click="resetForm" class="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">Annuler</button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { useToast } from 'vue-toastification'

const toast = useToast()

const projects = ref([])
const selectedProject = ref('')
const title = ref('')
const description = ref('')
const priority = ref('Moyenne')
const deadline = ref('')
const assignee = ref('')
const progress = ref(0)

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'))
    projects.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (err) {
    console.error('Erreur lors du chargement des projets :', err)
  }
})

const resetForm = () => {
  selectedProject.value = ''
  title.value = ''
  description.value = ''
  priority.value = 'Moyenne'
  deadline.value = ''
  assignee.value = ''
  progress.value = 0
}

const handleSubmit = async () => {
  try {
    await addDoc(collection(db, 'tasks'), {
      projectId: selectedProject.value,
      title: title.value,
      description: description.value,
      priority: priority.value,
      deadline: deadline.value,
      assignee: assignee.value,
      progress: progress.value,
      createdAt: new Date(),
      status: progress.value === 100 ? 'Terminé' : 'En cours',
    })
    toast.success('Tâche créée avec succès !')
    resetForm()
  } catch (error) {
    console.error('Erreur lors de la création de la tâche :', error)
    toast.error("Échec de la création de la tâche")
  }
}
</script>

<style scoped>
</style>
