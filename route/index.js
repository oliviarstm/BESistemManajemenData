const express = require('express')
const app = express()
const baseurl = "/api/v1"
const auth = require('../route/auth.route')
const user = require('./user.route')
const mentee = require('./mentee.route')

console.log("Index Run")

app.use(baseurl, auth)
app.use(baseurl, user)
app.use(baseurl, mentee)

module.exports = app