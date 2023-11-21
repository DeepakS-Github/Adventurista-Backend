const Post = require("../models/postSchema");
const User = require("../models/userSchema");

// Add Post
const addPost = async (req, res) => {
  try {
    let data = Post(req.body);
    let result = await data.save({ writeConcern: { w: "majority" } });

     const userId = req.body.userId; 
     console.log(userId, result._id);

     await User.updateOne(
       { _id: userId },
       { $push: { postIds: result._id } } 
     );


    return res.status(200).send({ message: "Post added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};


// Get Posts
const getAllPosts = async (req, res) => {
  try {
    const data = await Post.find();
    return res.status(200).send({ message: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};


// Get Post By User Id
const getPostsByUserId = async (req,res)=>{
  try {
    const data = await Post.find({userId: req.params.userId});
    return res.status(200).send({ message: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
}


// Get Posts by pages
const getPostsByPage = async (req, res) => {
  try {
    const postPerPage = 5;
    const data = await Post.find();
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * postPerPage;
    const endIndex = page * postPerPage;
    const postForPage = data.slice(startIndex, endIndex);
    return res.status(200).send({ message: postForPage });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};


// Get Posts By Id
const getPostsById = async (req, res) => {
  try {
    const postId = req.query.postId;
    const data = await Post.find({_id: postId});
    return res.status(200).send({ message: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};



module.exports = {
  addPost,
  getAllPosts,
  getPostsByPage,
  getPostsByUserId,
  getPostsById
};
