<template>
  <div class="space-y-6">
    <div v-if="projects.length === 0" class="text-gray-500">Aucun projet trouvé.</div>
    <div v-else>
      <div v-for="project in projects" :key="project.id" class="bg-white p-4 shadow rounded mb-4">
        <h3 class="text-lg font-bold text-gray-800">{{ project.title }}</h3>
        <p class="text-sm text-gray-600">{{ project.description }}</p>
        <span class="text-xs inline-block mt-2 px-3 py-1 rounded-full"
              :class="getStatusClass(project.status)">{{ project.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

const projects = ref([])

const fetchProjects = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'projects'))
    projects.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erreur lors du chargement des projets :', error)
  }
}

onMounted(fetchProjects)

const getStatusClass = (status) => {
  switch (status) {
    case 'En cours': return 'bg-yellow-100 text-yellow-700';
    case 'En attente': return 'bg-gray-100 text-gray-700';
    case 'Terminé': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-200 text-gray-800';
  }
}
</script>

<style scoped>
/* Ajoutez des styles personnalisés ici si nécessaire */
</style>
