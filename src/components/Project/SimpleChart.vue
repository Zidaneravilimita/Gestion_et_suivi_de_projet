<template>
  <div class="bg-white p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-6 text-black">Diagramme de Gantt des Projets</h2>
    <GanttChart :projects="projectsWithTasks" />
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
      if (!tasksByProject[data.projectId]) {
        tasksByProject[data.projectId] = []
      }
      tasksByProject[data.projectId].push({
        name: data.title,
        start: new Date(data.startDate),
        end: new Date(data.endDate),
        status: data.status
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
</style>
