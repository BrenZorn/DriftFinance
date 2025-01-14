const express = require('express')
const { authenticateToken } = require("../Middleware/jwtVerification")
const { getUser } = require('../Lib/mongo')

const router = express.Router()

//test route
router.get('/home', authenticateToken, (req, res)=>{
    res.send('authenticated').status(200)
})

router.get('/currentUser', authenticateToken, async (req, res)=>{
    if(req.user){
        try{
            let user = await getUser(req.email)
            res.json(
                {
                    user:{
                        "UserName": user.UserName,
                        "Email": user.Email
                    }
            }).status(200)
        }catch(err){
            res.json({"error":"No user found"}).status(500)
        }
        
    }
    else{
        res.json({"error":"No user found"}).status(500)
    }
})

module.exports = router