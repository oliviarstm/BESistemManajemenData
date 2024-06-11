const express = require('express')
const app = express()
const baseurl = "/api/v1"
const auth = require('../route/auth.route')
const user = require('./user.route')
const mentee = require('./mentee.route')
const admin = require('./admin.route')
const mentor = require('./mentor.route')

console.log("Index Run")

app.use(baseurl, auth)
app.use(baseurl, user)
app.use(baseurl, mentee)
app.use(baseurl, admin)
app.use(baseurl, mentor)

module.exports = app