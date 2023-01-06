const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const orderSchema = new mongoose.Schema({
    paymentStatus: {
        type: String,
        required: 'Status of payment'
    },
    payableTotal: {
        type: Number,
        required: 'Email can\'t be empty',
        unique: true
    },
    planPrice: {
        type: Number,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    orderDate: {
        type: Date,
        required: [true, 'Please provide gender'],
        trim: true,
        default: 'Not Defined'
    },
    planDetails: {
        type: Object,
        required: [true, 'Plan Details'],
        trim: true
    },
    user: {
        email: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    saltSecret: String
}, {
    timestamps: true
});

mongoose.model('Order', orderSchema);