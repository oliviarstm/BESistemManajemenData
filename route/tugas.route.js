const express = require('express')
const {getAllTugas, getTugasById, createTugas, updateTugas, deleteTugas, getPengumpulanTugas, updateNilai,
    getTugasByMentee, getPengumpulanTugasMentee, addPengumpulanTugas, deletePengumpulan
} = require("../controller/tugas.controller");
const routes = express()
const multerLms = require("../middleware/multer-lms")

routes.get('/tugas', getAllTugas)
routes.get('/tugas/:id', getTugasById)
routes.get('/tugasmentee/:id', getTugasByMentee)
routes.post('/tugas', createTugas)
routes.put('/tugas/:id', updateTugas)
routes.delete('/tugas/:id', deleteTugas)
routes.post('/pengumpulan-tugas', getPengumpulanTugas)
routes.post('/kumpul-tugas', [multerLms, addPengumpulanTugas])
routes.delete('/kumpul-tugas/:id', deletePengumpulan)
routes.post('/pengumpulan-tugas-mentee', getPengumpulanTugasMentee)
routes.put('/pengumpulan-tugas/:id', updateNilai)

module.exports=routes


