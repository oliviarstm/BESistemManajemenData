const express = require('express')
const {getAll} = require("../controller/absensi.controller");
const routes = express()

routes.get('/absensi', getAll)
routes.get('/menteeclass/', getByClass)
routes.get('/mentee/:id', getMenteeById)
// routes.get('/mentee_admin/:id', getMenteeByIdAdmin)
routes.post('/mentee', createMentee)
routes.put('/mentee/:id', updateMentee)
routes.put('/mentee_admin/:id', updateMenteeAdmin)
routes.put('/mentee_pass/:id', updateMenteePassword)
routes.delete('/mentee/:id', deleteMentee)



module.exports=routes


