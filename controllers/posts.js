const Post = require('../models/Post')

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        if(!posts) return
        res.json(posts)
    } catch (error) {
        next(error) 
    }
}

exports.getPostsByUsername = async (req, res, next) => {
    const {username} = req.params

    try {
        const posts = await Post.find({username})
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
    const {id} = req.params

    try {
        await Post.findByIdAndDelete(id)
        res.send({message: 'Post deleted'})
    } catch (error) {
        next(error)
    }
}

exports.likePost = async (req, res, next) => {
    const {id} = req.params

    try {
        const post = await Post.findById(id)
        post.likes += 1
        post.save()
        res.json({success: true})
    } catch (error) {
        next(error)
    }
}