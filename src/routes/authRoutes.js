const express = require('express')
const mongoose = require("mongoose")
const User = mongoose.model("User")
const jwt = require("jsonwebtoken")

const router = express.Router()


router.post('/signup' , async (req , res) => {
    const {email,password} = req.body

    try{
        const user = new User({email,password})

        await user.save()
        const token = jwt.sign({userId : user._id} , "SECRET_WEB_TOKEN" )
        res.send({token})
    }
    catch(e){
        return res.status(422).send(e.message)
    }

})

router.get("/" , (req,res) => {
    res.send("Hello There")
})

router.get("/asx" , (req,res) => {
    res.send("Hello There from asx")
})


module.exports = router