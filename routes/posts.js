const { request } = require('express');
const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (request, response) => {
    try {
        const posts = await Post.find();
        response.json(posts);
    } catch (err) {
        response.json({ message: err });
    }
});

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

router.get('/:postId', async (request, response) => {
    try {
        const post = await Post.findById(request.params.postId);
        response.json(post);
    } catch (err) {
        response.json({ message: err });
    }
});

router.delete('/:postId', async (request, response) => {
    try {
        const postRemoved = await Post.remove({ _id: request.params.postId });
        response.json(postRemoved);
    } catch (err) {
        response.json({ message: err });
    }
});

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