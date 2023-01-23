const mongoose = require('mongoose');

const PricingPlan = mongoose.model('PricingPlan');

module.exports.getPricingPlans = (req, res, next) => {
    try {
        PricingPlan.find().then(plans => {
            if (!plans || plans.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'No Plans found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    plans: plans
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

module.exports.postPricingPlan = async (req, res, next) => {
    try {
        let pricingPlan = new PricingPlan();
        pricingPlan.planPrice = req.body.planPrice;
        pricingPlan.planName = req.body.planName;
        pricingPlan.planDuration = req.body.planDuration;
        pricingPlan.inclusions = req.body.inclusions;
        pricingPlan.selectPlanBtnName = req.body.selectPlanBtnName;
        pricingPlan.planUrlLink = req.body.planUrlLink;
        pricingPlan.save().then(() => {
            return res.status(200).send({
                success: true,
                message: 'Plan added succussfully!'
            });
        }).catch(err => {
                return next(err);
        })

    } catch (err) {
        return next(err);
    }
}