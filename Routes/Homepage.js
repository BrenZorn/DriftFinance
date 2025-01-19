const express = require('express')
const { authenticateToken } = require("../Middleware/jwtVerification")
const { getUser } = require('../Lib/mongo')

const router = express.Router()

//test route
router.get('/home', authenticateToken, (req, res)=>{
    res.send('authenticated').status(200)
})

router.get('/currentUser', authenticateToken,(req, res)=>{
     getUser(req.user.email)
     .then((user)=>{
        //edit data to only send back what is needed 
        res.json(user).status(200)
     })
})

module.exports = router