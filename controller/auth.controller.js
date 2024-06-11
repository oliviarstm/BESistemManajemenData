const query = require("../database");
const jwt = require('jsonwebtoken')


const login = async (req,res)=>{
    // dapatkan data username dan password dari request
    const {username,password}=req.body

    // validasi apakah username dan password kosong
    if (username===undefined||username===''||password===undefined||password===''){
        return res.status(400).json({msg:"Field cant be empty"})
    }
    try {
        // mencari ID berdasarkan username
        const [findId] = await query("select id from user where username=?", [username.toLowerCase()])
        console.log(findId)

        // Jika hasilnya kosong, maka error username tidak ditemukan
        if (findId.length===0){
            return res.status(400).json({msg:"Username not found"})
        }

        // Mendapatkan data username dan password
        const [result] = await query("select username, password, role from user where id=?", [findId.id])
        console.log(result)
        // Memeriksa password
        if (password!==result.password){
            return res.status(400).json({msg:"Password Incorrect"})
        }

        // Satukan data untuk dikirimkan
        let data = {
            username:result.username,
            role:result.role
        }

        if (result.role==="admin"){
            console.log("Admin")
            const [findAdmin] = await query('SELECT id_admin, nama FROM admin where id_user=? ', [findId.id])
            data={...data, accountId:findAdmin.id_admin}
            data={...data, name:findAdmin.nama}
        }
        if (result.role==="mentor"){
            console.log("Mentor")
            const [findMentor] = await query('SELECT id_mentor, nama FROM mentor where id_user=? ', [findId.id])
            data={...data, accountId:findMentor.id_mentor}
            data={...data, name:findMentor.nama}
        }
        if (result.role==="mentee"){
            console.log("Mentee")
            const [findMentee] = await query('SELECT id_mentee, name FROM mentee where id_user=? ', [findId.id])
            data={...data, accountId:findMentee.id_mentee}
            data={...data, name:findMentee.name}
        }
        const token = jwt.sign(data, process.env.ACCESS_SECRET_KEY)
        return res.status(200).json({data, token})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong", error:e})
    }
}


module.exports = {login}