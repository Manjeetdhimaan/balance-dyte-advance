const express = require('express');
const router = express.Router();

const ctrlpricingPlan = require('../controllers/pricing-plan.controller');

router.get('/getPricingPlans', ctrlpricingPlan.getPricingPlans);
router.post('/postPricingPlan', ctrlpricingPlan.postPricingPlan);

module.exports = router;