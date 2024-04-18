import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt3qlXO6RtjSSfv-VHqDUd0l5smzHMRRs",
  authDomain: "chat-app-b51b1.firebaseapp.com",
  projectId: "chat-app-b51b1",
  storageBucket: "chat-app-b51b1.appspot.com",
  messagingSenderId: "226723151823",
  appId: "1:226723151823:web:63de4812421c2dfbfb9cba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage();
export const db = getFirestore(app) 
