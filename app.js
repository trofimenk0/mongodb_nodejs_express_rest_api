const { response } = require('express'); // хз що за тема, я цього не додавав, воно автоматично додалось
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

/**
 * Middleware for body parser
 */
app.use(bodyParser.json());

/**
 * Import routes
 */
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

/**
 * Routes
 */
app.get('/', (request, response) => {
    response.send('We are on home!');
});

/**
 * Connect to MongoDB
 */
mongoose.connect(
    process.env.DB_CONNECTION_URL,
    () => console.log('Connected to MongoDB!')
);

// Listerning
app.listen(3000);