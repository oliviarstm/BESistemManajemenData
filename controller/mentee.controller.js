const query = require("../database");
const getAllMentee= async (req,res)=>{
    try {
        const result = await query("SELECT id_mentee, phone_number, mentee.email, name, nim, class, session, category, major, m.nama as mentor_name, u.university_name FROM mentee LEFT JOIN mentor m on m.id_mentor = mentee.id_mentor left join university u on u.id_university = mentee.id_university")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getMenteeById= async (req,res)=>{
    const {id} = req.params
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        const [result]= await query("SELECT id_mentee, phone_number, mentee.email, name, nim, class, session, category, major, m.nama as mentor_name, u.university_name FROM mentee LEFT JOIN mentor m on m.id_mentor = mentee.id_mentor left join university u on u.id_university = mentee.id_university WHERE id_mentee=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const createMentee= async (req,res)=>{
    const {
        phone_number, email, name, nim, class_mentee, session, category, major, id_user, id_mentor, id_university
    } = req.body
    try {
        await query("INSERT INTO mentee(phone_number, email, name, nim, class, session, category, major, id_user, id_mentor, id_university) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [phone_number, email, name, nim, class_mentee, session, category, major, id_user, id_mentor, id_university])
        return res.status(200).json({msg:"Mentee Created"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

// Might not be used
const updateMentee= async (req,res)=>{
    const {id} = req.params
    const {phone_number, email, name, nim, class_mentee, session, category, major} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("UPDATE mentee SET phone_number=?, email=?, name=?, nim=?, class=?, session=?, category=?, major=?,  WHERE id_mentee=?", [phone_number, email, name, nim, class_mentee, session, category, major, id])
        return res.status(200).json({msg:"Mentee Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const deleteMentee= async (req,res)=>{
    const {id} = req.params
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("DELETE FROM mentee WHERE id_mentee=?", [id])
        return res.status(200).json({msg:"Mentee Deleted"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

const getMenteeByIdAdmin= async (req,res)=>{
    const {id} = req.params
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        const [result]= await query("SELECT id_mentee, phone_number, mentee.email, name, nim, class, session, category, major, m.nama as mentor_name, u.university_name, u2.username  FROM mentee LEFT JOIN mentor m on m.id_mentor = mentee.id_mentor left join university u on u.id_university = mentee.id_university LEFT JOIN user u2 on u2.id = m.id_user WHERE id_mentee=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const updateMenteeAdmin= async (req,res)=>{
    const {id} = req.params
    // const {phone_number, email, name, nim, class_mentee, session, category, major, id_mentor, id_user } = req.body
    const {phone_number, email, name, nim, class_mentee, session, category, major, id_mentor, id_university, id_user} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("UPDATE mentee LEFT JOIN user u on u.id = mentee.id_user LEFT JOIN mentor m on u.id = m.id_user LEFT JOIN university u2 on u2.id_university = mentee.id_university SET phone_number=?, email=?, name=?, nim=?, class=?, session=?, category=?, major=?, m.id_mentor=?, u2.id_university=?, m.id_user=? WHERE id_mentee=?", [phone_number, email, name, nim, class_mentee, session, category, major, id_mentor, id_university, id_user, id])
        return res.status(200).json({msg:"Mentee Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const updateMenteePassword= async (req,res)=>{
    const {id} = req.params
    const {phone_number, email, name, nim, class_mentee, session, category, major,password, newPassword, confNewPassword} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    if (newPassword!==confNewPassword){
        return res.status(400).json({msg:"Password not match"})
    }
    try {
        const [result] = await query("select id from user where id=? AND password=?", [id,password])
        if (result.length===0){
            return res.status(400).json({msg:"Wrong Password"})
        }
        await query("UPDATE mentee LEFT JOIN user u on u.id = mentee.id_user SET phone_number=?, email=?, name=?, nim=?, class=?, session=?, category=?, major=?, u.password=? WHERE id_mentee=?", [phone_number, email, name, nim, class_mentee, session, category, major,newPassword,id])
        return res.status(200).json({msg:"Mentee Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAllMentee, getMenteeById, createMentee, updateMentee, deleteMentee, getMenteeByIdAdmin, updateMenteeAdmin, updateMenteePassword}