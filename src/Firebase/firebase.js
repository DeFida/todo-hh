
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDp8xgO_Kv3aebE7fQHE-S8nlfrOnT3wiw",
    authDomain: "todo-test-hh.firebaseapp.com",
    databaseURL: "https://todo-test-hh-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todo-test-hh",
    storageBucket: "todo-test-hh.appspot.com",
    messagingSenderId: "268851519616",
    appId: "1:268851519616:web:84f2c43e5ce876876bc665",
    measurementId: "G-178DP0GXLB"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
