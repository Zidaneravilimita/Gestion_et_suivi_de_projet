<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-bold text-gray-800 mb-4">Utilisateurs inscrits</h3>
    <ul v-if="users.length > 0" class="space-y-2">
      <li v-for="(user, index) in users" :key="index" class="flex justify-between items-center p-2 border rounded-md">
        <div>
          <p class="text-gray-800 font-semibold">{{ user.email }}</p>
          <p class="text-sm text-gray-500">Rôle : {{ user.role }}</p>
        </div>
        <span :class="user.active ? 'text-green-600' : 'text-red-600'">
          {{ user.active ? 'Actif' : 'Inactif' }}
        </span>
      </li>
    </ul>
    <p v-else class="text-gray-500">Aucun utilisateur trouvé.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const users = ref([])
const db = getFirestore()

onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, 'users'))
    if (snapshot.empty) {
      console.log('Aucun document trouvé dans la collection users.')
      return
    }

    users.value = snapshot.docs.map(doc => doc.data())
    console.log('Utilisateurs chargés :', users.value)
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs :', error)
  }
})
</script>
