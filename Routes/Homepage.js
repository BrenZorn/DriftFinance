const express = require('express')
const { authenticateToken } = require("../Middleware/jwtVerification")
const { getUser, updateIncome } = require('../Lib/mongo')

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

router.post('/updateIncome', authenticateToken, async (req, res)=>{
    console.log(req.user.id)
    if(parseInt(req.body.Income) > 0){
        let isUpdated = await updateIncome(req.body.Income, req.user.id)
        if(isUpdated){
            res.send().status(200)
        }else{
            res.send().status(500) 
        }
    }
})

module.exports = router