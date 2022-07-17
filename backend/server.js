require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const tweetRoutes = require('./routes/tweetRoutes');
const userRoutes = require('./routes/userRoutes');


app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


app.use('/api/tweets', tweetRoutes);
app.use('/api/users', userRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to the Database');

    app.listen(process.env.PORT, () => {
        console.log('Listening at Port', process.env.PORT);
    })
}).catch(err => {
    console.log(err);
});
