const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

app.use(bodyParser.json());

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('We are on home!');
});

mongoose.connect(
    process.env.DB_CONNECTION_URL,
    () => console.log('Connected to MongoDB!')
);

app.listen(3000);