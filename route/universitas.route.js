const express = require('express')
const {getAllUniversitas, deleteUniversitas} = require("../controller/universitas.controller");
const routes = express()

routes.get('/universitas', getAllUniversitas)
routes.delete('/universitas/:id', deleteUniversitas)

module.exports=routes


