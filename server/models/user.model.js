const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const localENV = require('../localenv/localenv');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    gender: {
        type: String,
        // required: [true, 'Please provide gender'],
        trim: true
    },
    phone: {
        type: String,
        // required: [true, 'Please provide mobile number'],
        trim: true
    },
    imagePath: {
        type: String,
        trim: true
    },
    age: {
        type: String,
        trim: true,
        // required: [true, 'Please mention your age']
    },
    weight: {
        type: String,
        trim: true,
        // required: [true, 'Please mention your weight']
    },
    height: {
        type: String,
        trim: true,
        // required: [true, 'Please mention your height']
    },
    goals: {
        type: String,
        trim: true,
        // required: [true, 'Please mention your goals']
    },
    loseOrGain: {
        type: String,
        trim: true,
        // required: [true, 'Please mention your whether you want to loose or gain weight']
    },
    foodType: {
        type: String,
        trim: true,
        // required: [true, 'Please mention your whether you are vegetarian or non vegetarian']
    },
    goingGym: {
        type: String,
        trim: true,
        // required: [true, 'Please mention your whether you go to gym or not']
    },
    medicalIssue: {
        type: String,
        trim: true
    },
    foodAllergy: {
        type: String,
        trim: true
    },
    resettoken: {
        type: String
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    saltSecret: String
}, {
    timestamps: true
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
// userSchema.pre('save', function (next) {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             this.password = hash;
//             this.saltSecret = salt;
//             next();
//         });
//     });
// });

// Methods
userSchema.statics.hashPassword = function hashPassword(password) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
        });
    });
    return bcrypt.hashSync(password, 10);
}

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


userSchema.methods.generateJwt = function () {
    return jwt.sign({
            _id: this._id
        },
        process.env.JWT_SECRET || localENV.LOCAL_JWT_SECRET, {
            expiresIn: process.env.JWT_EXP || localENV.LOCAL_JWT_EXP
        });
}


mongoose.model('User', userSchema);