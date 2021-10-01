import express from 'express';
import userAuthController from '../Controllers/userAuthController.js'

const router = express.Router();

router.post('/userSignUp', userAuthController.userSignup);
router.post('/userLogin', userAuthController.userLogin)

export default router