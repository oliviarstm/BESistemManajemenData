const query = require("../database");
const getAllMentee= async (req,res)=>{
    try {
        const result = await query("SELECT id_mentee as id, name, u.university_name, class, session  FROM mentee left join university u on u.id_university = mentee.id_university ORDER BY name asc")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getByClass= async (req,res)=>{
    const {class:class_mentee} =req.query
    try {
        const result = await query("SELECT id_mentee as id, name, u.university_name, class, session  FROM mentee left join university u on u.id_university = mentee.id_university WHERE class=? ORDER BY name asc", [class_mentee])
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
        const [result]= await query("SELECT id_mentee as id, phone_number, u2.username, u2.email, name, nim, class, session, category, major, m.id_mentor, m.nama AS mentor_name, u.id_university, u.university_name FROM mentee LEFT JOIN mentor m on m.id_mentor = mentee.id_mentor left join university u on u.id_university = mentee.id_university LEFT JOIN user u2 on u2.id = mentee.id_user WHERE id_mentee=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const createMentee= async (req,res)=>{
    const {
        phone_number, name, nim, class : class_mentee, session, category, major, id_user, id_mentor, id_university
    } = req.body
    try {
        await query("INSERT INTO mentee(phone_number, name, nim, class, session, category, major, id_user, id_mentor, id_university) VALUES (?,?,?,?,?,?,?,?,?,?)", [phone_number, name, nim, class_mentee, session, category, major, id_user, id_mentor, id_university])
        return res.status(200).json({msg:"Mentee Created"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

// Might not be used
const updateMentee= async (req,res)=>{
    const {id} = req.params
    const {phone_number, name, nim, class : class_mentee, session, category, major} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("UPDATE mentee SET phone_number=?, name=?, nim=?, class=?, session=?, category=?, major=?  WHERE id_mentee=?", [phone_number, name, nim, class_mentee, session, category, major, id])
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
    // const {id} = req.params
    // if (id===undefined||id===''){
    //     return res.status(400).json({msg:"Field cant be empty"})
    // }
    // try {
    //     const [result]= await query("SELECT id_mentee as id, phone_number, mentee.email, name, nim, class, session, category, major, m.nama as mentor_name, u.university_name, u2.username  FROM mentee LEFT JOIN mentor m on m.id_mentor = mentee.id_mentor left join university u on u.id_university = mentee.id_university LEFT JOIN user u2 on u2.id = m.id_user WHERE id_mentee=?", [id])
    //     return res.status(200).json({data:result})
    // }catch (e) {
    //     return res.status(400).json({msg:"Something Wrong", error:e})
    // }
}
const updateMenteeAdmin= async (req,res)=>{
    const {id} = req.params
    const {phone_number, name, nim, class : class_mentee, session, category, major, id_mentor, id_university} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("UPDATE mentee SET phone_number=?, name=?, nim=?, class=?, session=?, category=?, major=?, id_mentor=?, id_university=?  WHERE id_mentee=?", [phone_number, name, nim, class_mentee, session, category, major, id_mentor, id_university, id])
        return res.status(200).json({msg:"Mentee Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const updateMenteePassword= async (req,res)=>{
    const {id} = req.params
    const {phone_number, name, nim, class : class_mentee, session, category, major,password, newPassword, confNewPassword} = req.body
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    if (newPassword!==confNewPassword){
        return res.status(400).json({msg:"Password not match"})
    }
    try {
        const [findId] = await query("select id_user from mentee where id_mentee=?", [id])
        const [result] = await query("select id from user where id=? AND password=?", [findId.id_user,password])
        if (result.length===0){
            return res.status(400).json({msg:"Wrong Password"})
        }
        await query("UPDATE mentee LEFT JOIN user u on u.id = mentee.id_user SET phone_number=?, name=?, nim=?, class=?, session=?, category=?, major=?, u.password=? WHERE id_mentee=?", [phone_number, name, nim, class_mentee, session, category, major,newPassword,id])
        return res.status(200).json({msg:"Mentee Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAllMentee, getMenteeById, createMentee, updateMentee, deleteMentee, getMenteeByIdAdmin, updateMenteeAdmin, updateMenteePassword, getByClass}