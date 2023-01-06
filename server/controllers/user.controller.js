const mongoose = require('mongoose');
const passport = require('passport');
// const _ = require('lodash');

const User = mongoose.model('User');
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

module.exports.registerUser = async (req, res, next) => {

    try {
        let user = new User();
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.password = User.hashPassword(req.body.password);
        user.confirmPassword = req.body.confirmPassword;
        // user.password = User.hashPassword(req.body.password);
        user.phone = req.body.phone;
        user.gender = req.body.gender;
        user.goals = req.body.goals;
        user.age = req.body.age;
        user.height = req.body.height;
        user.weight = req.body.weight;
        user.loseOrGain = req.body.loseOrGain;
        user.goingGym = req.body.goingGym;
        user.foodType = req.body.foodType;
        user.medicalIssue = req.body.medicalIssue;
        user.foodAllergy = req.body.foodAllergy;

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(422).send({
                success: false,
                message: 'Passwords do not match'
            });
        }

        if (await userExists(req.body.email)) {
            return res.status(409).json({
                success: false,
                message: 'Account with this email address exits already!'
            })
        }
        user.save().then(() => {
            return res.status(200).send({
                success: true,
                message: 'User added succussfully!'
            });
        }).catch(err => {
            console.log(err);
            if (err.code == 11000)
                return res.status(409).send({
                    success: false,
                    message: 'Account with this email address exits already!'
                });
            else
                return next(err);
        })

    } catch (err) {
        return next(err);
    }
}