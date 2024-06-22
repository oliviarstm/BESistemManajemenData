const query = require("../database");

const getAllMentor= async (req,res)=>{
    try {
        const result = await query("SELECT id_mentor as id, nama, u.email, u.username FROM mentor LEFT JOIN user u on u.id = mentor.id_user")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const getMentorById= async (req,res)=>{
    const {id} = req.params
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        const [result]= await query("SELECT id_mentor, nama, u.email, u.id FROM mentor LEFT JOIN user u on u.id = mentor.id_user WHERE id_mentor=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const updateMentor= async (req,res)=>{
    const {id} = req.params
    const {nama,email} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("UPDATE mentor LEFT JOIN user u on u.id = mentor.id_user SET u.email=?, nama=? WHERE id_mentor=?", [email, nama, id])
        return res.status(200).json({msg:"mentor Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const updateMentorPassword= async (req,res)=>{
    const {id} = req.params
    const {nama,email,password, newPassword, confNewPassword} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    if (newPassword!==confNewPassword){
        return res.status(400).json({msg:"Password not match"})
    }
    try {
        const [findId] = await query("select id_user from mentor where id_mentor=?", [id])
        const [result] = await query("select id from user where id=? AND password=?", [findId.id_user,password])
        if (result.length===0){
            return res.status(400).json({msg:"Wrong Password"})
        }
        await query("UPDATE mentor LEFT JOIN user u on u.id = mentor.id_user SET u.email=?, nama=?, u.password=? WHERE id_mentor=?", [email, nama ,newPassword,id])
        return res.status(200).json({msg:"mentor Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const deleteMentor = async (req,res)=>{
    const {id} = req.params
    try{
        await query("DELETE FROM mentor WHERE id_mentor=?", [id])
        return res.status(200).json({msg:"Delete Success"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAllMentor, getMentorById, updateMentor, updateMentorPassword, deleteMentor}