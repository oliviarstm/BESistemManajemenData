const express = require('express')
const {getAllUniversitas} = require("../controller/universitas.controller");
const routes = express()

routes.get('/universitas', getAllUniversitas)

module.exports=routes


