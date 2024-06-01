const express = require('express')
const dotenv = require('dotenv')
const query = require("./database");
const app = express()
const routes=require('./route')

dotenv.config()
app.use(express.json())

app.use(routes)

app.listen(process.env.APP_PORT, ()=>{
    console.log(`Server is running at http://localhost:${process.env.APP_PORT}`)
})