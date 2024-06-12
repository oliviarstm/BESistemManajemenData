const express = require('express')
const {getAllMentor, getMentorById, updateMentor, updateMentorPassword, getAllMentorAdmin} = require("../controller/mentor.controller");
const routes = express()

routes.get('/mentor', getAllMentor)
routes.get('/mentoradmin', getAllMentorAdmin)
routes.get('/mentor/:id', getMentorById)
routes.put('/mentor/:id', updateMentor)
routes.put('/mentor_pass/:id', updateMentorPassword)

module.exports=routes


