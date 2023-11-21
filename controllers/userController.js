const User = require('../models/userSchema');


// SignUp
const signup = async (req, res) => {
    try {
        let data = User(req.body);
        let result = await data.save({ writeConcern: { w: 'majority' } });
        console.log(result);
        return res.status(200).send({message: 'User account created'});
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(400).send({message: 'User with this email already exists'});
        }
        console.log(error);
        return res.status(500).send({message: 'Something went wrong!'});
    }
}


// Login
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404);
            return res.send({ message: "User not found" });
        }
        
        const isPasswordValid = user.password === req.body.password;
        if (!isPasswordValid) {
            res.status(401); 
            return res.send({ message: "Password is incorrect" });
        }
        return res.status(200).send({ message: "User login successful", userId: user._id, userName: user.name, userEmail: user.email });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}


module.exports = {
    signup,
    login
};