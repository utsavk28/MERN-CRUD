const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const Post = require('../../models/Post');

// @route       Post api/posts
// @description Create a post
// @access      Public
router.post(
    '/',
    [
        [
            check('text', 'Text is required').not().isEmpty(),
            check('title', 'Title is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newPost = new Post({
                title: req.body.title,
                text: req.body.text,
            });
            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Server Error' });
        }
    }
);

// @route       Get api/posts
// @description Get all posts
// @access      Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route       Update api/posts/:id
// @description Update post by Id
// @access      Public
router.put('/:id', async (req, res) => {
    try {
        let post = await Post.findById(req.params.id).sort({ date: -1 });
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        let postContent = { ...post._doc };
        if (req.body.title) {
            postContent = {
                ...postContent,
                title: req.body.title,
            };
        }
        if (req.body.text) {
            postContent = {
                ...postContent,
                text: req.body.text,
            };
        }
        post = await Post.findOneAndUpdate(
            { _id: req.params.id },
            { $set: postContent },
            { new: true }
        );
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route       Delete api/posts/:id
// @description Delete a post
// @access      Public
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ msg: 'Post does not exists' });
        }

        await post.remove();

        res.json({ msg: 'Post Removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
