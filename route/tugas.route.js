const express = require('express')
const {getAllTugas, getTugasById, createTugas, updateTugas, deleteTugas, getPengumpulanTugas} = require("../controller/tugas.controller");
const routes = express()

routes.get('/tugas', getAllTugas)
routes.get('/tugas/:id', getTugasById)
routes.post('/tugas', createTugas)
routes.put('/tugas/:id', updateTugas)
routes.delete('/tugas/:id', deleteTugas)
routes.post('/pengumpulan-tugas', getPengumpulanTugas)

module.exports=routes


