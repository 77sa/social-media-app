const express = require('express')
const {protect} = require('../middleware/protected')

const router = express.Router()

const {register, login} = require('../controllers/auth')


router.route('/register').post(register)

router.route('/login').post(login)

const getUser = (req, res, next) => {res.send({username: req.user.username})}
router.route('/getUser').get(protect, getUser)

module.exports = router