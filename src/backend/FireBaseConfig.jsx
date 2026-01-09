// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhqV1XKV1O8aUxJkYWbcXGvb9M5vfb_7Y",
  authDomain: "creative-graveyard.firebaseapp.com",
  projectId: "creative-graveyard",
  storageBucket: "creative-graveyard.firebasestorage.app",
  messagingSenderId: "910393932430",
  appId: "1:910393932430:web:1ebcee66bc0a475bb467df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app
// export const googleProvider = new GoogleAuthProvider();

