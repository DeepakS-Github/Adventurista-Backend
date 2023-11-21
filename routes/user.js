const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// SignUp
router.post("/signup", userController.signup);


// Login
router.post("/login", userController.login);


// Post Ids by User Id
router.get("/postIds", userController.postIdsByUserId);


module.exports = router;