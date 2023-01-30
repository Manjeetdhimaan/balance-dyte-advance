const mongoose = require('mongoose');
const passport = require('passport');
// const _ = require('lodash');

const User = mongoose.model('User');
const Order = mongoose.model('Order');
const PricingPlan = mongoose.model('PricingPlan');

const Razorpay = require('razorpay');
const localENV = require('../localenv/localenv');
// const fileHelper = require('../util/file');

const crypto = require('crypto');
const nodemailer = require('nodemailer');

let instance = new Razorpay({
    key_id: process.env.KEY_ID || localENV.LOCAL_key_id,
    key_secret: process.env.KEY_SECRET || localENV.LOCAL_key_secret,
});

const sendDietMail = (req, currentUser) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_USER || localENV.LOCAL_MAILER_AUTH_EMAIL,
            pass: process.env.AUTH_PASS || localENV.LOCAL_MAILER_AUTH_PASS
        }
    });
    const mailOptions = {
        from: 'balancedyte@gmail.com',
        to: process.env.AUTH_USER || localENV.LOCAL_MAILER_AUTH_EMAIL,
        subject: 'Order for diet plan from ' + req.body.domain,
        html: `<h2>${currentUser ? currentUser.fullName.toUpperCase() : req.body.fullname.toUpperCase()} ordered for diet plan on ${req.body.domain}</h2> 
        <h3> Name:  <strong><i>${currentUser ? currentUser.fullName : req.body.fullname}</i></strong></h3>
        <h3> Email:  <strong><i>${currentUser ? currentUser.email : req.body.email}</i></strong></h3>
        <h3> Contact No.:  <strong><i>${currentUser ? currentUser.phone : req.body.phone}</i></strong></h3>
        <h3> Gender:  <strong><i>${currentUser ? currentUser.gender : req.body.gender}</i></strong></h3>
        <h3> Age(in years):  <strong><i>${req.body.age}</i></strong></h3>
        <h3> Duration of Plan:  <strong><i>${req.body.planDuration}</i></strong></h3>
        <h3> Goals:  <strong><i>${req.body.goals}</i></strong></h3>
        <h3> Lose/Gain Weight:  <strong><i>${req.body.loseOrGain}</i></strong></h3>
        <h3> Weight(in kg(s)):  <strong><i>${req.body.weight}</i></strong></h3>
        <h3> Height(in feet inches):  <strong><i>${req.body.height}</i></strong></h3>
        <h3> Medical Issue:  <strong><i>${req.body.medicalIssue ? req.body.medicalIssue : 'No Medical Issue'}</i></strong></h3>
        <h3> Food Allergy:  <strong><i>${req.body.foodAllergy ? req.body.foodAllergy : 'No Allergy'}</i></strong></h3>
        <h3> Food Type:  <strong><i>${req.body.foodType}</i></strong></h3>
        <h3> Going to Gym?:  <strong><i>${req.body.goingGym}</i></strong></h3>
        <h3> Plan Name:  <strong><i>${req.body.planName}</i></strong></h3>
        `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            //   res.send({error: error})
        } else {
            res.send({res: info.response, message: 'Details sent successfully'})
        }
    });
}


