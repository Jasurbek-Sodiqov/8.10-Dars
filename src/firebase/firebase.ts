import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAhlzIKvNMN-zTa_5QGbLiRz5z5PeWA26E",
  authDomain: "fn12-d5f6b.firebaseapp.com",
  databaseURL:
    "https://fn12-d5f6b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fn12-d5f6b",
  storageBucket: "fn12-d5f6b.appspot.com",
  messagingSenderId: "680367164527",
  appId: "1:680367164527:web:5d28ad34b2968816ce119a",
};
const app = initializeApp(firebaseConfig);

export const realDB = getDatabase(app);
export const auth = getAuth(app);

export const GoogleProvider = new GoogleAuthProvider();
