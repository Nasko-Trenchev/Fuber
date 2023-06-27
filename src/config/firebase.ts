// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuVcYldKT32z3E4pdQbfThBYCKbzPW24M",
    authDomain: "fuber-79621.firebaseapp.com",
    projectId: "fuber-79621",
    storageBucket: "fuber-79621.appspot.com",
    messagingSenderId: "383357289973",
    appId: "1:383357289973:web:c8b2bf2b72b6556eb2ccbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)