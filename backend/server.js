require('dotenv').config();

const path = require('path');
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

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to the Database');

    app.listen(process.env.PORT, () => {
        console.log('Listening at Port', process.env.PORT);
    })
}).catch(err => {
    console.log(err);
});
