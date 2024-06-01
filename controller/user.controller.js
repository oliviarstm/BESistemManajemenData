const query = require("../database");
const createUser = async (req,res)=>{
    const {username, role, password} = req.body
    if (username===undefined||username===""||role===undefined||role===""||password===undefined||password===""){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    if (role!=='admin'&&role!=='mentee'&&role!=='mentor'){
        return res.status(400).json({msg:"Role not match"})
    }
    try {
        await query("insert into user(username, role, password) VALUES (?,?,?)", [username,role,password])
        return res.status(200).json({msg:"User Created Success"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong"})
    }
}
const getAllUser = async(req,res)=>{
    try {
        const result = await query("select username,role from user")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong"})
    }
}
const getUserById = async(req,res)=>{
    const {id} = req.params
    if (id===undefined||id===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        const [result] = await query("select username,role from user where id=?", [id])
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