const express = require('express')
const {getAll, getAllByClass, insertUpdate, getAllByMentor, getIzin, insertAllUnchecked, getAllByMentee, insertIzin} = require("../controller/absensi.controller");
const routes = express()
const multerLms = require("../middleware/multer-lms")

routes.post('/absensi', getAll)
routes.post('/absensiclass/', getAllByClass)
routes.post('/absensimentor/', getAllByMentor)
routes.post('/absensimentee/', getAllByMentee)
routes.post('/insertabsensi', insertUpdate)
routes.post('/insertallabsensi', insertAllUnchecked)
routes.get('/izin', getIzin)
routes.post('/izin', [multerLms,insertIzin])
// // routes.get('/mentee_admin/:id', getMenteeByIdAdmin)
// routes.post('/mentee', createMentee)
// routes.put('/mentee/:id', updateMentee)
// routes.put('/mentee_admin/:id', updateMenteeAdmin)
// routes.put('/mentee_pass/:id', updateMenteePassword)
// routes.delete('/mentee/:id', deleteMentee)



module.exports=routes


