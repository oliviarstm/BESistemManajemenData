const express = require('express')
const {getAll, getAllByClass, insertUpdate, getAllByMentor, getIzin} = require("../controller/absensi.controller");
const routes = express()

routes.post('/absensi', getAll)
routes.post('/absensiclass/', getAllByClass)
routes.post('/absensimentor/', getAllByMentor)
routes.post('/insertabsensi', insertUpdate)
routes.get('/izin', getIzin)
// // routes.get('/mentee_admin/:id', getMenteeByIdAdmin)
// routes.post('/mentee', createMentee)
// routes.put('/mentee/:id', updateMentee)
// routes.put('/mentee_admin/:id', updateMenteeAdmin)
// routes.put('/mentee_pass/:id', updateMenteePassword)
// routes.delete('/mentee/:id', deleteMentee)



module.exports=routes


