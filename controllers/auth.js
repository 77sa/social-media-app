const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')

const sendtoken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({success: true, token})
}

exports.register = async (req, res, next) => {
    const {username, email, password} = req.body

    if(!username || !email || !password) return next(new ErrorResponse('Please comeplete the form', 400))

    try {
        const user = await User.create({username, email, password})
        sendtoken(user, 201, res)
    } catch (error) {
        next(error)
        console.log(error)
    }
}

exports.login = async (req, res, next) => {
    const {username, password} = req.body

    if(!username || !password) return next(new ErrorResponse('Please complete the form', 400))

    try {
        const user = await User.findOne({username}).select('+password')

        if(!user) return next(new ErrorResponse('Invalid credentials', 401))

        if(!await user.matchPassword(password)) return next(new ErrorResponse('Invalid credentials', 401))

        sendtoken(user, 200, res)
    } catch (error) {
        next(error)
    }
}
