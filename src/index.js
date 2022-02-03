const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')

const mongoUri = "mongodb+srv://appAdmin:oR5pHUDwRaEKJP3h@cluster0.wasxv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoUri)

mongoose.connection.on('connected' , () => console.log("Connected to mongo"))

mongoose.connection.on('error' , (e) => console.log("Failed to connect to mongo \n" , e))

const app = express();

app.use(authRoutes)

app.get('/' , (req,res) => {
    res.send("Hello World")
} )

app.listen(3000, () => console.log("listening on 3000"))