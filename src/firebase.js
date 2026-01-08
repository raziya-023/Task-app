import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCSEE9fatAmIHEQesbXonB52mg5PCEp9uA",
    authDomain: "virtubox-assessment.firebaseapp.com",
    projectId: "virtubox-assessment",
    storageBucket: "virtubox-assessment.firebasestorage.app",
    messagingSenderId: "70071589620",
    appId: "1:70071589620:web:01bbb43ad4fd4befe5dca1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Database to use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);