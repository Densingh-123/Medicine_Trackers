import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_8esGfDo0R91xwRkyO5teQ2i5dZth9Dg",
  authDomain: "medicine-tracker-a9c6f.firebaseapp.com",
  projectId: "medicine-tracker-a9c6f",
  storageBucket: "medicine-tracker-a9c6f.appspot.com",
  messagingSenderId: "566257166281",
  appId: "1:566257166281:web:eb875643515e01fddf2a18",
  measurementId: "G-1YVYZDTRHC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Fetch data from both medications and users collections
export const fetchUserData = async () => {
  const medicationsSnapshot = await getDocs(collection(db, "medications"));
  const usersSnapshot = await getDocs(collection(db, "users"));

  const medicationsData = medicationsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  const usersData = usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { medicationsData, usersData };
};
