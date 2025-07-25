<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-black mb-4 text-center">Inscription</h2>
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

        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700">Confirmer le mot de passe</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" required
                 class="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div v-if="error" class="mb-4 text-red-500 text-sm">{{ error }}</div>

        <button type="submit"
                class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
          S'inscrire
        </button>
      </form>

      <p class="text-sm text-center mt-4">
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
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { useToast } from 'vue-toastification'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()
const toast = useToast()

const register = async () => {
  error.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = "Les mots de passe ne correspondent pas."
    return
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // Ajouter dans Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "membre",
      active: true,
      createdAt: new Date()
    })

    toast.success("Inscription réussie !")
    router.push('/dashboard')
  } catch (err) {
    console.error('Erreur d’inscription :', err.message)
    error.value = "Erreur lors de l'inscription. Vérifiez vos informations."
  }
}
</script>

<style scoped>
</style>
