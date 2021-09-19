const express = require('express');
const userAuthController = require('../Controllers/userAuth');

const router = express.Router();

router.post('/userSignUp', userAuthController.userSignup);

module.exports = router;