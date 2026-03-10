import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA9tsFh59zg_5KlOkPP9_yMVpRg_xcHJ8E",
  authDomain: "pet-ai-5dcc7.firebaseapp.com",
  projectId: "pet-ai-5dcc7",
  storageBucket: "pet-ai-5dcc7.firebasestorage.app",
  messagingSenderId: "1025689660231",
  appId: "1:1025689660231:web:bd7d992019a8aa2c513a62",
  measurementId: "G-WYD5NS5HNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export instances you'll need
export const auth = getAuth(app);
export const db = getFirestore(app, "(default)");
