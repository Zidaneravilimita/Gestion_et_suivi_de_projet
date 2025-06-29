<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-black mb-4 text-center">Connexion</h2>

      <!-- Notification de succès -->
      <div v-if="successMessage" class="mb-4 bg-green-100 text-green-800 p-3 rounded text-sm">
        {{ successMessage }}
      </div>

      <!-- Notification d’erreur -->
      <div v-if="errorMessage" class="mb-4 bg-red-100 text-red-800 p-3 rounded text-sm">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input v-model="email" type="email" id="email" required
            class="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-700">Mot de passe</label>
          <input v-model="password" type="password" id="password" required
            class="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <button type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
          Se connecter
        </button>
      </form>

      <p class="text-sm text-gray-700 text-center mt-4">
        Vous n'avez pas de compte ?
        <router-link to="/register" class="text-blue-500 hover:underline">S'inscrire</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

const login = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    successMessage.value = 'Connexion réussie ! Redirection en cours...'
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  } catch (err) {
    console.error('Erreur de connexion :', err)
    errorMessage.value = "Email ou mot de passe incorrect"
  }
}
</script>

<style scoped>
</style>
