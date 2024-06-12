const query = require("../database");
const getAllUniversitas= async (req,res)=>{
    try {
        const result = await query("SELECT id_university as id, university_name, email, address, pic_name, pic_phone, pic_email FROM university;\n")
        return res.status(200).json({data:result})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}
const deleteUniversitas = async (req,res)=>{
    const {id} = req.params
    try{
        await query("DELETE FROM university WHERE id_university=?", [id])
        return res.status(200).json({msg:"Delete Success"})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}

module.exports = {getAllUniversitas, deleteUniversitas}