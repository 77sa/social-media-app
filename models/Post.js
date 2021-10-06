const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: Number,
        required: true,
        defualt: 0
    },
    // comments: {
    //     type: Array,
    //     required: false
    //     default: [] 
    // },
})

module.exports = mongoose.model('post', PostSchema)