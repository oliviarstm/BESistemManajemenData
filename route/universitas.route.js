const express = require('express')
const {getAllUniversitas, deleteUniversitas, getUniversitasById, createUniversitas, updateUniversitas} = require("../controller/universitas.controller");
const routes = express()

routes.get('/universitas', getAllUniversitas)
routes.get('/universitas/:id', getUniversitasById)
routes.post('/universitas', createUniversitas)
routes.put('/universitas/:id', updateUniversitas)
routes.delete('/universitas/:id', deleteUniversitas)

module.exports=routes


