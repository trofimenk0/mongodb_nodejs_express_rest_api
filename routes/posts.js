const { request } = require('express'); // хз що за тема, я цього не додавав, воно автоматично додалось
const { response } = require('express'); // хз що за тема, я цього не додавав, воно автоматично додалось
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Post = require('../models/Post');

/**
 * Get all the posts
 */
router.get('/', async (request, response) => {
    try {
        const posts = await Post.find();
        response.json(posts);
    } catch (err) {
        response.json({ message: err });
    }
});

/**
 * Adds one post
 */
router.post('/', async (request, response) => {
    const post = new Post({
        title: request.body.title,
        description: request.body.description,
    });

    try {
        const postSaved = await post.save();
        response.json(postSaved);
    } catch (err) {
        response.json({ message: err });
    }
});

/**
 * Gets back a specific post
 */
router.get('/:postId', async (request, response) => {
    try {
        const post = await Post.findById(request.params.postId);
        response.json(post);
    } catch (err) {
        response.json({ message: err });
    }
});

/**
 * Delete a specific post
 */
router.delete('/:postId', async (request, response) => {
    try {
        const postRemoved = await Post.remove({ _id: request.params.postId });
        response.json(postRemoved);
    } catch (err) {
        response.json({ message: err });
    }
});

/**
 * Update a specific post
 */
router.patch('/:postId', async (request, response) => {
    try {
        const postUpdated = await Post.updateOne(
            { _id: request.params.postId },
            {
                $set: {
                    title: request.body.title,
                }
            },
        );
        response.json(postUpdated);
    } catch (err) {
        response.json({ message: err });
    }
});

module.exports = router;