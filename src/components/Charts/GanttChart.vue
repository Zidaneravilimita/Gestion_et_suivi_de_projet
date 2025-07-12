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
        </tr>
      </thead>
      <tbody>
        <template v-for="project in projects" :key="project.id">
          <tr class="bg-gray-100">
            <td class="py-2 px-4 font-bold text-blue-700" :rowspan="project.tasks.length || 1">
              {{ project.name }}
            </td>
            <td v-if="project.tasks.length === 0" colspan="4" class="py-2 px-4 italic text-gray-500">
              Aucune tâche associée
            </td>
          </tr>
          <tr v-for="(task, index) in project.tasks" :key="index" class="border-t">
            <template v-if="index > 0">
              <td class="py-2 px-4">{{ task.name }}</td>
              <td class="py-2 px-4">{{ formatDate(task.start) }}</td>
              <td class="py-2 px-4">{{ formatDate(task.end) }}</td>
              <td class="py-2 px-4">
                <span :class="statusColor(task.status)" class="px-2 py-1 rounded text-xs">
                  {{ task.status }}
                </span>
              </td>
            </template>
            <template v-else>
              <td class="py-2 px-4">{{ task.name }}</td>
              <td class="py-2 px-4">{{ formatDate(task.start) }}</td>
              <td class="py-2 px-4">{{ formatDate(task.end) }}</td>
              <td class="py-2 px-4">
                <span :class="statusColor(task.status)" class="px-2 py-1 rounded text-xs">
                  {{ task.status }}
                </span>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
</script>

<style scoped>
</style>
