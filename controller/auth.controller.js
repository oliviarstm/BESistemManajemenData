const query = require("../database");

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
        const data = {
            username:result.username,
            role:result.role
        }

        return res.status(200).json({data})
    }catch (e) {
        return res.status(400).json({msg:"Something Wrong"})
    }
}


module.exports = {login}