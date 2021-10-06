const Post = require('../models/Post')

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        next(error) 
    }
}

exports.getPostsByUsername = async (req, res, next) => {
    const {username} = req.body

    try {
        const posts = Post.find({username})
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

exports.createPost = async (req, res, next) => {
    const {username, content} = req.body

    try {
        await Post.create({username, content})
        res.send({message: 'Post created'})
    } catch (error) {
        next(error)
    }
}

exports.deletePost = async (req, res, next) => {
    const {id} = req.body

    try {
        await Post.findByIdAndDelete(id)
        res.send({message: 'Post deleted'})
    } catch (error) {
        next(error)
    }
}