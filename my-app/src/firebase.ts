// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDfuqY8pknSs3WbaX4hrnSv_SAGdXNq5eQ",
  authDomain: "study-helper-794e4.firebaseapp.com",
  projectId: "study-helper-794e4",
  storageBucket: "study-helper-794e4.firebasestorage.app",
  messagingSenderId: "1030214437413",
  appId: "1:1030214437413:web:1a7a998cf61b5d4892cdcc",
  measurementId: "G-8Z6K3T9LVJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

