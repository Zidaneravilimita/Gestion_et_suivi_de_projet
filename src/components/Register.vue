<template>
  <div class="flex items-center justify-center min-h-screen bg-white">
    <form class="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl text-gray-800 mb-4 text-center">Inscription</h2>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label for="username" class="block text-gray-700 mb-2">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 mb-2">Mot de passe</label>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            class="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
          <button type="button" @click="togglePassword" class="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
            <span v-if="showPassword">👁️</span>
            <span v-else>👁️‍🗨️</span>
          </button>
        </div>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded focus:outline-none"
        @click.prevent="submitRegister"
      >
        S'inscrire
      </button>
      <p class="mt-4 text-center">
        Déjà membre ? <a href="/login" class="text-blue-600 hover:underline">Se connecter</a>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      showPassword: false
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    submitRegister() {
      // Logique d'inscription ici
      console.log('Inscription:', this.email, this.username, this.password);
    }
  }
};
</script>