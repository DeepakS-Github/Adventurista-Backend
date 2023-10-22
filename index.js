const express = require('express');
const cors = require("cors");
require("./config/connectDB.js");

const user = require('./routes/user');
const post = require('./routes/post');
const comment = require('./routes/comment');


const PORT = 4500;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/user", user);
app.use("/api/post", post);
app.use("/api/comment", comment);


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
})