const express = require('express');
const { createTweet, getTweets, getTweet, updateTweet, deleteTweet } = require('../controllers/tweetController');
const {protect} = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all the tweets
router.get('/', protect, getTweets)

// Get the Single tweet
router.get('/:id', protect, getTweet)

// Post a new Tweet
router.post('/', protect, createTweet)

// Delete a Tweet
router.delete('/:id', protect, deleteTweet) 

// Update a Tweet
router.patch('/:id', protect, updateTweet)

module.exports = router;