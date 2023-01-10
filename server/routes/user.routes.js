const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');
// const extractFile = require("../middleware/file");

router.post('/register', ctrlUser.postRegisterUser);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/getUserProfile',jwtHelper.verifyJwtToken, ctrlUser.getUserProfile);
router.post('/postPlaceOrder', jwtHelper.verifyJwtToken, ctrlUser.postPlaceOrder);

module.exports = router;