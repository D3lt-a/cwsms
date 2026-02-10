require('dotenv').config()
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_KEY,
    database: process.env.DB_NAME
})

pool.getConnection()
    .then(
        () => console.log('✅ Database Connected!')
    ).catch(
        (error) => {
            console.error('⛔ An Error Occured: ',error)
        }
    )

module.exports = pool;