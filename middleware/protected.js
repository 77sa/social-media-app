const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')

exports.protect = async (req, res, next) => {
    let token

    if(req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')){
        token = req.headers['authorization'].split(' ')[1]
    }

    if(!token) return next(new ErrorResponse('You are not authorised', 401))

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(payload._id)

        if(!user) return next(new ErrorResponse('No user with this ID', 404))

        req.user = user

        next()
    } catch (error) {
        next(error)
    }
}