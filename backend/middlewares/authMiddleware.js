const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get the user and attach it to the request
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({error: "Not a Valid Token"});
        }
    }
    if(!token) {
        res.status(401).json({error: "Not Logged In"});
    }
}

module.exports = { protect };