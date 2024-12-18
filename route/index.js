const express = require('express')
const app = express()
const baseurl = "/api/v1"
const auth = require('../route/auth.route')
const user = require('./user.route')
const mentee = require('./mentee.route')
const mentor = require('./mentor.route')
const universitas = require('./universitas.route')
const validasi = require('./pengunduran.route')
const tugas = require('./tugas.route')
const absensi = require('./absensi.route')

console.log("Index Run")

app.use(baseurl, auth)
app.use(baseurl, user)
app.use(baseurl, mentee)
app.use(baseurl, mentor)
app.use(baseurl, universitas)
app.use(baseurl, validasi)
app.use(baseurl, tugas)
app.use(baseurl, absensi)

module.exports = app