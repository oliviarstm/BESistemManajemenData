const query = require("../database");
const getAllMentee= async (req,res)=>{
    try {
        const result = await query("")
        return res.status(200).json({msg:"User Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const getMenteeById= async (req,res)=>{
    try {
        return res.status(200).json({msg:"User Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const createMentee= async (req,res)=>{
    try {
        return res.status(200).json({msg:"User Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const updateMentee= async (req,res)=>{
    try {
        return res.status(200).json({msg:"User Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const deleteMentee= async (req,res)=>{
    try {
        return res.status(200).json({msg:"User Updated"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}