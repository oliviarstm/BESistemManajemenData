const express = require('express')
const app = express()
const baseurl = "/api/v1"
const auth = require('../route/auth.route')
const user = require('../route/user.route')

console.log("Index Run")

app.use(baseurl, auth)
app.use(baseurl, user)

module.exports = app