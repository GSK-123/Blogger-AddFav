// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5LPofTVxSAdOMrf5i7sOj9R-wBJ2oEN8",
  authDomain: "peabh-assignment.firebaseapp.com",
  projectId: "peabh-assignment",
  storageBucket: "peabh-assignment.firebasestorage.app",
  messagingSenderId: "120449605554",
  appId: "1:120449605554:web:08e3f03306266202e4ceab",
  measurementId: "G-TJTZX8C0HV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
