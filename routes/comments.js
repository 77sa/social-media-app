const express = require('express')
const {protect} = require('../middleware/protected')

const router = express.Router()

const {createComment, likeComment, deleteComment, editComment} = require('../controllers/comments')

// comment
router.route('/:id').post(protect, createComment)

// like comment
router.route('/like/:postid/:commentid').patch(protect, likeComment) 

// delete comment
router.route('/delete/:postid/:commentid').delete(protect, deleteComment)

// edit comment
router.route('/edit/:postid/:commentid').patch(editComment)

module.exports = router