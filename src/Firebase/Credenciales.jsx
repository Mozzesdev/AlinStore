// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcZFztfTzL09m99mc8wG5k5pKVApDjSSY",
  authDomain: "alindesign-58d32.firebaseapp.com",
  projectId: "alindesign-58d32",
  storageBucket: "alindesign-58d32.appspot.com",
  messagingSenderId: "585353909848",
  appId: "1:585353909848:web:c8c7c9ca6654186c825c2d",
  measurementId: "G-N58CPHL9P2"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
