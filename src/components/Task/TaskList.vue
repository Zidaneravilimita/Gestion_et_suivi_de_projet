<template>
  <div class="bg-white rounded shadow p-4">
    <ul class="space-y-4">
      <li v-for="(task, index) in tasks" :key="task.id" class="p-4 border rounded-md">
        <div class="flex justify-between items-center">
          <div>
            <h4 class="text-md font-bold text-gray-800">{{ task.title }}</h4>
            <p class="text-sm text-gray-500">{{ task.description }}</p>
            <p class="text-xs mt-1 text-gray-400">
              Statut : <strong>{{ task.status }}</strong> |
              Priorité : <strong>{{ task.priority }}</strong>
            </p>
          </div>
          <div class="space-x-2">
            <button @click="toggleStatus(task)" class="px-2 py-1 text-sm bg-yellow-400 text-white rounded">
              {{ task.status === 'En attente' ? 'Activer' : 'Mettre en attente' }}
            </button>
            <button @click="setPriority(task)" class="px-2 py-1 text-sm bg-red-500 text-white rounded">
              Priorité
            </button>
            <button @click="editTask(task)" class="px-2 py-1 text-sm bg-blue-500 text-white rounded">
              Modifier
            </button>
            <button @click="deleteTask(task.id)" class="px-2 py-1 text-sm bg-gray-600 text-white rounded">
              Supprimer
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase' 

const tasks = ref([])

const fetchTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'))
    tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erreur lors du chargement des tâches :', error)
  }
}

const toggleStatus = async (task) => {
  const newStatus = task.status === 'En attente' ? 'Active' : 'En attente'
  await updateDoc(doc(db, 'tasks', task.id), { status: newStatus })
  task.status = newStatus
}

const setPriority = async (task) => {
  await updateDoc(doc(db, 'tasks', task.id), { priority: 'Haute' })
  task.priority = 'Haute'
}

const deleteTask = async (id) => {
  if (confirm('Supprimer cette tâche ?')) {
    await deleteDoc(doc(db, 'tasks', id))
    tasks.value = tasks.value.filter(task => task.id !== id)
  }
}

const editTask = async (task) => {
  const newTitle = prompt('Modifier le titre de la tâche :', task.title)
  if (newTitle !== null && newTitle.trim() !== '') {
    await updateDoc(doc(db, 'tasks', task.id), { title: newTitle })
    task.title = newTitle
  }
}

onMounted(fetchTasks)
</script>

<style scoped>
</style>
