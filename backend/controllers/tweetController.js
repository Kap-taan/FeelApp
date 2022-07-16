const Tweet = require('../models/Tweet');
const mongoose = require('mongoose');

// get all the tweets
const getTweets = async (req, res) => {
    // Getting all the tweets and sorted in decending order
    const tweets = await Tweet.find({}).sort({createdAt: -1});
    res.status(200).json(tweets);
}

// single tweet
const getTweet = async (req, res) => {
    const { id } = req.params;

    // Check if the id entered is valid or not
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'No Such Tweet'});
    }

    const tweet = await Tweet.findById(id);

    if(!tweet) {
        return res.status(400).json({message: "No Such Tweet"});
    }

    res.status(200).json(tweet);

}


// create a new tweet
const createTweet = async (req, res) => {
    const {paragraph, likes, hashtags} = req.body;
    console.log(req.body.id);
    // adding new tweet to the db
    try {
        const tweet = await Tweet.create({
            paragraph,
            likes,
            hashtags,
            user: req.user._id,
            userId: req.user.userName,
            userName: req.user.name
        });
        res.status(200).json(tweet);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// delete a tweet
const deleteTweet = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'No Such Tweet Exist'});
    }

    const tweet = await Tweet.findOneAndDelete({_id: id});
    
    if(!tweet) {
        return res.status(400).json({message: 'No Such Tweet'});
    }

    res.status(200).json({message: "Deleted Successfully"});

}


// update a tweet
const updateTweet = async (req, res) => {
    const { id } = req.params;
    const { paragraph, likes, hashtags } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'No Such Tweet'});
    }

    const tweet = await Tweet.findByIdAndUpdate({_id: id}, {
        paragraph, likes, hashtags
    })

    if(!tweet) {
        res.status(400).json({message: 'No Such Tweet'});
    }

    res.status(200).json(tweet);

}


module.exports = {
    createTweet,
    getTweets,
    getTweet,
    deleteTweet,
    updateTweet
}