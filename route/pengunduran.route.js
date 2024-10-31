const express = require('express')
const {getAllPengunduran, getPengunduranById, deleteValidasi, insertPengunduran} = require("../controller/pengunduran.controller");
const multerLms = require("../middleware/multer-lms");
const routes = express()

routes.get('/pengunduran', getAllPengunduran)
routes.get('/pengunduran/:id', getPengunduranById)
routes.post('/pengunduran', [multerLms,insertPengunduran])
routes.delete('/pengunduran/:id', deleteValidasi)

module.exports=routes