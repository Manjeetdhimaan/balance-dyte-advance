const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    planDetails: {
        paymentStatus: {
            type: String,
            trim: true,
            enum: ['Failed', 'Pending', 'Processing', 'Success'],
            default: 'Pending'
        },
        payableTotal: {
            type: String,
            trim: true
        },
        planPrice: {
            type: String,
            trim: true
        },
        planName: {
            type: String,
            trim: true,
            required: [true, 'Plan Name can\'t be empty' ]
        },
        planDuration: {
            type: String,
            trim: true,
            required: [true, 'Plan Duration can\'t be empty' ]
        },
        goals: {
            type: String,
            trim: true,
            required: [true, 'Please mention your goals' ]
        },
        weight: {
            type: String,
            trim: true,
            required: [true, 'Please mention your weight' ]
        },
        height: {
            type: String,
            trim: true,
            required: [true, 'Please mention your height' ]
        },
        loseOrGain: {
            type: String,
            trim: true,
            required: [true, 'Please mention whether you want to lose or gain weight' ]
        },
        foodType: {
            type: String,
            trim: true,
            required: [true, 'Please mention your whether you are vegetarian or non vegetarian']
        },
        goingGym: {
            type: String,
            trim: true,
            required: [true, 'Please mention your whether you go to gym or not']
        },
        medicalIssue: {
            type: String,
            trim: true
        },
        foodAllergy: {
            type: String,
            trim: true
        },
    },
    user: {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
}, {
    timestamps: true
});

mongoose.model('Order', orderSchema);