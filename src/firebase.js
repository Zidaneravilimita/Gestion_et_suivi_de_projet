import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration de Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyAINc_0-nJiVXjyKE6qi3sODqXReQ2afMg",
  authDomain: "gestion-et-suivi-des-projets.firebaseapp.com",
  projectId: "gestion-et-suivi-des-projets",
  storageBucket: "gestion-et-suivi-des-projets.appspot.com", 
  messagingSenderId: "270807302783",
  appId: "1:270807302783:web:53fdf0d38fdc15477af54a",
  measurementId: "G-BXQ7LXLW4K"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export des instances
export { app, auth, db};
