const mongoose = require('mongoose');
const passport = require('passport');
// const _ = require('lodash');

const User = mongoose.model('User');
const Order = mongoose.model('Order');

const Razorpay = require('razorpay');
const localENV = require('../localenv/localenv');
// const fileHelper = require('../util/file');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

console.log('local_key', localENV.LOCAL_key_id, 'production key', process.env.KEY_ID)
let instance = new Razorpay({
    key_id: process.env.KEY_ID || localENV.LOCAL_key_id,
    key_secret: process.env.KEY_SECRET || localENV.LOCAL_key_secret,
});

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
            let options = {
                amount: 1.00 * 100, // amount in the smallest currency unit
                currency: "INR",
                receipt: "order_rcptid_11",
                payment_capture: 1.00
            };
            instance.orders.create(options, (err, order) => {
                if (err) {
                    console.log('orderEr', err);
                    return next(err);
                }
                if (order) {
                    console.log(order);
                    const postOrder = new Order({
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
                    postOrder.save().then(() => {
                        return res.status(200).send({
                            success: true,
                            message: 'Order placed successfully!',
                            orderId: order.id,
                            value: order,
                            key:  process.env.KEY_ID || localENV.LOCAL_key_id
                        });
                    }).catch((err) => {
                        return next(err);
                    });

                }
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

        let options = {
            amount: 1.00 * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11",
            payment_capture: 1.00
        };
        instance.orders.create(options, (err, order) => {
            if (err) {
                console.log('orderEr', err);
                return next(err);
            }
            if (order) {
                console.log(order);
                const postOrder = new Order({
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
                postOrder.save().then(() => {
                    return res.status(200).send({
                        success: true,
                        message: 'Order placed successfully!',
                        orderId: order.id,
                        value: order,
                        key: process.env.KEY_ID || localENV.LOCAL_key_id
                    });
                }).catch((err) => {
                    return next(err);
                });

            }
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
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'User record not found.'
                });
            } else {
                return res.status(200).json({
                    status: true,
                    user: user
                });
            }
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.patchUpdateUserProfile = (req, res, next) => {
    try {
        const id = req._id;
        User.findOne({
            _id: id
        }, (err, foundedObject) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                if (!foundedObject) {
                    res.status(404).send();
                } else {
                    if (req.body.fullName) {
                        foundedObject.fullName = req.body.fullName;
                    }
                    if (req.body.service) {
                        foundedObject.service = req.body.service;
                    }
                    if (req.body.email) {
                        foundedObject.email = req.body.email;
                    }
                    if (req.body.password) {
                        foundedObject.password = User.hashPassword(req.body.password);
                    }
                    if (req.body.bio || req.body.bio === "") {
                        foundedObject.bio = req.body.bio;
                    }
                    if (req.body.phone) {
                        foundedObject.phone = req.body.phone;
                    }
                    if (req.body.goals) {
                        foundedObject.goals = req.body.goals;
                    }
                    if (req.body.age) {
                        foundedObject.age = req.body.age;
                    }
                    if (req.body.height) {
                        foundedObject.height = req.body.height;
                    }
                    if (req.body.weight) {
                        foundedObject.weight = req.body.weight;
                    }
                    if (req.body.loseOrGain) {
                        foundedObject.loseOrGain = req.body.loseOrGain;
                    }
                    if (req.body.goingGym) {
                        foundedObject.goingGym = req.body.goingGym;
                    }
                    if (req.body.foodType) {
                        foundedObject.foodType = req.body.foodType;
                    }
                    if (req.body.medicalIssue) {
                        foundedObject.medicalIssue = req.body.medicalIssue;
                    }
                    if (req.body.foodAllergy) {
                        foundedObject.foodAllergy = req.body.foodAllergy;
                    }

                    foundedObject.save((err, updatedObject) => {
                        if (err) {
                            res.status(500).send({
                                message: err
                            });
                        } else {
                            res.send({
                                message: 'Profile Updated Successfully!',
                                user: updatedObject
                            })
                        }
                    })
                }
            }
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.getUserOrders = (req, res, next) => {
    try {

        Order.find({
            'user.userId': req._id
        }).then(orders => {
            if (!orders || orders.length < 1) {
                return res.status(404).json({
                    status: false,
                    message: 'No Orders found.'
                });
            } else {
                return res.status(200).json({
                    status: true,
                    orders: orders
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