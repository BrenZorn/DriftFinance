const express = require('express')
const { authenticateToken } = require("../Middleware/jwtVerification")

const router = express.Router()

//test route
router.get('/home', authenticateToken, (req, res)=>{
    res.send('authenticated').status(200)
})

module.exports = router