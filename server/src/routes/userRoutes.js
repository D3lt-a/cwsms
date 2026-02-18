const { create, verify } = require('../controllers/userCont')
const express = require('express')
const routes = express.Router()

routes.post('/create', create)
routes.post('/verify', verify)

module.exports = routes