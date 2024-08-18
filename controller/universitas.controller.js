const query = require("../database");
const getAllUniversitas= async (req,res)=>{
    try {
        const result = await query("SELECT id_university as id, university_name, email, address, pic_name, pic_phone, pic_email FROM university")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getUniversitasById=async (req,res)=>{
    const {id} = req.params
    try {
        if (id===undefined||id===''){
            return res.status(400).json({msg:"Field cant be empty"})
        }
        const [result]= await query("SELECT id_university as id, university_name, email, address, pic_name, pic_phone, pic_email FROM university WHERE id_university=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const createUniversitas=async (req,res)=>{
    const {university_name, email, address, pic_name, pic_phone, pic_email} = req.body
    try {
        await query("INSERT INTO university(university_name, email, address, pic_name, pic_phone, pic_email) VALUES (?,?,?,?,?,?)", [university_name,email,address,pic_name,pic_phone,pic_email])
        return res.status(200).json({msg:"Universitas Created"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const updateUniversitas=async (req,res)=>{
    const {id} = req.params
    const {university_name, email, address, pic_name, pic_phone, pic_email} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("UPDATE university SET university_name=?, email=?, address=?, pic_name=?, pic_phone=?, pic_email=? WHERE id_university=?", [university_name,email,address,pic_name,pic_phone,pic_email,id])
        return res.status(200).json({msg:"Universitas Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const deleteUniversitas = async (req,res)=>{
    const {id} = req.params
    try{
        await query("DELETE FROM university WHERE id_university=?", [id])
        return res.status(200).json({msg:"Delete Success"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAllUniversitas, deleteUniversitas, getUniversitasById, createUniversitas, updateUniversitas}