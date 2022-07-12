const express = require('express');
const { createTweet, getTweets, getTweet, updateTweet, deleteTweet } = require('../controllers/tweetController');

const router = express.Router();

// Get all the tweets
router.get('/', getTweets)

// Get the Single tweet
router.get('/:id', getTweet)

// Post a new Tweet
router.post('/', createTweet)

// Delete a Tweet
router.delete('/:id', deleteTweet)

// Update a Tweet
router.patch('/:id', updateTweet)

module.exports = router;