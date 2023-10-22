const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    postIds: [{type: mongoose.Schema.Types.ObjectId, ref: "posts"}],
    commentIds: [{type: mongoose.Schema.Types.ObjectId, ref: "comments"}],
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('users',userSchema);