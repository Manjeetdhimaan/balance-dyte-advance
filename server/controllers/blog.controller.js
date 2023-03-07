const mongoose = require('mongoose');

const Blog = mongoose.model('Blog');

module.exports.getBlogs = (req, res, next) => {
    try {
        Blog.find().then(blogs => {
            if (!blogs || blogs.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'No blogs found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    blogs: blogs
                });
            }
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.postBlog = async (req, res, next) => {
    try {
        const newBlog = new Blog({
            id:req.body.id,
            category: req.body.category,
            header: req.body.header,
            categoryId: req.body.categoryId,
            title: req.body.title,
            urlTitle: req.body.urlTitle,
            metaTitle: req.body.metaTitle,
            metaDesc: req.body.metaDesc,
            subTitles: req.body.subTitles,
            dateOfCreatingBlog: req.body.dateOfCreatingBlog,
            imgSrc: req.body.imgSrc,
            instaSimpleLink: req.body.instaSimpleLink,
            twitterSimpleLink: req.body.twitterSimpleLink,
            facebookSimpleLink: req.body.facebookSimpleLink,
            linkedinSimpleLink: req.body.linkedinSimpleLink,
            otherFacts: req.body.otherFacts,
            subTitleFacts: req.body.subTitleFacts,
            subTitleFactHeader: req.body.subTitleFactHeader,
            subTitleFactTitles: req.body.subTitleFactTitles,
            subTitleFactPoints: req.body.subTitleFactPoints,
            otherSubTitleFactHeader: req.body.otherSubTitleFactHeader,
            otherSubTitleFactTitles: req.body.otherSubTitleFactTitles,
            otherSubTitleFactPoints: req.body.otherSubTitleFactPoints,
            finalNotesHeader: req.body.finalNotesHeader,
            finalNotes: req.body.finalNotes,
            description: req.body.description
        })
        await newBlog.save().then(blog => {
            return res.status(201).json({
                success: true,
                message: 'Blog added successfully'
            })
        }).catch((err) => {
            return res.status(500).json({
                sucess: false,
                error: err.message
            })
        })
    } catch (err) {
        return next(err);
    }
}