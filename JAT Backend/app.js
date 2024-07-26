const express = require('express')
const mongoose =  require('mongoose')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userRoute = require("./Routes/userRoutes")
const jobsRoute = require("./Routes/jobsRoutes")
// const config = require('./config.js')
// const path = require('path')

// mongoose.connect('mongod://127.0.0.1:27017/jat', (err)=>{
//     if(err){
//         throw err
//     }
//     console.log("database connected")
// })

mongoose.connect('mongodb://127.0.0.1:27017/jat');

mongoose.connection.on('connected', ()=>{
    console.log('connected');
});

mongoose.connection.on('error', (err)=>{
    console.log(err);
});
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(userRoute);
app.use(jobsRoute);


app.listen(3000, (err)=> {
    if(err) throw err
    console.log("listening on port 3000")
})