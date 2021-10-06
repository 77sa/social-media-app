const express = require('express')

const router = express.Router()

const {getAllPosts, getPostsByUsername, createPost, deletePost} = require('../controllers/posts')

// get all
router.route('/').get(getAllPosts)

// get single user posts
router.route('/:username').get(getPostsByUsername)

// post
router.route('/').post(createPost)

// delete
router.route('/:id').delete(deletePost)

module.exports = router