<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border-collapse">
      <thead>
        <tr class="bg-gray-200 text-sm text-gray-700">
          <th class="text-left py-2 px-4">Projet</th>
          <th class="text-left py-2 px-4">Tâche</th>
          <th class="text-left py-2 px-4">Début</th>
          <th class="text-left py-2 px-4">Fin</th>
          <th class="text-left py-2 px-4">Statut</th>
          <th class="text-left py-2 px-4">Progression</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="project in projects" :key="project.id">
          <tr v-if="project.tasks.length === 0" class="bg-gray-50 text-gray-500">
            <td class="py-2 px-4 font-bold text-blue-700">{{ project.name }}</td>
            <td colspan="5" class="italic">Aucune tâche associée</td>
          </tr>
          <tr v-for="(task, index) in project.tasks" :key="index" class="border-t text-sm bg-white hover:bg-gray-50">
            <td v-if="index === 0" :rowspan="project.tasks.length" class="py-2 px-4 font-bold text-blue-700 align-top">
              {{ project.name }}
            </td>
            <td class="py-2 px-4 text-black">{{ task.name }}</td>
            <td class="py-2 px-4 text-black">{{ formatDate(task.start) }}</td>
            <td class="py-2 px-4 text-black">{{ formatDate(task.end) }}</td>
            <td class="py-2 px-4">
              <span :class="statusColor(task.status)" class="px-2 py-1 rounded text-xs">
                {{ task.status }}
              </span>
            </td>
            <td class="py-2 px-4 w-48">
              <div class="w-full bg-gray-200 rounded h-4 overflow-hidden">
                <div
                  class="h-4 text-xs font-semibold text-white text-center"
                  :class="progressColor(task.progress)"
                  :style="{ width: task.progress + '%' }"
                >
                  {{ task.progress }}%
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
})

const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString()
}

const statusColor = (status) => {
  switch (status) {
    case 'En cours':
      return 'bg-yellow-200 text-yellow-800'
    case 'Terminé':
      return 'bg-green-200 text-green-800'
    case 'En attente':
      return 'bg-red-200 text-red-800'
    default:
      return 'bg-gray-200 text-gray-700'
  }
}

const progressColor = (progress) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>

<style scoped>
/* Améliorer le contraste */
table th,
table td {
  color: #1f2937; /* texte plus sombre */
}
</style>
