<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg p-6">
      <h2 class="text-xl font-bold mb-6">Navigation</h2>
      <ul class="space-y-4">
        <li><a href="#overview" class="text-blue-600 hover:underline">Vue d'ensemble</a></li>
        <li><a href="#projects" class="text-blue-600 hover:underline">Projets</a></li>
        <li><a href="#tasks" class="text-blue-600 hover:underline">Tâches</a></li>
        <li><a href="#stats" class="text-blue-600 hover:underline">Statistiques</a></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 bg-gray-100 p-0">
      <!-- Top Navigation -->
      <nav class="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">Bienvenue, <strong>Utilisateur</strong></span>
          <button class="bg-blue-500 text-white px-4 py-2 rounded">Se déconnecter</button>
        </div>
      </nav>

      <!-- Sections -->
      <section id="overview" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <UserProfileCard />
        <RoleManager />
        <UserTaskOverview />
      </section>

      <section id="projects" class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Projets actifs</h2>
        <ProjectSummary />
      </section>

      <section id="tasks" class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Tâches</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskBoard />
          <TaskFilters />
        </div>
      </section>

      <section id="stats" class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Statistiques</h2>
        <SimpleChart />
      </section>
    </div>
  </div>
</template>

<script setup>
import UserProfileCard from '@/components/Users/UserProfileCard.vue'
import RoleManager from '@/components/Users/RoleManager.vue'
import ProjectSummary from '@/components/Project/ProjectSummary.vue'
import TaskBoard from '@/components/Task/TaskBoard.vue'
import TaskFilters from '@/components/Task/TaskFilters.vue'
import UserTaskOverview from '@/components/Users/UserTaskOverview.vue'
import SimpleChart from '@/components/Project/SimpleChart.vue'
</script>

<style scoped>
</style>
