const express = require('express')
const {getAllUser, getUserById, createUser, updateUser, deleteUser} = require("../controller/user.controller");
const routes = express()

routes.get('/user', getAllUser)
// routes.get('/user/:id', getUserById)
// routes.post('/user', createUser)
// routes.put('/user/:id', updateUser)
// routes.delete('/user/:id', deleteUser)

module.exports=routes