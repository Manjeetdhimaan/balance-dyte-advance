const mongoose = require('mongoose');
const passport = require('passport');
// const _ = require('lodash');

const User = mongoose.model('User');
const Order = mongoose.model('Order');
// const fileHelper = require('../util/file');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

const userExists = async (email) => {
    const user = await User.findOne({
        email: email.toLowerCase().trim()
    })
    if (user) {
        return true;
    } else {
        return false;
    }
}

module.exports.postRegisterUser = async (req, res, next) => {
    try {
        let newUser = new User();
        newUser.fullName = req.body.fullName;
        newUser.email = req.body.email;
        newUser.password = User.hashPassword(req.body.password);
        newUser.confirmPassword = req.body.confirmPassword;
        // user.password = User.hashPassword(req.body.password);
        newUser.phone = req.body.phone;
        newUser.gender = req.body.gender;
        newUser.goals = req.body.goals;
        newUser.age = req.body.age;
        newUser.height = req.body.height;
        newUser.weight = req.body.weight;
        newUser.loseOrGain = req.body.loseOrGain;
        newUser.goingGym = req.body.goingGym;
        newUser.foodType = req.body.foodType;
        newUser.medicalIssue = req.body.medicalIssue;
        newUser.foodAllergy = req.body.foodAllergy;

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(422).send({
                success: false,
                message: 'Passwords do not match'
            });
        }

        if (await userExists(req.body.email)) {
            return res.status(409).json({
                success: false,
                message: 'Account with this email address exists already!'
            })
        }
        newUser.save().then(() => {
            const order = new Order({
                user: {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    phone: req.body.phone,
                    userId: newUser._id
                },

                planDetails: {
                    paymentStatus: 'Success',
                    payableTotal: req.body.payableTotal,
                    planPrice: req.body.planPrice,
                    planName: req.body.planName,
                    planDuration: req.body.planDuration,
                    goals: req.body.goals,
                    age: req.body.age,
                    height: req.body.height,
                    weight: req.body.weight,
                    loseOrGain: req.body.loseOrGain,
                    goingGym: req.body.goingGym,
                    foodType: req.body.foodType,
                    medicalIssue: req.body.medicalIssue,
                    foodAllergy: req.body.foodAllergy,
                },
            });
            order.save();
            return res.status(200).send({
                success: true,
                message: 'Order placed successfully!'
            });

        }).catch(err => {
            console.log(err);
            if (err.code == 11000)
                return res.status(409).send({
                    success: false,
                    message: 'Account with this email address exists already!'
                });
            else
                return next(err);
        })

    } catch (err) {
        return next(err);
    }
}

module.exports.postPlaceOrder = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req._id).then((user) => {
            return user
        });

        const order = new Order({
            user: {
                fullName: currentUser.fullName,
                email: currentUser.email,
                phone: currentUser.phone,
                userId: req._id
            },
            planDetails: {
                paymentStatus: 'Success',
                payableTotal: req.body.payableTotal,
                planPrice: req.body.planPrice,
                planName: req.body.planName,
                planDuration: req.body.planDuration,
                goals: req.body.goals,
                age: req.body.age,
                height: req.body.height,
                weight: req.body.weight,
                loseOrGain: req.body.loseOrGain,
                goingGym: req.body.goingGym,
                foodType: req.body.foodType,
                medicalIssue: req.body.medicalIssue,
                foodAllergy: req.body.foodAllergy,
            },
        });
        order.save().then(() => {
            return res.status(200).send({
                success: true,
                message: 'Order placed successfully!'
            });
        }).catch((err) => {
            return next(err);
        });

    } catch (err) {
        return next(err);
    }
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    try {
        passport.authenticate('user', (err, user, info) => {
            // error from passport middleware
            if (err) return res.status(400).json(err);
            // registered user
            else if (user) return res.status(200).json({
                "token": user.generateJwt(),
                "_id": user['_id'],
                "name": user['fullName']
            });
            // unknown user or wrong password
            else {
                return res.status(404).json(info);
            }
        })(req, res, next);
    } catch (err) {
        return next(err);
    }

}

module.exports.getUserProfile = (req, res, next) => {
    try {
        User.findOne({
                _id: req._id
            },
            (err, user) => {
                if (!user)
                    return res.status(404).json({
                        status: false,
                        message: 'User record not found.'
                    });
                else
                    return res.status(200).json({
                        status: true,
                        user: user
                    });
            }
        );
    } catch (err) {
        return next(err);
    }
}