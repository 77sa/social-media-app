const Post = require('../models/Post')

exports.createComment = async (req, res, next) => {
    const {id} = req.params
    const {username} = req.user
    const {comment} = req.body


    try {
        const post = await Post.findById(id)

        post.comments.unshift({username, comment})

        post.save()

        return res.json({success:true, message: "Comment posted"})
    } catch (error) {
        next(error)
    }
}

exports.deleteComment = async (req, res, next) => {
    const {postid, commentid} = req.params

    try {
        const {post, comments, comment} = await findComment(postid, commentid)

        const index = comments.indexOf(comment)
        comments.splice(index, 1)
        post.save()

        res.json({success: true, message: "Comment deleted"})
    } catch (error) {
        next(error)
    }
}

exports.likeComment = async (req, res, next) => {
    const {postid, commentid} = req.params
    const {username} = req.user

    try {
        const {post, comment} = await findComment(postid, commentid)

        if(comment.likedBy.includes(username)){
            const index = comment.likedBy.indexOf(username)
            comment.likedBy.splice(index, 1)
            comment.likes -= 1
            post.save()
            return res.json({success: true, message: "Unliked"})
        } 

        comment.likes += 1
        comment.likedBy.push(username)
        post.save()

        res.json({success: true, message: "Liked"})
    } catch (error) {
        next(error)
    }
}

async function findComment(postid, commentid){
    const post = await Post.findById(postid)
    const comments = post.comments

    const comment = comments.find(comment => comment._id == commentid)

    return {post, comments, comment}
}