const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        minlength: 6,
        select: false
    },
    date: {
        type: String,
        required: true,
        default: Date(Date.now().toLocaleString)
    },
})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function() {
    return jwt.sign({_id: this.id, username: this.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
}

module.exports = mongoose.model('user', UserSchema)
