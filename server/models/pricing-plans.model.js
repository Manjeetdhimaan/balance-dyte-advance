const mongoose = require('mongoose');

const prcingPlanSchema = new mongoose.Schema({
    planPrice: {
        type: String,
        trim: true,
        required: [true, 'Plan Price can\'t be empty']
    },
    mrpPrice: {
        type: String,
        trim: true
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
    currency: {
        type:String,
        required: [true, 'Please enter currency type'],
        default: "INR"
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