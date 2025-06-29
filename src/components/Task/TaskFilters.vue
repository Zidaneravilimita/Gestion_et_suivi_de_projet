<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">Filtres de tâches</h3>

    <div class="grid gap-4">
      <select v-model="selectedStatus" class="w-full border text-black rounded px-3 py-2" >
        <option value="" class="text-black">-- Statut --</option>
        <option value="todo" class="text-black">À faire</option>
        <option value="in_progress" class="text-black">En cours</option>
        <option value="done" class="text-black">Terminée</option>
      </select>

      <select v-model="selectedPriority" class="w-full border text-black rounded px-3 py-2">
        <option value="" class="text-black">-- Priorité --</option>
        <option value="low" class="text-black">Basse</option>
        <option value="medium" class="text-black">Moyenne</option>
        <option value="high" class="text-black">Haute</option>
      </select>

      <input v-model="searchText" type="text" placeholder="Recherche..." class="w-full border rounded px-3 py-2" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedStatus = ref('')
const selectedPriority = ref('')
const searchText = ref('')
</script>

<style scoped>
</style>
