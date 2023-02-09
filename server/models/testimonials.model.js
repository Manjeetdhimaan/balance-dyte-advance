const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    clientName: {
        type: String,
        trim: true,
        required: [true, 'Name can\'t be empty']
    },
    clientImageSrcObject: {
        type: Object,
        beforeImageSrc: {
            type: String,
            trim: true
        },
        afterImageSrc: {
            type: String,
            trim: true
        }
    },
    clientProfession: {
        type: String,
        trim: true
    },
    reviewTitle: {
        type: String,
        trim: true
    },
    reviewContent: {
        type: String,
        trim: true,
        required: [true, 'Review Content can\'t be empty']
    }
}, {
    timestamps: true
});

mongoose.model('Testimonial', testimonialSchema);