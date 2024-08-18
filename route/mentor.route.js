const express = require('express')
const {getAllMentor, getMentorById, updateMentor, updateMentorPassword, deleteMentor, createMentor} = require("../controller/mentor.controller");
const routes = express()

routes.get('/mentor', getAllMentor)
routes.get('/mentor/:id', getMentorById)
routes.post('/mentor', createMentor)
routes.put('/mentor/:id', updateMentor)
routes.put('/mentor_pass/:id', updateMentorPassword)
routes.delete('/mentor/:id', deleteMentor)

module.exports=routes


