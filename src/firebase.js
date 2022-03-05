// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBcRlU1jL5hTUYzXWCt43GL2_ALUdwP7k8",
  authDomain: "action-planner-8e70c.firebaseapp.com",
  projectId: "action-planner-8e70c",
  storageBucket: "action-planner-8e70c.appspot.com",
  messagingSenderId: "680462843127",
  appId: "1:680462843127:web:8df58e815d8bdbfd1127f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
