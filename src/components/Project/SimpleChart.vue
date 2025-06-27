<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4">Statistiques de tâches</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
} from 'chart.js'

Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Title, Legend)

const chartCanvas = ref(null)

onMounted(() => {
  new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: ['Janvier', 'Février', 'Mars'],
      datasets: [
        {
          label: 'Tâches terminées',
          data: [4, 7, 5],
          backgroundColor: '#3b82f6'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Évolution des tâches'
        },
        legend: {
          display: true
        }
      }
    }
  })
})
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 300px;
}
</style>
