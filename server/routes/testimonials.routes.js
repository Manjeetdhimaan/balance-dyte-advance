const express = require('express');
const router = express.Router();

const ctrlTestimonial = require('../controllers/testimonials.controller');

router.get('/getTestimonials', ctrlTestimonial.getTestimonials);
router.post('/postTestimonial', ctrlTestimonial.postTestimonial);

module.exports = router;