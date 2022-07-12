const mongoose = require('mongoose');

// Function to create a New Schema
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    paragraph: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    hashtags: {
        type: Array,
    }
}, {timestamps: true})

module.exports = mongoose.model('Tweet', tweetSchema);