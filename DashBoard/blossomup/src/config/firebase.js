import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCO31bM-C7OwQZCuFAxwS7W_jPZQ-e_rqM",
  authDomain: "blossomup-9cf0d.firebaseapp.com",
  projectId: "blossomup-9cf0d",
  storageBucket: "blossomup-9cf0d.appspot.com",
  messagingSenderId: "105097255857",
  appId: "1:105097255857:web:34db990cc781ebfe3efb90",
  measurementId: "G-2R2P6SCJ5K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
