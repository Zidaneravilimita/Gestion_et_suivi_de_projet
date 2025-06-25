import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importez le routeur ici

createApp(App)
  .use(router) // Ajoutez le routeur à votre application
  .mount('#app');