const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');
// const extractFile = require("../middleware/file");

router.post('/register', ctrlUser.postRegisterUser);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/getUserProfile',jwtHelper.verifyJwtToken, ctrlUser.getUserProfile);
router.post('/postPlaceOrder', jwtHelper.verifyJwtToken, ctrlUser.postPlaceOrder);
router.patch('/patchUpdateUserProfile', jwtHelper.verifyJwtToken, ctrlUser.patchUpdateUserProfile);
router.get('/getUserOrders',jwtHelper.verifyJwtToken, ctrlUser.getUserOrders);
router.get('/getUserOrder/:orderId',jwtHelper.verifyJwtToken, ctrlUser.getUserOrder);
router.put('/change-password', jwtHelper.verifyJwtToken, ctrlUser.putChangePassword);

// password reset
router.post('/req-reset-password', ctrlUser.resetPassword);
router.post('/new-password', ctrlUser.newPassword);
router.post('/valid-password-token', ctrlUser.validatePasswordToken);

module.exports = router;