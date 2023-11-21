const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Add Post
router.post("/add", postController.addPost);


// Get Post
router.get("/get", postController.getAllPosts);

// Get Post By User Id
router.get("/get/:userId", postController.getPostsByUserId);

// Get Post By Pages
router.get("/getpage", postController.getPostsByPage);

// Get Post By Id
router.get("/getbyid", postController.getPostsById);


module.exports = router;