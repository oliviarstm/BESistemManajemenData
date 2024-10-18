const query = require("../database");
const getAll= async (req,res)=>{
    const {date} = req.body
    try {
        const result = await query("SELECT id_absensi as id, m.name as Name, m.class as Kelas, m.session as Sesi, status as checked, m.id_mentee, waktu as date FROM absensi right join lms_oliv_v2.mentee m on m.id_mentee = absensi.id_mentee AND absensi.waktu = ?", [date])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const getAllByClass= async (req,res)=>{
    const {date, class:kelas} = req.body
    try {
        const result = await query("SELECT absensi.id_absensi AS id, m.name AS Name, m.class AS Kelas, m.session AS Sesi, absensi.status AS checked, m.id_mentee, waktu as date FROM lms_oliv_v2.mentee m LEFT JOIN absensi ON m.id_mentee = absensi.id_mentee AND absensi.waktu = ? WHERE m.class = ?", [date,kelas])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getAllByMentor= async (req,res)=>{
    const {date, idMentor} = req.body
    try {
        const result = await query("SELECT absensi.id_absensi AS id, m.name AS Name, m.class AS Kelas, m.session AS Sesi, absensi.status AS Checked FROM lms_oliv_v2.mentee m LEFT JOIN absensi ON m.id_mentee = absensi.id_mentee AND absensi.waktu = ? WHERE m.id_mentor = ?;", [date,idMentor])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const insertUpdate= async (req,res)=>{
    const {date, id, id_mentee} = req.body
    try {
        // Kalau datanya tidak ada, maka tambahkan data baru berdasarkan id, waktu, dan id_mentee
        if (!id){
            console.log(date, id_mentee)
            const result = await query(`INSERT INTO absensi(waktu, status, id_mentee) VALUES(?, 1, ?)`, [date, id_mentee])
            return res.status(200).json({msg:"Data Inserted Success"})
        } else {
            //     Kalau datanya ada, cek dulu status nya saat ini
            const [result] = await query(`SELECT status FROM absensi where id_absensi=?`,id)
            let reverseCheck = result.status === 1 ? 0 : 1;
            await query(`UPDATE absensi SET status=? WHERE id_absensi=?`, [reverseCheck, id])
            return res.status(200).json({msg:"Data Update Success"})
        }
        const result = await query("SELECT absensi.id_absensi AS id, m.name AS Name, m.class AS Kelas, m.session AS Sesi, absensi.status AS checked, m.id_mentee FROM lms_oliv_v2.mentee m LEFT JOIN absensi ON m.id_mentee = absensi.id_mentee AND absensi.waktu = ? WHERE m.class = ?", [date,kelas])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAll, getAllByClass, insertUpdate, getAllByMentor}