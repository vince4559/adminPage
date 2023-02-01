import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKRi8y6ucCY5Gx299rA7MPb7UhS3g5JEc",
  authDomain: "admin-95f50.firebaseapp.com",
  projectId: "admin-95f50",
  storageBucket: "admin-95f50.appspot.com",
  messagingSenderId: "1053727019483",
  appId: "1:1053727019483:web:29211961bfa484b967d7fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app)
