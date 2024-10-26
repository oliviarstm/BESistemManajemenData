const express = require('express')
const {getAllMentee, getMenteeById, createMentee, updateMentee, deleteMentee, updateMenteeAdmin, getMenteeByIdAdmin,
    updateMenteePassword, getByClass, getByMentor
} = require("../controller/mentee.controller");
const routes = express()

routes.get('/mentee', getAllMentee)
routes.get('/menteeclass/', getByClass)
routes.get('/mentee/:id', getMenteeById)
routes.get('/menteeindividual/:id', getByMentor)
routes.post('/mentee', createMentee)
routes.put('/mentee/:id', updateMentee)
routes.put('/mentee_admin/:id', updateMenteeAdmin)
routes.put('/mentee_pass/:id', updateMenteePassword)
routes.delete('/mentee/:id', deleteMentee)



module.exports=routes


