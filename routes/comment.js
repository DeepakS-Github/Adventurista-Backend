const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Add Comment
router.post("/add", commentController.addComment);

// Get All Comments
router.get("/get", commentController.getAllComments);

// Get Comment By Pages
router.get("/getpage", commentController.getCommentsByPage);

module.exports = router;