<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside v-show="sidebarOpen" class="w-64 bg-white shadow-lg p-6 fixed top-0 left-0 h-full z-10 overflow-y-auto">
        <h2 class="text-xl font-bold mb-6">Navigation</h2>
        <ul class="space-y-6">
          <li>
            <button @click="toggleMenu('users')" class="w-full text-left font-semibold text-gray-700 cursor-pointer focus:outline-none">
              Utilisateur
            </button>
            <ul v-show="openMenus.includes('users')" class="ml-4 mt-2 space-y-2">
              <li><a href="#user-list" class="text-blue-600 hover:underline">Liste des Utilisateurs</a></li>
            </ul>
          </li>

          <li>
            <button @click="toggleMenu('projects')" class="w-full text-left font-semibold text-gray-700 cursor-pointer focus:outline-none">
              Projets
            </button>
            <ul v-show="openMenus.includes('projects')" class="ml-4 mt-2 space-y-2">
              <li><a href="#projects" class="text-blue-600 hover:underline">Liste des Projets</a></li>
              <li><a href="#ongoing-projects" class="text-blue-600 hover:underline">Projet en Cours</a></li>
              <li><a href="#pending-projects" class="text-blue-600 hover:underline">Projet en Attente</a></li>
              <li><a href="#completed-projects" class="text-blue-600 hover:underline">Projet Terminé</a></li>
            </ul>
          </li>

          <li>
            <button @click="toggleMenu('tasks')" class="w-full text-left font-semibold text-gray-700 cursor-pointer focus:outline-none">
              Tâches
            </button>
            <ul v-show="openMenus.includes('tasks')" class="ml-4 mt-2 space-y-2">
              <li><a href="#create-task" class="text-blue-600 hover:underline">Créer une nouvelle tâche</a></li>
              <li><a href="#task-list" class="text-blue-600 hover:underline">Liste des Tâches</a></li>
            </ul>
          </li>

          <li>
            <button @click="toggleMenu('stats')" class="w-full text-left font-semibold text-gray-700 cursor-pointer focus:outline-none">
              Statistiques
            </button>
            <ul v-show="openMenus.includes('stats')" class="ml-4 mt-2 space-y-2">
              <li><a href="#stats" class="text-blue-600 hover:underline">Voir les Statistiques</a></li>
            </ul>
          </li>
        </ul>
      </aside>

      <!-- Main Content -->
      <div :class="['flex-1 bg-gray-100 overflow-y-auto transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-0']">
        <!-- Top Navigation -->
        <nav class="bg-white p-4 shadow sticky top-0 z-20 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <button @click="sidebarOpen = !sidebarOpen" class="text-gray-700 focus:outline-none">
              <i class="fas fa-bars text-xl"></i>
            </button>
            <h1 class="text-2xl font-bold text-gray-800">Tableau de bord</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">Bienvenue, <strong>Utilisateur</strong></span>
            <button @click="handleLogout" class="bg-blue-500 text-white px-4 py-2 rounded">Se déconnecter</button>
          </div>
        </nav>

        <!-- Sections -->
        <div class="p-8 space-y-8">
          <section id="user-list">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Liste des Utilisateurs</h2>
            <UserProfileCard />
            <RoleManager />
            <UserTaskOverview />
          </section>

          <section id="projects" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Projets actifs</h2>
            <ProjectSummary />
          </section>

          <section id="create-task" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Créer une nouvelle tâche</h2>
            <form class="space-y-4">
              <div>
                <label class="block text-gray-700 mb-1">Titre</label>
                <input type="text" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Titre de la tâche">
              </div>
              <div>
                <label class="block text-gray-700 mb-1">Description</label>
                <textarea class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Description"></textarea>
              </div>
              <div>
                <label class="block text-gray-700 mb-1">Priorité</label>
                <select class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option>Basse</option>
                  <option>Moyenne</option>
                  <option>Haute</option>
                </select>
              </div>
              <div class="flex space-x-4">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Créer</button>
                <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
              </div>
            </form>
          </section>

          <section id="task-list" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Liste des Tâches</h2>
            <TaskBoard />
            <TaskFilters />
          </section>

          <section id="stats" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Statistiques</h2>
            <SimpleChart />
          </section>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white px-6 py-10 shadow mt-auto w-full">
      <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-700">
        <div>
          <h3 class="text-lg font-semibold mb-3">À propos</h3>
          <p>Plateforme pour gérer les projets d'équipe, faciliter la communication et suivre les tâches en toute simplicité.</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Contact</h3>
          <p>Email : <a href="mailto:tahiendrazazidane@gmail.com" class="text-blue-600 hover:underline">tahiendrazazidane@gmail.com</a></p>
          <p>Tél : +261 32 68 792 14</p>
          <p>Tél : +261 32 30 792 14</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Suivez-nous</h3>
          <div class="flex space-x-4 mt-2">
            <a href="#" class="text-blue-600 hover:text-blue-800"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-blue-600 hover:text-blue-800"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="text-blue-600 hover:text-blue-800"><i class="fab fa-x-twitter"></i></a>
            <a href="#" class="text-blue-600 hover:text-blue-800"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Ressources</h3>
          <ul class="space-y-1">
            <li><a href="#" class="hover:underline">Documentation</a></li>
            <li><a href="#" class="hover:underline">FAQ</a></li>
            <li><a href="#" class="hover:underline">Assistance</a></li>
            <li><a href="#" class="hover:underline">Conditions d'utilisation</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-10 border-t pt-4 text-center text-gray-500 text-xs">
        © 2025 Plateforme de gestion et suivi des projets. Tous droits réservés.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

import UserProfileCard from '@/components/Users/UserProfileCard.vue'
import RoleManager from '@/components/Users/RoleManager.vue'
import UserTaskOverview from '@/components/Users/UserTaskOverview.vue'
import ProjectSummary from '@/components/Project/ProjectSummary.vue'
import TaskBoard from '@/components/Task/TaskBoard.vue'
import TaskFilters from '@/components/Task/TaskFilters.vue'
import SimpleChart from '@/components/Project/SimpleChart.vue'

const sidebarOpen = ref(true)
const openMenus = ref([])
const router = useRouter()
const auth = getAuth()

function toggleMenu(menu) {
  if (openMenus.value.includes(menu)) {
    openMenus.value = openMenus.value.filter(m => m !== menu)
  } else {
    openMenus.value.push(menu)
  }
}

function handleLogout() {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    signOut(auth)
      .then(() => router.push('/login'))
      .catch(error => console.error('Erreur lors de la déconnexion :', error))
  }
}
</script>
