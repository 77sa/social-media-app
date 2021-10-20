const express = require('express')

const router = express.Router()

const {getAllPosts, getPostsByUsername, createPost, deletePost, likePost} = require('../controllers/posts')
const {protect} = require('../middleware/protected') 

// get all
router.route('/').get(protect, getAllPosts)

// get single user posts
router.route('/:username').get(protect, getPostsByUsername)

// post
router.route('/').post(protect, createPost)

// delete
router.route('/:id').delete(protect, deletePost)

// like
router.route('/like/:id').patch(protect, likePost)

module.exports = router