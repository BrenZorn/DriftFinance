const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification,
    sendPasswordResetEmail
} = require('./Lib/firebase')

const app = express()
const port = 3001


app.use(cors())
app.use(bodyParser())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const auth = getAuth();
app.post('/register',(req, res) => {
    const { email, password } = req.body;
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
            res.status(201).json({ message: "Verification email sent! User created successfully!" });
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})