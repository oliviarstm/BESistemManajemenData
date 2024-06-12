const query = require("../database");
const getAllPengunduran= async (req,res)=>{
    try {
        const result = await query("select id_pengajuan AS id, m.name from pengajuan left join mentee m on m.id_mentee = pengajuan.id_mentee where tipe='pengunduran diri'")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getPengunduranById= async (req,res)=>{
    const {id} = req.params
    try {
        const result = await query("select id_pengajuan AS id, m.name as Nama, u.university_name as Universitas, m.class as Kelas, m.session Sesi, m2.nama as 'Individual Mentor', alasan as Alasan, lampiran as File from pengajuan left join mentee m on m.id_mentee = pengajuan.id_mentee left join university u on u.id_university = m.id_university left join mentor m2 on m2.id_mentor = m.id_mentor where tipe='pengunduran diri' AND id_pengajuan=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const deleteValidasi = async (req,res)=>{
    const {id} = req.params
    try{
        await query("DELETE FROM pengajuan WHERE id_pengajuan=?", [id])
        return res.status(200).json({msg:"Delete Success"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAllPengunduran, getPengunduranById, deleteValidasi}