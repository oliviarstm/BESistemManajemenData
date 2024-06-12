const express = require('express')
const {getAllPengunduran, getPengunduranById, deleteValidasi} = require("../controller/validasi.controller");
const routes = express()

routes.get('/pengunduran', getAllPengunduran)
routes.get('/pengunduran/:id', getPengunduranById)
routes.delete('/pengunduran/:id', deleteValidasi)

module.exports=routes