const mongoose = require('mongoose');

const prcingPlanSchema = new mongoose.Schema({
    planPrice: {
        type: String,
        required: true,
        required: [true, 'Plan Price can\'t be empty']
    },
    planName: {
        type: String,
        trim: true,
        required: [true, 'Plan Name can\'t be empty']
    },
    planDuration: {
        type: String,
        trim: true,
        required: [true, 'Plan Duration can\'t be empty']
    },
    inclusions: {
        type: Array,
        trim: true,
        required: [true, 'Plan inclusions can\'t be empty']
    },
    selectPlanBtnName: {
        type: String,
        trim: true,
        required: [true, 'Plan Button Name can\'t be empty']
    },
    planUrlLink: {
        type: String,
        trim: true,
        required: [true, 'Plan UrlLink can\'t be empty']
    },
}, {
    timestamps: true
});

mongoose.model('PricingPlan', prcingPlanSchema);