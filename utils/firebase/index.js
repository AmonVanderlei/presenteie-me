// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtQn6NBo-Oog8YDlJjFK08KO6KUkyC5-E",
  authDomain: "presenteie-me-b0f20.firebaseapp.com",
  projectId: "presenteie-me-b0f20",
  storageBucket: "presenteie-me-b0f20.firebasestorage.app",
  messagingSenderId: "1055709056908",
  appId: "1:1055709056908:web:3c5b8d7c2e56fe55c090a9",
  measurementId: "G-2Q8DG0H0QJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
