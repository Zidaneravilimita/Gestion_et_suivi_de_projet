<template>
  <div class="bg-white p-6 rounded shadow">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Statistiques des projets</h2>
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = ref(null)
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Répartition des projets par statut' }
  }
}

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'))
    const counts = {
      'En cours': 0,
      'Terminé': 0,
      'En attente': 0,
      'Autre': 0
    }

    querySnapshot.forEach(doc => {
      const status = doc.data().status || 'Autre'
      if (counts[status] !== undefined) {
        counts[status]++
      } else {
        counts['Autre']++
      }
    })

    chartData.value = {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Nombre de projets',
        data: Object.values(counts),
        backgroundColor: ['#3B82F6', '#10B981', '#FBBF24', '#9CA3AF']
      }]
    }
  } catch (err) {
    console.error('Erreur lors du chargement des statistiques :', err)
  }
})
</script>
