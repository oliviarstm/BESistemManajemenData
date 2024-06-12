const query = require("../database");
const getAllAdmin= async (req,res)=>{
    try {
        const result = await query("SELECT id_admin, nama, email, u.username FROM admin left join user u on u.id = admin.id_user")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const getAdminById= async (req,res)=>{
    const {id} = req.params
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        const [result]= await query("SELECT id_admin, nama, email FROM admin WHERE id_admin=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const updateAdmin= async (req,res)=>{
    const {id} = req.params
    const {nama,email} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("UPDATE admin SET email=?, nama=? WHERE id_admin=?", [email, nama, id])
        return res.status(200).json({msg:"Admin Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const updateAdminPassword= async (req,res)=>{
    const {id} = req.params
    const {nama,email,password, newPassword, confNewPassword} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    if (newPassword!==confNewPassword){
        return res.status(400).json({msg:"Password not match"})
    }
    try {
        const [findId] = await query("select id_user from admin where id_admin=?", [id])
        const [result] = await query("select id from user where id=? AND password=?", [findId.id_user,password])
        if (result.length===0){
            return res.status(400).json({msg:"Wrong Password"})
        }
        await query("UPDATE admin LEFT JOIN user u on u.id = admin.id_user SET email=?, nama=?, u.password=? WHERE id_admin=?", [email, nama ,newPassword,id])
        return res.status(200).json({msg:"Admin Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}



module.exports = {getAllAdmin, getAdminById, updateAdmin, updateAdminPassword}