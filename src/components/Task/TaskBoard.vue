<template>
  <div class="bg-white rounded shadow p-4">
    <ul class="space-y-4">
      <li v-for="(task, index) in tasks" :key="index" class="p-4 border rounded-md">
        <div class="flex justify-between items-center">
          <div>
            <h4 class="text-md font-bold text-gray-800">{{ task.title }}</h4>
            <p class="text-sm text-gray-500">{{ task.description }}</p>
            <p class="text-xs mt-1 text-gray-400">Statut : <strong>{{ task.status }}</strong> | Priorité : <strong>{{ task.priority }}</strong></p>
          </div>
          <div class="space-x-2">
            <button @click="toggleStatus(index)" class="px-2 py-1 text-sm bg-yellow-400 text-white rounded">
              {{ task.status === 'En attente' ? 'Activer' : 'Mettre en attente' }}
            </button>
            <button @click="setPriority(index)" class="px-2 py-1 text-sm bg-red-500 text-white rounded">
              Priorité
            </button>
            <button @click="editTask(index)" class="px-2 py-1 text-sm bg-blue-500 text-white rounded">
              Modifier
            </button>
            <button @click="deleteTask(index)" class="px-2 py-1 text-sm bg-gray-600 text-white rounded">
              Supprimer
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tasks = ref([
  {
    title: 'Définir les exigences du projet',
    description: 'Discuter avec le client pour définir les besoins.',
    status: 'Active',
    priority: 'Moyenne'
  },
  {
    title: 'Créer l’interface utilisateur',
    description: 'Design de l’UI avec Tailwind.',
    status: 'En attente',
    priority: 'Basse'
  }
])

const toggleStatus = (index) => {
  tasks.value[index].status = tasks.value[index].status === 'En attente' ? 'Active' : 'En attente'
}

const setPriority = (index) => {
  tasks.value[index].priority = 'Haute'
}

const deleteTask = (index) => {
  if (confirm('Supprimer cette tâche ?')) {
    tasks.value.splice(index, 1)
  }
}

const editTask = (index) => {
  const newTitle = prompt('Modifier le titre de la tâche :', tasks.value[index].title)
  if (newTitle !== null && newTitle.trim() !== '') {
    tasks.value[index].title = newTitle.trim()
  }
}
</script>