const sendResetPasswordMail = (req, user) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: process.env.AUTH_USER || localENV.LOCAL_MAILER_AUTH_EMAIL,
            pass: process.env.AUTH_PASS || localENV.LOCAL_MAILER_AUTH_PASS
        }
    });
    const mailOptions = {
        to: user.email,
        from: user.email,
        subject: 'Password Reset from ' + req.body.domain,
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            req.body.domain + '/user/response-reset-password/' + user.resettoken + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            //   res.send({error: error})
        } else {
            console.log('Email sent')
            // res.send({res: info.response, message: 'Details sent successfully'})
        }
    })
}

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
        let user = new User();
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.password = User.hashPassword(req.body.password);
        user.confirmPassword = req.body.confirmPassword;

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
        user.save().then(() => {
            return res.status(200).send({
                success: true,
                message: 'User added succussfully!'
            });
        }).catch(err => {
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

module.exports.postRegisterUserAndCreateOrder = async (req, res, next) => {
    try {
        let newUser = new User();
        newUser.fullName = req.body.fullName;
        newUser.email = req.body.email;
        newUser.password = User.hashPassword(req.body.password);
        newUser.confirmPassword = req.body.confirmPassword;
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
        const selectedPlan = await PricingPlan.find({planUrlLink: req.body.planUrl}).then(plan => {
            return plan[0];
        });

        newUser.save().then(() => {
            let options = {
                amount: +selectedPlan['planPrice'] * 100, // amount in the smallest currency unit
                currency: "INR",
                receipt: "order_rcptid_11",
                payment_capture: +selectedPlan['planPrice'] * 100
            };
            instance.orders.create(options, (err, order) => {
                if (err) {
                    return next(err);
                }
                if (order) {
                    return res.status(200).send({
                        success: true,
                        message: 'Creating Order',
                        orderId: order.id,
                        value: order,
                        userId: newUser._id,
                        key: process.env.KEY_ID || localENV.LOCAL_key_id
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

module.exports.postCreateOrder = async (req, res, next) => {
    try {
        // const currentUser = await User.findById(req._id).then((user) => {
        //     return user;
        // });
        const selectedPlan = await PricingPlan.find({planUrlLink: req.body.planUrl}).then(plan => {
            return plan[0];
        });

        let options = {
            amount: +selectedPlan['planPrice'] * 100, // amount in the smallest currency unit
            currency: "INR",
            payment_capture: +selectedPlan['planPrice'] * 100
        };
        instance.orders.create(options, (err, order) => {
            if (err) {
                return next(err);
            }
            if (order) {
                return res.status(200).send({
                    success: true,
                    message: 'Creating order',
                    orderId: order.id,
                    value: order,
                    userId: req._id,
                    key: process.env.KEY_ID || localENV.LOCAL_key_id
                });
            }
        });
    } catch (err) {
        return next(err);
    }
}

module.exports.postOrderResponse = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req._id || req.body.userId).then((user) => {
            return user;
        });

        const selectedPlan = await PricingPlan.find({planUrlLink: req.body.planUrl}).then(plan => {
            return plan[0];
        });
        const postOrder = new Order({
            razorPayOrderId: "#" + req.body.order_id,
            user: {
                fullName: req.body.fullName ? req.body.fullName : currentUser.fullName,
                email: req.body.email ? req.body.email : currentUser.email,
                phone: req.body.phone ? req.body.phone : currentUser.phone,
                userId: req._id ? req._id : req.body.userId
            },
            planDetails: {
                paymentStatus: 'Success',
                payableTotal: String(selectedPlan['planPrice']),
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
            sendDietMail(req, currentUser);
            return res.status(200).send({
                success: true,
                message: 'Order Placed Successfully',
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
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User record not found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
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
                    if (req.body.gender) {
                        foundedObject.gender = req.body.gender;
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
                    success: false,
                    message: 'No Orders found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
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

module.exports.getUserOrder = (req, res, next) => {
    try {
        Order.find({
            _id: req.params.orderId
        }).then(order => {
            if (order.length > 0) {
                // console.log(order[0]['user']['userId'].equals(req._id)); //true
                // console.log(order[0]['user']['userId'].toString() === (req._id)); //true

                if (!order[0]['user']['userId'].equals(req._id)) {
                    return res.status(401).send({
                        success: false,
                        message: 'Not Authenticated.'
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        order: order
                    });
                }
            } else {
                return res.status(401).send({
                    success: false,
                    message: 'No order found with this id.'
                });
            }
        }).catch(err => {
            console.log(err);
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.putChangePassword = (req, res, next) => {
    User.findOne({
        _id: req._id
    }, (err, user) => {
        // Check if error connecting
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            }); // Return error
        } else {
            // Check if user was found in database
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                }); // Return error, user was not found in db
            } else {
                if (!user.verifyPassword(req.body.oldPassword)) {
                    return res.status(401).json({
                        success: false,
                        message: 'Old password is incorrect'
                    });
                }
                if (req.body.newPassword !== req.body.confirmNewPassword) {
                    return res.status(401).json({
                        success: false,
                        message: 'Paswords do no match'
                    });
                }
                // user.password = req.body.newPassword;
                user.password = User.hashPassword(req.body.newPassword)
                user.save((err, doc) => {
                    if (!err)
                        return res.status(200).send({
                            success: true,
                            message: 'Password Changed succussfully'
                        });
                    else {
                        return next(err);
                    }

                });
            }
        }
    });
}

module.exports.resetPassword = async (req, res) => {
    if (!req.body.email) {
        return res.status(500).json({
            message: 'Email is required.'
        });
    }
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        return res.status(409).json({
            message: 'Account with this email address does not exist on this website.'
        });
    }

    user.resettoken = crypto.randomBytes(16).toString('hex')
    user.save(function (err) {
        if (err) {
            return res.status(500).send({
                msg: err.message
            });
        }

        User.find({
            _id: user._id,
            resettoken: {
                $ne: user.resettoken
            }
        }).remove().exec();
        res.status(200).json({
            message: 'Reset Password successfully.'
        });
        sendResetPasswordMail(req, user);
    })
}


module.exports.validatePasswordToken = async (req, res) => {
    if (!req.body.resettoken) {
        return res
            .status(500)
            .json({
                message: 'Token is required'
            });
    }
    const user = await User.findOne({
        resettoken: req.body.resettoken
    });
    if (!user) {
        return res
            .status(409)
            .json({
                message: 'Invalid URL'
            });
    }
    User.findOne({
        _id: user._id
    }).then(() => {
        res.status(200).json({
            message: 'Token verified successfully.'
        });
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({
            msg: err.message
        });
    });
}

module.exports.newPassword = async (req, res) => {
    User.findOne({
        resettoken: req.body.resettoken
    }, function (err, user, next) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(409)
                .json({
                    message: 'User does not exist'
                });
        } else if (!user.resettoken) {
            return res
                .status(409)
                .json({
                    message: 'Token has expired'
                });
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Paswords do no match'
            });
        }

        user.password = User.hashPassword(req.body.newPassword);
        user.resettoken = null;
        user.save(function (err) {
            if (err) {
                return res
                    .status(400)
                    .json({
                        message: 'Password can not reset.'
                    });
            } else {
                user.resettoken = null;
                return res
                    .status(201)
                    .json({
                        message: 'Password reset successfully'
                    });
            }
        });
    })
}



module.exports.postContactForm = async (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTH_USER || localENV.LOCAL_MAILER_AUTH_EMAIL,
                pass: process.env.AUTH_PASS || localENV.LOCAL_MAILER_AUTH_PASS
            }
        });
        const mailOptions = {
            from: process.env.AUTH_USER,
            to: process.env.AUTH_USER || localENV.LOCAL_MAILER_AUTH_EMAIL,
            subject: req.body.subject + ' (Someone submitted contact form on ' + req.body.domain+')',
            html: `<h2>Someone submitted contact form on ${req.body.domain}</h2> 
            <h3> Name:  <strong><i>${req.body.fullName}</i></strong></h3>
            <h3> Email:  <strong><i>${req.body.email}</i></strong></h3>
            <h3> Contact No:  <strong><i>${req.body.phone}</i></strong></h3>
            <h3> Message.:  <strong><i>${req.body.message}</i></strong></h3>
            `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return next(err);
                //   res.send({error: error})
            } else {
                return res.send({res: info.response, message: 'Form submitted successfully!'});
            }
        });
    } catch (err) {
        return next(err);
    }
}

module.exports.postAppointMentForm = async (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTH_USER || localENV.LOCAL_MAILER_AUTH_EMAIL,
                pass: process.env.AUTH_PASS || localENV.LOCAL_MAILER_AUTH_PASS
            }
        });
        const mailOptions = {
            from: process.env.AUTH_USER,
            to: process.env.AUTH_USER || localENV.LOCAL_MAILER_AUTH_EMAIL,
            subject: 'Appointment form (Someone submitted Appointment form on ' + req.body.domain+')',
            html: `<h2>Someone submitted Appointment form on ${req.body.domain}</h2> 
            <h3> Name:  <strong><i>${req.body.fullName}</i></strong></h3>
            <h3> Email:  <strong><i>${req.body.email}</i></strong></h3>
            <h3> Contact No:  <strong><i>${req.body.phone}</i></strong></h3>
            <h3> Date:  <strong><i>${req.body.date}</i></strong></h3>
            <h3> Service:  <strong><i>${req.body.service}</i></strong></h3>
            <h3> Message.:  <strong><i>${req.body.message}</i></strong></h3>
            `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return next(err);
                //   res.send({error: error})
            } else {
                return res.send({res: info.response, message: 'Form submitted successfully!'});
            }
        });
    } catch (err) {
        return next(err);
    }
}