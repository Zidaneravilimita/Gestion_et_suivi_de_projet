<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">Gestion des rôles</h3>

    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-800 font-medium">Alice</p>
          <p class="text-sm text-gray-500">Rôle : Administrateur</p>
        </div>
        <select class="border px-2 py-1 rounded">
          <option>Administrateur</option>
          <option>Chef de Projet</option>
          <option>Membre</option>
        </select>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-800 font-medium">Bob</p>
          <p class="text-sm text-gray-500">Rôle : Membre</p>
        </div>
        <select class="border px-2 py-1 rounded">
          <option>Administrateur</option>
          <option>Chef de Projet</option>
          <option>Membre</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
// Cette version est statique — tu pourras plus tard connecter à Firestore
</script>

<style scoped>
</style>
