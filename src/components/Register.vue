<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-black mb-4 text-center">Inscription</h2>

      <!-- Notification de succès -->
      <div v-if="successMessage" class="mb-4 bg-green-100 text-green-800 p-3 rounded text-sm">
        {{ successMessage }}
      </div>

      <!-- Message d’erreur -->
      <div v-if="errorMessage" class="mb-4 bg-red-100 text-red-800 p-3 rounded text-sm">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="register">
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
          S'inscrire
        </button>
      </form>

      <p class="text-sm text-gray-700 text-center mt-4">
        Vous avez déjà un compte ?
        <router-link to="/login" class="text-blue-500 hover:underline">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

const register = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    successMessage.value = 'Inscription réussie ! Redirection en cours...'
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Erreur lors de l’inscription : ' + err.message
  }
}
</script>
