require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const tweetRoutes = require('./routes/tweetRoutes');

// middlewares
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/tweets', tweetRoutes);

// Connect to the Database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to the Database');
    // Listen to the requests
    app.listen(process.env.PORT, () => {
        console.log('Listening at Port', process.env.PORT);
    })
}).catch(err => {
    console.log(err);
});
