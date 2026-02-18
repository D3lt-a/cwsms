const { add, find } = require('../models/userModel')
const bcrypt = require('bcryptjs')

const create = async (req, res) => {
    const { name, email, key } = req.body
    try {
        let isEmailThere = await find(req.body.email)
        if (isEmailThere) {
            res.status(400).json({ message: 'User Creation Failed, Email already exists', success: false })
            return isEmailThere
        } else {
            const hashedKey = await bcrypt.hash(key, 10)
            const result = await add(name, email, hashedKey)
            res.status(201).json({ message: 'User Created Successfully', success: true })
            return result.insertId
        }
    } catch (error) {
        console.error('👎 An Error Occured: ', error)
    }
}

const verify = async (req, res) => {
    const { email } = req.body
    try {
        const result = await find(email)
        if (result.length > 0) {
            const isMatch = await bcrypt.compare(key, result[0].userKey)
            if (isMatch) {
                res.status(200).json({ message: 'User Verified Successfully', success: true })
            } else {
                res.status(401).json({ message: 'User Verification Failed, Check the credentials', success: false })
            }
        } else {
            res.status(401).json({ message: 'User Verification Failed, Nothing Found', success: false })
        }
    } catch (error) {
        console.error('👎 An Error Occured: ', error)
    }
}

module.exports = { create, verify }