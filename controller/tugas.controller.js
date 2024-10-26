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
const getTugasByMentee=async (req,res)=>{
    const {id} = req.params
    try {
        if (id===undefined||id===''){
            return res.status(400).json({msg:"Field cant be empty"})
        }
        const result= await query(`SELECT t.id_tugas AS id, t.subyek AS NameTugas, pt.nilai AS Nilai FROM tugas t LEFT JOIN pengumpulan_tugas pt ON t.id_tugas = pt.id_tugas AND pt.id_mentee = ? ORDER BY t.id_tugas`, [id])
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

const getPengumpulanTugas = async (req,res)=>{
    const {id} = req.body
    try {
        const result = await query("SELECT id_pengumpulan AS id, nilai, lampiran, name as Name, class as Class, session as Session, subyek FROM pengumpulan_tugas LEFT JOIN mentee m on m.id_mentee = pengumpulan_tugas.id_mentee LEFT JOIN lms_oliv_v2.tugas t on t.id_tugas = pengumpulan_tugas.id_tugas WHERE t.id_tugas=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const updateNilai = async (req,res)=>{
    const {id}=req.params
    const {nilai}=req.body
    try {
        const result = await query(`update pengumpulan_tugas set nilai=? where id_pengumpulan=?;`, [nilai,id])
        return res.status(200).json({msg:"Update Nilai Berhasil"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAllTugas, deleteTugas, getTugasById, createTugas, updateTugas, getPengumpulanTugas, updateNilai, getTugasByMentee}