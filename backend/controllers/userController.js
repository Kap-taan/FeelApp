// const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { userName, password, name } = req.body;
    // Check if some field is empty
    if(!userName || !password || !name) {
        return res.status(400).json({error: "Some Field is missing"});
    }
    // Check if the user already exists
    const userExist = await User.findOne({userName});
    if(userExist) {
        return res.status(400).json({error: "User already exists"});
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const user = await User.create({
        userName,
        name,
        password: hashedPassword,
        following: [],
        followers: [],
        profileDP: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
    });

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(400).json({error: "Something went wrong"});
    }

}

// @desc Authenticate the user
// @route POST /api/users/login
// @access public

const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    // Check the userName
    const user = await User.findOne({userName});
    // Now Compare the password
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user._id, 
            userName: user.userName, 
            name: user.name,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({error: "Invalid Credentials"});
    }
}

// @desc Get the user details who is logged in
// @route GET /api/users/me
// @access Private

const getMe = (req, res) => {
    res.json(req.user);
}

// Function to create a JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}