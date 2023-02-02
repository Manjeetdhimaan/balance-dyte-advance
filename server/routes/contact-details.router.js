const express = require('express');
const router = express.Router();

const ctrlContactDetails = require('../controllers/contact-details.controller');

router.get('/getContactDetails', ctrlContactDetails.getContactDetails);
router.post('/postContactDetails', ctrlContactDetails.postContactDetails);

module.exports = router;