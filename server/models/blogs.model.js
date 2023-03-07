const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true
    },
    category: [],
    header: {
        type: String,
        trim: true
    },
    categoryId: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    urlTitle: {
        type: String,
        trim: true
    },
    metaTitle: {
        type: String,
        trim: true
    },
    metaDesc: {
        type: String,
        trim: true
    },
    subTitles: [],
    dateOfCreatingBlog: {
        type: String,
        trim: true
    },
    imgSrc: {
        type: String,
        trim: true
    },
    instaSimpleLink: {
        type: String,
        trim: true
    },
    twitterSimpleLink: {
        type: String,
        required: false,
        trim: true
    },
    facebookSimpleLink: {
        type: String,
        trim: true
    },
    linkedinSimpleLink: {
        type: String,
        trim: true
    },
    otherFacts: [{
        type: Object,
        fact: {
            type: String,
            trim: true
        },
        imgSrc: {
            type: String,
            trim: true
        },
        imgCaption: {
            type: String,
            trim: true
        },
        videoSrc: {
            type: String,
            trim: true
        },
        instaLink: {
            type: String,
            trim: true
        },
    }],
    subTitleFacts: [{
        type: Object,
        fact: {
            type: String,
            trim: true
        },
        imgSrc: {
            type: String,
            trim: true
        },
        imgCaption: {
            type: String,
            trim: true
        },
        videoSrc: {
            type: String,
            trim: true
        },
        instaLink: {
            type: String,
            trim: true
        },
    }],
    subTitleFactHeader: {
        type: String,
        trim: true
    },
    subTitleFactTitles: [{
        type: Object,
        point: {
            type: String,
            trim: true
        },
    }],
    subTitleFactPoints: [{
        type: Object,
        title: {
            type: String,
            trim: true
        },
        point: {
            type: String,
            trim: true
        },
        imgSrc: {
            type: String,
            trim: true
        },
        floatImage: {
            type: String,
            trim: true
        },
        imgCaption: {
            type: String,
            trim: true
        },
        videoSrc: {
            type: String,
            trim: true
        },
        instaLink: {
            type: String,
            trim: true
        },
    }],
    otherSubTitleFactHeader: {
        type: String,
        trim: true
    },
    otherSubTitleFactTitles: [{
        type: Object,
        point: {
            type: String,
            trim: true
        },
    }],
    otherSubTitleFactPoints: [{
        type: Object,
        title: {
            type: String,
            trim: true
        },
        point: {
            type: String,
            trim: true
        },
        imgSrc: {
            type: String,
            trim: true
        },
        floatImage: {
            type: String,
            trim: true
        },
        imgCaption: {
            type: String,
            trim: true
        },
        videoSrc: {
            type: String,
            trim: true
        },
        instaLink: {
            type: String,
            trim: true
        },
    }],
    finalNotesHeader: {
        type: String,
        trim: true
    },
    finalNotes: [{
        type: Object,
        finalNote: {
            type: String,
            trim: true
        },
    }],
    description: {
        type: String,
        trim: true
    }
}, {
    usePushEach: true
})

module.exports = mongoose.model('Blog', BlogSchema)