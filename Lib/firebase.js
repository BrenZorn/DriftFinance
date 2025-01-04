const { initializeApp } = require ("firebase/app");
require("dotenv").config();
const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification, 
    sendPasswordResetEmail} = require("firebase/auth") ;

    const firebaseConfig = {
        apiKey: "AIzaSyBHZnaWz_GvbSj3f-XZcsNAS1y-ofvtmF4",
        authDomain: "driftfinance-f137b.firebaseapp.com",
        projectId: "driftfinance-f137b",
        storageBucket: "driftfinance-f137b.firebasestorage.app",
        messagingSenderId: "387217432943",
        appId: "1:387217432943:web:7f3f10580ce2e6cbb1489a",
        measurementId: "G-PZ6QZBD6P1"
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