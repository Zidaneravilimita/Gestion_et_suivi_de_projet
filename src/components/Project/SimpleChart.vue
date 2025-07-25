<template>
  <div class="bg-white p-6 rounded shadow overflow-auto">
    <h2 class="text-xl font-bold mb-6 text-black">Diagramme de Gantt des Projets</h2>

    <!-- Composant Gantt -->
    <GanttChart :projects="projectsWithTasks" />

    <!-- Légende des statuts -->
    <div class="mt-6 flex flex-wrap gap-4 text-sm text-gray-800">
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 bg-green-500 rounded-sm"></div>
        <span>Terminé</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 bg-yellow-500 rounded-sm"></div>
        <span>En cours</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-4 h-4 bg-gray-500 rounded-sm"></div>
        <span>En attente</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import GanttChart from '@/components/Charts/GanttChart.vue'

const projectsWithTasks = ref([])

const loadProjectsAndTasks = async () => {
  try {
    const projectSnap = await getDocs(collection(db, 'projects'))
    const taskSnap = await getDocs(collection(db, 'tasks'))

    const tasksByProject = {}

    taskSnap.forEach(doc => {
      const data = doc.data()
      const projectId = data.projectId

      if (!tasksByProject[projectId]) {
        tasksByProject[projectId] = []
      }

      tasksByProject[projectId].push({
        name: data.title,
        start: new Date(data.startDate),
        end: new Date(data.endDate),
        status: data.status,
        progress: data.progress || 0  // ← valeur de progression
      })
    })

    projectsWithTasks.value = projectSnap.docs.map(doc => {
      const project = doc.data()
      return {
        id: doc.id,
        name: project.title,
        tasks: tasksByProject[doc.id] || []
      }
    })
  } catch (error) {
    console.error("Erreur de chargement des projets ou des tâches:", error)
  }
}

onMounted(loadProjectsAndTasks)
</script>

<style scoped>
h2 {
  color: #111827; /* Titre plus foncé */
}

div {
  color: #1a202c; /* Texte en noir foncé */
}

::v-deep(.gantt-chart) {
  color: #000;
  font-size: 13px;
}

::v-deep(.task-label),
::v-deep(.progress-text) {
  color: #111 !important;
  font-weight: 500;
}
</style>