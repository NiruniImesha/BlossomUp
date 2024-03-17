import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB_u8TzqHNGo0s9HqoV3zTX3S2q4ody8i8",
  authDomain: "sample-project-21015.firebaseapp.com",
  projectId: "sample-project-21015",
  storageBucket: "sample-project-21015.appspot.com",
  messagingSenderId: "717033771171",
  appId: "1:717033771171:web:49182fa3e868a2543c6f16",
  measurementId: "G-R2LMVEXF4L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
