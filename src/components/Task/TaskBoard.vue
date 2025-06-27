<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">Tableau des tâches</h3>

    <ul class="space-y-4">
      <li class="border border-gray-200 rounded p-3 hover:bg-gray-50">
        <h4 class="font-semibold text-blue-700">Créer interface de connexion</h4>
        <p class="text-sm text-gray-500">Assignée à : Alice | Priorité : Haute</p>
      </li>
      <li class="border border-gray-200 rounded p-3 hover:bg-gray-50">
        <h4 class="font-semibold text-blue-700">Intégrer Firebase Auth</h4>
        <p class="text-sm text-gray-500">Assignée à : Bob | Priorité : Moyenne</p>
      </li>
      <li class="border border-gray-200 rounded p-3 hover:bg-gray-50">
        <h4 class="font-semibold text-blue-700">Mettre en place le tableau de bord</h4>
        <p class="text-sm text-gray-500">Assignée à : Clara | Priorité : Basse</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
// À compléter plus tard avec données dynamiques depuis Firestore
</script>

<style scoped>
</style>
