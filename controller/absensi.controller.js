const query = require("../database");
const {dateConvert} = require("../utils/tools");

const getAll= async (req,res)=>{
    const {date} = req.body
    try {
        const result = await query("SELECT id_absensi as id, m.name as Name, m.class as Kelas, m.session as Sesi, status as checked, m.id_mentee, waktu as date FROM absensi right join mentee m on m.id_mentee = absensi.id_mentee AND absensi.waktu = ?", [date])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const getAllByClass= async (req,res)=>{
    const {date, class:kelas} = req.body
    try {
        const result = await query("SELECT absensi.id_absensi AS id, m.name AS Name, m.class AS Kelas, m.session AS Sesi, absensi.status AS checked, m.id_mentee, waktu as date FROM mentee m LEFT JOIN absensi ON m.id_mentee = absensi.id_mentee AND absensi.waktu = ? WHERE m.class = ?", [date,kelas])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getAllByMentor= async (req,res)=>{
    const {date, idMentor} = req.body
    try {
        const result = await query("SELECT absensi.id_absensi AS id, m.name AS Name, m.class AS Kelas, m.session AS Sesi, absensi.status AS Checked FROM mentee m LEFT JOIN absensi ON m.id_mentee = absensi.id_mentee AND absensi.waktu = ? WHERE m.id_mentor = ?;", [date,idMentor])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getAllByMentee= async (req,res)=>{
    const {date, idMentee} = req.body
    try {
        const result = await query("SELECT absensi.id_absensi AS id, waktu AS waktu, absensi.status AS status FROM absensi WHERE id_mentee=? AND MONTH(waktu) = ? ORDER BY waktu DESC;", [idMentee, date])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const insertUpdate = async (req, res) => {
    const { date, id, id_mentee } = req.body;
    try {
        if (id) {
            // If an id is provided, check its current status
            const [result] = await query(`SELECT status FROM absensi WHERE id_absensi = ?`, id);
            if (result) {
                let reverseCheck = result.status === 1 ? 0 : 1;
                await query(`UPDATE absensi SET status = ? WHERE id_absensi = ?`, [reverseCheck, id]);
                return res.status(200).json({ msg: "Data Update Success" });
            }
        } else {
            // Insert a new entry if no id is provided
            await query(`INSERT INTO absensi(waktu, status, id_mentee) VALUES(?, 1, ?)`, [date, id_mentee]);
            return res.status(200).json({ msg: "Data Inserted Success" });
        }
    } catch (e) {
        return res.status(400).json({ msg: "Something Went Wrong", error: e });
    }
};

const insertAllUnchecked = async (req, res) => {
    const { date } = req.body;
    try {
        // Fetch all mentees without attendance records for the given date
        const mentees = await query(`
            SELECT m.id_mentee FROM mentee m
            LEFT JOIN absensi a ON m.id_mentee = a.id_mentee AND a.waktu = ?
            WHERE a.id_absensi IS NULL
        `, [date]);

        // Prepare insert queries
        const recordsToInsert = mentees.map(mentee => [date, 0, mentee.id_mentee]);

        if (recordsToInsert.length > 0) {
            // Insert all null attendance records at once
            await query(`INSERT INTO absensi(waktu, status, id_mentee) VALUES ?`, [recordsToInsert]);
            return res.status(200).json({ msg: "All Data Inserted Success" });
        } else {
            return res.status(200).json({ msg: "No Data to Insert" });
        }
    } catch (e) {
        return res.status(400).json({ msg: "Something Went Wrong", error: e });
    }
};



const getIzin= async (req,res)=>{
    try {
        const result = await query("select id_pengajuan AS id, m.name AS Name, m.class AS Class, m.session AS Session, date AS Tanggal, alasan AS Alasan, lampiran from pengajuan left join mentee m on m.id_mentee = pengajuan.id_mentee left join university u on u.id_university = m.id_university left join mentor m2 on m2.id_mentor = m.id_mentor where tipe='izin' ORDER BY pengajuan.date DESC")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const insertIzin=async (req,res)=>{
    if (!req.files || !req.files.lampiran){
        return res.status(400).json({error:"No Evidence"})
    }
    const {alasan, Tanggal, id} = req.body
    let evidence=null
    if (req.files.lampiran) {
        const { lampiran } = req.files;
        evidence = lampiran[0].filename;
    }
    try {
        await query(`INSERT INTO pengajuan(alasan, tipe, lampiran, date, id_mentee) VALUES (?,?,?,?,?)`, [alasan,"izin",evidence,dateConvert(Tanggal),id])
        return res.status(200).json({ msg: "Data Insert Success" })
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAll, getAllByClass, insertUpdate, getAllByMentor, getIzin, insertAllUnchecked, getAllByMentee, insertIzin}