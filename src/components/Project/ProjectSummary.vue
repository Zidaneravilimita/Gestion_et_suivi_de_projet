<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-blue-100 p-4 rounded-lg shadow text-blue-800">
      <h3 class="text-lg font-semibold">Projets en cours</h3>
      <p class="text-3xl mt-2 font-bold">{{ ongoing }}</p>
    </div>
    <div class="bg-green-100 p-4 rounded-lg shadow text-green-800">
      <h3 class="text-lg font-semibold">Projets terminés</h3>
      <p class="text-3xl mt-2 font-bold">{{ completed }}</p>
    </div>
    <div class="bg-yellow-100 p-4 rounded-lg shadow text-yellow-800">
      <h3 class="text-lg font-semibold">En attente</h3>
      <p class="text-3xl mt-2 font-bold">{{ pending }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase' // assure-toi que ce chemin est correct

const ongoing = ref(0)
const completed = ref(0)
const pending = ref(0)

const fetchProjectCounts = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'projects'))
    snapshot.forEach(doc => {
      const data = doc.data()
      if (data.status === 'En cours') ongoing.value++
      else if (data.status === 'Terminé') completed.value++
      else if (data.status === 'En attente') pending.value++
    })
  } catch (error) {
    console.error('Erreur lors du chargement des projets :', error)
  }
}

onMounted(fetchProjectCounts)
</script>

<style scoped>
</style>
