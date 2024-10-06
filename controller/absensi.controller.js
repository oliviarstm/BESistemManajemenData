const query = require("../database");
const getAll= async (req,res)=>{
    const {date} = req.body
    try {
        const result = await query("SELECT id_absensi, name, class, session, status FROM mentee LEFT JOIN absensi a on mentee.id_mentee = a.id_mentee where waktu=?", [date])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const getAllByClass= async (req,res)=>{
    const {date, class:kelas} = req.body
    try {
        const result = await query("SELECT id_absensi, name, class, session, status FROM mentee LEFT JOIN absensi a on mentee.id_mentee = a.id_mentee where waktu=? AND class=?", [date,kelas])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const getById= async (req,res)=>{
    const {id} = req.params
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        const [result]= await query("SELECT id_admin as id, nama, email FROM admin WHERE id_admin=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAll, getAllByClass, getById}