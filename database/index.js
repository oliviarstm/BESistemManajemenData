const {createPool} = require("mysql2/promise");
const dotenv = require('dotenv')

dotenv.config()

const db = createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

const query =async (query, value)=>{
    try {
        const [result]=await db.query(query, value??[])
        return result
    }catch (e) {
        throw e
    }
}

module.exports = query