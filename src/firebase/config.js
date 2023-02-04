import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  /*   apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "hepukashop.firebaseapp.com",
  projectId: "hepukashop",
  storageBucket: "hepukashop.appspot.com",
  messagingSenderId: "1013390225376",
  appId: "1:1013390225376:web:32d49c3270a7d70c020585", */

  apiKey: "AIzaSyDSE1OjBBAX3obWDUeunPQVd0wfbe35jhQ",
  authDomain: "szakdolgozat-9a288.firebaseapp.com",
  projectId: "szakdolgozat-9a288",
  storageBucket: "szakdolgozat-9a288.appspot.com",
  messagingSenderId: "1010145898746",
  appId: "1:1010145898746:web:f983c61a7294e979e49943",
  measurementId: "G-T1BD2WRM55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
