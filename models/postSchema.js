const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users",
    required: true,
  },
  commentIds: [{type: mongoose.Schema.Types.ObjectId, ref: "comments"}],
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  travelDate: {
    type: String,
  },
  location: {
    type: String,
  },
  landmark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("posts", postSchema);
