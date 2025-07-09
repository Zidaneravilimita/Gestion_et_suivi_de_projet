<template>
  <div class="bg-white p-6 rounded shadow">
    <div v-for="(project, index) in projects" :key="project.id" class="border p-4 rounded mb-4 shadow-sm">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-blue-700">{{ project.title }}</h3>
          <p class="text-gray-600">{{ project.description }}</p>
          <p class="text-sm text-gray-500 mt-1">Statut : {{ project.status }} | Deadline : {{ project.deadline }}</p>
        </div>
        <div class="flex flex-col items-end space-y-2">
          <button @click="editProject(project.id)" class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Modifier</button>
          <button @click="deleteProject(project.id)" class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'

const projects = ref([])

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

const editProject = (projectId) => {
  alert(`Fonction de modification du projet avec ID: ${projectId}`)
  // Vous pouvez naviguer vers une page d'édition ou ouvrir un modal ici
}

onMounted(loadProjects)
</script>

<style scoped>
</style>
