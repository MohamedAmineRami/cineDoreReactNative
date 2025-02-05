import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSRnfdrzIH-OjqVbxWdTF2L3umO5Xr89Y",
    authDomain: "cinedoretest.firebaseapp.com",
    projectId: "cinedoretest",
    storageBucket: "cinedoretest.firebasestorage.app",
    messagingSenderId: "941473469681",
    appId: "1:941473469681:web:ed504c58a66fb6a715c550"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);