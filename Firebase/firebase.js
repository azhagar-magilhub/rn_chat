import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: "AIzaSyAxAlZSooBfROhqIsSNuzuF5sZk-NSWkSE",
    authDomain: "task-9600.firebaseapp.com",
    projectId: "task-9600",
    storageBucket: "task-9600.appspot.com",
    messagingSenderId: "175303172834",
    appId: "1:175303172834:web:859b51e29bb910d3f674bb",
    measurementId: "G-VMJW74G6PK"
};

// Initialize Firebase

// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig)
// } else {
//   app = firebase.app();
// }

// const db = app.firestore();
// const auth = firebase.auth();

// export { db, auth };

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app)
