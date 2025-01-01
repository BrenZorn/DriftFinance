const { initializeApp } = require ("firebase/app");
const { getFirestore, doc, setDoc } = require ("firebase/firestore")

require("dotenv").config();

const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification, 
    sendPasswordResetEmail
  
  } = require("firebase/auth") ;

const firebaseConfig = {
    apiKey: "AIzaSyALuN1ZlJe1TFqEfTuEk4BuXQrmu-t7Fw8",
    authDomain: "fbta-28cc6.firebaseapp.com",
    projectId: "fbta-28cc6",
    storageBucket: "fbta-28cc6.firebasestorage.app",
    messagingSenderId: "814781499786",
    appId: "1:814781499786:web:67362be79d15b1a6866073",
    measurementId: "G-STBVRXEN7K"
};


let app = initializeApp(firebaseConfig);


module.exports = {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,

}