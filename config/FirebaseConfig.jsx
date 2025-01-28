// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_8esGfDo0R91xwRkyO5teQ2i5dZth9Dg",
  authDomain: "medicine-tracker-a9c6f.firebaseapp.com",
  projectId: "medicine-tracker-a9c6f",
  storageBucket: "medicine-tracker-a9c6f.firebasestorage.app",
  messagingSenderId: "566257166281",
  appId: "1:566257166281:web:eb875643515e01fddf2a18",
  measurementId: "G-1YVYZDTRHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);