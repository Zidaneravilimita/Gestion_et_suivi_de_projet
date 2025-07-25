<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 text-black">
    <div>
      <label class="block text-black mb-1">Titre du projet</label>
      <input v-model="title" type="text" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" required />
    </div>

    <div>
      <label class="block text-black mb-1">Description</label>
      <textarea v-model="description" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" rows="3" required></textarea>
    </div>

    <div>
      <label class="block text-black mb-1">Statut</label>
      <select v-model="status" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black">
        <option class="text-black">En cours</option>
        <option class="text-black">En attente</option>
        <option class="text-black">Terminé</option>
      </select>
    </div>

    <div class="flex space-x-4">
      <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Créer</button>
      <button type="button" @click="resetForm" class="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">Annuler</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase' 
import { useToast } from 'vue-toastification'

const toast = useToast()
const title = ref('')
const description = ref('')
const status = ref('En cours')

const handleSubmit = async () => {
  try {
    await addDoc(collection(db, 'projects'), {
      title: title.value,
      description: description.value,
      status: status.value,
      createdAt: new Date()
    })
    toast.success('Projet créé avec succès !')
    resetForm()
  } catch (error) {
    console.error('Erreur Firestore :', error)
    toast.error("Échec de la création du projet.")
  }
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  status.value = 'En cours'
}
</script>

<style scoped>
</style>
