import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAi0ypTiWIBk5-AvQnwhgBvhoiDY5g862o",
  authDomain: "lifeup-kids-app.firebaseapp.com",
  projectId: "lifeup-kids-app",
  storageBucket: "lifeup-kids-app.firebasestorage.app",
  messagingSenderId: "349570092008",
  appId: "1:349570092008:web:4968a55c3e042bf58fb25d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
