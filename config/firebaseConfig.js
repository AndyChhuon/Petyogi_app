// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzZBdtRHmaIP6ZL4cFJ338filXok2DmQE",
  authDomain: "petyogi-9ebc5.firebaseapp.com",
  projectId: "petyogi-9ebc5",
  storageBucket: "petyogi-9ebc5.appspot.com",
  messagingSenderId: "813978453201",
  appId: "1:813978453201:web:bd30a5bf6b9fd9dd18b1f0",
  measurementId: "G-Q22H1Q7XGV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
