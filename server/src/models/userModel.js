const db = require('../config/db')

const add = async (name,email,key) => {
    const query = `
        INSERT INTO users(userName, userEmail, userKey)
        values (?,?,?)
    `
    const values = [name, email, key]
    try {
        const [rows] = await db.query(query, values)
        console.log('👍 Executed Successfully -Adding')
        console.log(rows)
        return rows
    } catch (error) {
        console.error('👎 An Error Occured: ',error)
    }
}

const find = async (email) => {
    const query = `
        SELECT * FROM users
        WHERE userEmail = ?
    `
    try {
        const [rows] = await db.query(query,[email])
        console.log('👍 Executed Successfully -Verifying')
        console.log(rows)
        return rows
    } catch (error) {
        console.error('👎 An Error Occured: ',error)
    }
}

module.exports = { add, find }