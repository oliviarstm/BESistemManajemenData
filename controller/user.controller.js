const query = require("../database");
const createUser = async (req,res)=>{
    const {username, role, password, email} = req.body
    if (username===undefined||username===""||role===undefined||role===""||password===undefined||password===""||email===undefined||email===""){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    if (role!=='admin'&&role!=='mentee'&&role!=='mentor'){
        return res.status(400).json({msg:"Role not match"})
    }
    try {
        const result=await query("insert into user(username, email, role, password) VALUES (?,?,?,?)", [username,email,role,password])
        return res.status(200).json({msg:"User Created Success", result:result.insertId})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getAllUser = async(req,res)=>{
    try {
        const result = await query("select id,username,role,email AS email from user")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getUserById = async(req,res)=>{
    const {id} = req.params
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        const [result] = await query("select id,username,role,COALESCE(m.email, m2.email) AS email from user LEFT JOIN mentor m on user.id = m.id_user LEFT JOIN mentee m2 on user.id = m2.id_user WHERE id=?", [id])
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong"})
    }
}
const updateUser = async(req,res)=>{
    const {id} = req.params
    const {username, password, role} = req.body
    if (id===undefined||id===''||username===undefined||username===""||role===undefined||role===""||password===undefined||password===""){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    if (role!=='admin'&&role!=='mentee'&&role!=='mentor'){
        return res.status(400).json({msg:"Role not match"})
    }
    try {
        await query("update user set username=?, password=?, role=? where id =?", [username, password, role, id])
        return res.status(200).json({msg:"User Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const deleteUser = async(req,res)=>{
    const {id} = req.params
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        await query("delete from user where id =?", [id])
        return res.status(200).json({msg:"User Deleted"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong"})
    }
}

module.exports = {createUser, getAllUser, getUserById, updateUser, deleteUser}