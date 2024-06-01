const express = require('express')
const {login} = require("../controller/auth.controller");
const routes = express()

routes.post('/login', login)

module.exports = routes