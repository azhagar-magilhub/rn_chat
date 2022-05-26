import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAxAlZSooBfROhqIsSNuzuF5sZk-NSWkSE",
    authDomain: "task-9600.firebaseapp.com",
    projectId: "task-9600",
    storageBucket: "task-9600.appspot.com",
    messagingSenderId: "175303172834",
    appId: "1:175303172834:web:859b51e29bb910d3f674bb",
    measurementId: "G-VMJW74G6PK"
};

// const firebaseConfig = {
//     apiKey: 'AIzaSyDTQZK6b6j079BfkNYavdL4u_BMT_xINA8',
//     authDomain: 'chatapp-53b62.firebaseapp.com',
//     projectId: 'chatapp-53b62',
//     storageBucket: 'chatapp-53b62.appspot.com',
//     messagingSenderId: '962908484120',
//     appId: '1:962908484120:web:00ee5e9b271d9a6248096d',
//     measurementId: 'G-VM9SKX5MB9',
// };

firebase.initializeApp(firebaseConfig);

const auth1 = auth();
const db = firebase.firestore();

export { db, auth1 };