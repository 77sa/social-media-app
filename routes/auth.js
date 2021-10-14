const express = require('express')

const router = express.Router()

const {register, login, getUser} = require('../controllers/auth')
const {protect} = require('../middleware/protected')


router.route('/register').post(register)

router.route('/login').post(login)

router.route('/getUser').get(protect, getUser)

module.exports = router