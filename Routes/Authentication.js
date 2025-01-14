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
const { addUser, getUser } = require('../Lib/mongo');
const jwt = require('jsonwebtoken');

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



const JWT_SECRET_KEY = process.env.JWT;

router.post('/signin', async (req, res)=>{
  const {email, password} = req.body.data
  console.log(email, password)
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    getUser().then((dbUser)=>{
      const token = jwt.sign({ id: dbUser._id.toString(), email: dbUser.Email }, JWT_SECRET_KEY, { expiresIn: '2h' });
      res.send({token, userInfo: {email:dbUser.Email, username:dbUser.UserName}}).status(200)
    }).catch((error)=>{
      res.status(500).json({error: "couldn't find user in DB"})
    })
  })
  .catch((error) => {
    console.log('erer')
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    res.status(500).json({errorMessage})
  });
})


router.post('/signout', (req, res)=>{
  signOut(auth).then(() => {
    console.log('signed out')
  }).catch((error) => {
    // An error happened.
  });
})


module.exports = router