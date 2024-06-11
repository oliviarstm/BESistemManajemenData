const express = require('express')
const {getAllAdmin, getAdminById, updateAdmin, updateAdminPassword} = require("../controller/admin.controller");
const routes = express()

routes.get('/admin', getAllAdmin)
routes.get('/admin/:id', getAdminById)
routes.put('/admin/:id', updateAdmin)
routes.put('/admin_pass/:id', updateAdminPassword)

module.exports=routes


