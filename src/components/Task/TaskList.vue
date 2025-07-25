<template>
  <div class="bg-white p-6 rounded shadow">
    <div v-for="(task, index) in tasks" :key="task.id" class="border p-4 rounded mb-4 shadow-sm">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-black">{{ task.title }}</h3>
          <p class="text-gray-800">{{ task.description }}</p>
          <p class="text-sm text-gray-700 mt-1">Projet : {{ task.projectTitle }} | Statut : {{ task.status }} | Priorité : {{ task.priority }}</p>
        </div>
        <div class="flex flex-col items-end space-y-2">
          <button @click="openEditModal(task)" class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Modifier</button>
          <button @click="deleteTask(task.id)" class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Supprimer</button>
        </div>
      </div>
    </div>

    <!-- Modale d'édition -->
    <div v-if="editModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold mb-4 text-black">Modifier la tâche</h3>
        <form @submit.prevent="updateTask">
          <div class="mb-4">
            <label class="block text-sm font-medium text-black">Titre</label>
            <input v-model="editedTask.title" type="text" class="w-full border rounded px-3 py-2 text-black" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-black">Description</label>
            <textarea v-model="editedTask.description" class="w-full border rounded px-3 py-2 text-black" rows="3"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-black">Statut</label>
            <select v-model="editedTask.status" class="w-full border rounded px-3 py-2 text-black">
              <option>En cours</option>
              <option>Terminé</option>
              <option>En attente</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-black">Priorité</label>
            <select v-model="editedTask.priority" class="w-full border rounded px-3 py-2 text-black">
              <option>Basse</option>
              <option>Moyenne</option>
              <option>Haute</option>
            </select>
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

const tasks = ref([])
const editModalVisible = ref(false)
const editedTask = ref({})

const loadTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'))
    tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erreur lors du chargement des tâches :', error)
  }
}

const deleteTask = async (taskId) => {
  if (confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
    try {
      await deleteDoc(doc(db, 'tasks', taskId))
      tasks.value = tasks.value.filter(t => t.id !== taskId)
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error)
    }
  }
}

const openEditModal = (task) => {
  editedTask.value = { ...task }
  editModalVisible.value = true
}

const updateTask = async () => {
  try {
    const taskRef = doc(db, 'tasks', editedTask.value.id)
    const { id, ...taskData } = editedTask.value
    await updateDoc(taskRef, taskData)
    await loadTasks()
    editModalVisible.value = false
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error)
  }
}

onMounted(loadTasks)
</script>

<style scoped>
</style>
