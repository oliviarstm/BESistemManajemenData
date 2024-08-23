const query = require("../database");
const getAllTugas= async (req,res)=>{
    try {
        const result = await query("SELECT id_tugas AS id, subyek, DATE_FORMAT(batas_waktu, '%d-%m-%Y') AS batas_waktu FROM tugas")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getTugasById=async (req,res)=>{
    const {id} = req.params
    try {
        if (id===undefined||id===''){
            return res.status(400).json({msg:"Field cant be empty"})
        }
        const [result]= await query("SELECT id_tugas AS id, subyek, DATE_FORMAT(batas_waktu, '%d-%m-%Y') AS batas_waktu FROM tugas WHERE id_tugas=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const createTugas=async (req,res)=>{
    const {subyek, batas_waktu} = req.body
    try {
        await query("INSERT INTO tugas(subyek, batas_waktu) VALUES (?,?)", [subyek,batas_waktu])
        return res.status(200).json({msg:"Tugas Created"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const updateTugas=async (req,res)=>{
    const {id} = req.params
    const {subyek, batas_waktu} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("UPDATE tugas SET subyek=?, batas_waktu=? WHERE id_tugas=?", [subyek,batas_waktu,id])
        return res.status(200).json({msg:"Tugas Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const deleteTugas = async (req,res)=>{
    const {id} = req.params
    try{
        await query("DELETE FROM tugas WHERE id_tugas=?", [id])
        return res.status(200).json({msg:"Delete Success"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAllTugas, deleteTugas, getTugasById, createTugas, updateTugas}