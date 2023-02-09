const mongoose = require('mongoose');

const Testimonial = mongoose.model('Testimonial');

module.exports.getTestimonials = (req, res, next) => {
    try {
        Testimonial.find().then(testimonials => {
            if (!testimonials || testimonials.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'No Testimonials found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    testimonials: testimonials
                });
            }
        }).catch(err => {
            console.log(err)
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.postTestimonial = async (req, res, next) => {
    try {
        let testimonial = new Testimonial();
        testimonial.clientName = req.body.clientName;
        testimonial.clientProfession = req.body.clientProfession;
        testimonial.reviewTitle = req.body.reviewTitle;
        testimonial.reviewContent = req.body.reviewContent;
        testimonial.clientImageSrcObject = {
            beforeImageSrc: req.body.beforeImageSrc,
            afterImageSrc: req.body.afterImageSrc
        };
        testimonial.save().then(() => {
            return res.status(200).send({
                success: true,
                message: 'Testimonial added succussfully!'
            });
        }).catch(err => {
                return next(err);
        });
    } catch (err) {
        return next(err);
    }
}