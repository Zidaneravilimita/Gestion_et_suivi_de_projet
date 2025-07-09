<template>
  <div class="flex min-h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside
      :class="['bg-white shadow-lg p-6 fixed top-0 left-0 h-full z-10 transition-transform duration-300',
               isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full']"
    >
      <h2 class="text-xl font-bold mb-6">Navigation</h2>
      <ul class="space-y-6">
        <!-- Utilisateur -->
        <li>
          <button @click="toggleMenu('users')" class="w-full text-left font-semibold text-gray-700">
            Utilisateur
          </button>
          <ul v-show="openMenus.includes('users')" class="ml-4 mt-2 space-y-2">
            <li><a href="#user-list" class="text-blue-600 hover:underline">Liste des Utilisateurs</a></li>
          </ul>
        </li>

        <!-- Projets -->
        <li>
          <button @click="toggleMenu('projects')" class="w-full text-left font-semibold text-gray-700">
            Projets
          </button>
          <ul v-show="openMenus.includes('projects')" class="ml-4 mt-2 space-y-2">
            <li><a href="#create-project" class="text-blue-600 hover:underline">Créer un projet</a></li>
            <li><a href="#project-list" class="text-blue-600 hover:underline">Liste des projets</a></li>
          </ul>
        </li>

        <!-- Tâches -->
        <li>
          <button @click="toggleMenu('tasks')" class="w-full text-left font-semibold text-gray-700">
            Tâches
          </button>
          <ul v-show="openMenus.includes('tasks')" class="ml-4 mt-2 space-y-2">
            <li><a href="#create-task" class="text-blue-600 hover:underline">Créer une tâche</a></li>
            <li><a href="#task-list" class="text-blue-600 hover:underline">Liste des Tâches</a></li>
          </ul>
        </li>

        <!-- Statistiques -->
        <li>
          <button @click="toggleMenu('stats')" class="w-full text-left font-semibold text-gray-700">
            Statistiques
          </button>
          <ul v-show="openMenus.includes('stats')" class="ml-4 mt-2 space-y-2">
            <li><a href="#stats" class="text-blue-600 hover:underline">Voir les statistiques</a></li>
          </ul>
        </li>
      </ul>
    </aside>

    <!-- Contenu principal -->
    <div class="flex-1 bg-gray-100 min-h-screen ml-0 md:ml-64">
      <!-- Navigation haute -->
      <nav class="bg-white p-4 shadow sticky top-0 z-20 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden text-2xl">
            ☰
          </button>
          <h1 class="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">Bienvenue, <strong>Utilisateur</strong></span>
          <button @click="handleLogout" class="bg-blue-500 text-white px-4 py-2 rounded">Se déconnecter</button>
        </div>
      </nav>

      <!-- Sections -->
      <div class="p-6 space-y-8">
        <!-- Utilisateur -->
        <section id="user-list">
          <UserProfileCard />
        </section>

        <!-- Créer un projet -->
        <section id="create-project" class="bg-white p-6 rounded shadow">
          <h2 class="text-xl text-black font-semibold mb-4">Créer un projet</h2>
          <ProjectCreateForm />
        </section>

        <!-- Résumé des projets -->
        <section class="bg-white p-6 rounded shadow">
          <ProjectSummary />
        </section>

        <!-- Liste des projets -->
        <section id="project-list" class="bg-white p-6 rounded shadow">
          <h2 class="text-xl text-black font-semibold mb-4">Liste des projets</h2>
          <ProjectList />
        </section>

        <!-- Création d'une tâche -->
        <section id="create-task" class="bg-white p-6 rounded shadow">
          <h2 class="text-xl text-black font-semibold mb-4">Créer une tâche</h2>
          <TaskCreateForm />
        </section>

        <!-- Liste des tâches -->
        <section id="task-list" class="bg-white p-6 rounded shadow">
          <h2 class="text-xl text-black font-semibold mb-4">Liste des Tâches</h2>
          <TaskList />
        </section>

        <!-- Statistiques -->
        <section id="stats" class="bg-white p-6 rounded shadow">
          <SimpleChart />
        </section>
      </div>

      <!-- Pied de page -->
      <footer class="bg-white px-6 py-10 shadow mt-auto">
        <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-700">
          <!-- À propos -->
          <div>
            <h3 class="text-lg font-semibold mb-3">À propos</h3>
            <p>Plateforme de suivi de projets pour les entreprises avec fonctionnalités de gestion d'équipe, tâches et reporting.</p>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Contact</h3>
            <p>Email : <a href="mailto:tahiendrazazidane@gmail.com" class="text-blue-600 hover:underline">tahiendrazazidane@gmail.com</a></p>
            <p>Tél : +261 32 68 792 14</p>
            <p>Tél : +261 34 30 970 61</p>
          </div>

          <!-- Réseaux sociaux -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Nous suivre</h3>
            <div class="flex space-x-4">
              <i class="fab fa-facebook text-blue-600"></i>
              <i class="fab fa-linkedin text-blue-700"></i>
              <i class="fab fa-x-twitter text-black"></i>
              <i class="fab fa-github text-gray-800"></i>
            </div>
          </div>

          <!-- Ressources -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Ressources</h3>
            <ul>
              <li><a href="#" class="hover:underline">Documentation</a></li>
              <li><a href="#" class="hover:underline">Assistance</a></li>
              <li><a href="#" class="hover:underline">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-6 text-center text-xs text-gray-500">
          © 2025 Plateforme de gestion et suivi des projets — Tous droits réservés.
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

// Composants
import UserProfileCard from '@/components/Users/UserProfileCard.vue'
import ProjectCreateForm from '@/components/Project/ProjectCreateForm.vue'
import ProjectList from '@/components/Project/ProjectList.vue'
import ProjectSummary from '@/components/Project/ProjectSummary.vue'
import SimpleChart from '@/components/Project/SimpleChart.vue'
import TaskCreateForm from '@/components/Task/TaskCreateForm.vue'
import TaskList from '@/components/Task/TaskList.vue'

const router = useRouter()
const auth = getAuth()

const openMenus = ref([])
const isSidebarOpen = ref(true)

const toggleMenu = (menu) => {
  if (openMenus.value.includes(menu)) {
    openMenus.value = openMenus.value.filter(m => m !== menu)
  } else {
    openMenus.value.push(menu)
  }
}

const handleLogout = () => {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    signOut(auth)
      .then(() => router.push('/login'))
      .catch(err => console.error('Erreur de déconnexion :', err))
  }
}
</script>

<style scoped>
</style>
