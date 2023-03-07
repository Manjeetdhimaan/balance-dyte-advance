const express = require('express');
const router = express.Router();

const ctrlBlogs = require('../controllers/blog.controller');

router.get('/get-blogs', ctrlBlogs.getBlogs);
router.post('/post-blog', ctrlBlogs.postBlog);

module.exports = router;