const Post = require("../models/postSchema");
const User = require("../models/userSchema");
const Comment = require("../models/commentSchema");

// Add Post
const addComment = async (req, res) => {
  try {
    let data = Comment(req.body);
    let result = await data.save({ writeConcern: { w: "majority" } });

     const postId = req.body.postId; 
     const userId = req.body.userId;

     await Post.updateOne(
       { _id: postId },
       { $push: { commentIds: result._id } } 
     );

     await User.updateOne(
       { _id: userId },
       { $push: { commentIds: result._id } } 
     )

    return res.status(200).send({ message: "Comment added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};


// Get Comments
const getAllComments = async (req, res) => {
  try {
    const data = await Comment.find();
    return res.status(200).send({ message: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};


// Get Comments by pages
const getCommentsByPage = async (req, res) => {
  try {
    const postPerPage = 10;
    const data = await Comment.find();
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * postPerPage;
    const endIndex = page * postPerPage;
    const commentForPage = data.slice(startIndex, endIndex);
    return res.status(200).send({ message: commentForPage });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

module.exports = {
    addComment,
    getAllComments,
    getCommentsByPage
};
