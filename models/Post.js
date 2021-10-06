const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        default: Date(Date.now().toLocaleString)
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    // comments: {
    //     type: Array,
    //     required: false
    //     default: [] 
    // },
})

module.exports = mongoose.model('post', PostSchema)