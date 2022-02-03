const express = require('express')

const router = express.Router()

router.post('/signup' , (req , res) => {
    res.send("Post request received")
})

router.get("/" , (req,res) => {
    res.send("Hello There")
})

router.get("/asx" , (req,res) => {
    res.send("Hello There from asx")
})


module.exports = router