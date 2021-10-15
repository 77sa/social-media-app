const express = require('express')

const router = express.Router()

const {getAllPosts, getPostsByUsername, createPost, deletePost, likePost, commentPost, likeComment, deleteComment} = require('../controllers/posts')
const {protect} = require('../middleware/protected')

// get all
router.route('/').get(getAllPosts)

// get single user posts
router.route('/:username').get(getPostsByUsername)

// post
router.route('/').post(createPost)

// delete
router.route('/:id').delete(deletePost)

// like
router.route('/like/:id').patch(likePost)

// comment
router.route('/comment/:id').post(protect, commentPost)

// like comment
router.route('/likeComment/:postid/:commentid').patch(protect, likeComment) 

// delete comment
router.route('/deleteComment/:postid/:commentid').delete(protect, deleteComment)

module.exports = router