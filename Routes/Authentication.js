const express = require('express')
const router = express.Router()
const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification,
    sendPasswordResetEmail
} = require('../Lib/firebase');
const { addUser } = require('../Lib/mongo');

const auth = getAuth();





router.post('/register',(req, res) => {
    console.log('userCredential')
    const { email, password, username } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            addUser(auth.currentUser.uid, username, email)
            res.status(201).json({ message: 'Verification email has been sent' });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Error sending email verification" });
          });
      })
      .catch((error) => {
        const errorMessage = error.message || "An error occurred while registering user";
        res.status(500).json({ error: errorMessage });
      });
} )



module.exports = router