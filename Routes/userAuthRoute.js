import express from 'express';
import userAuthController from '../Controllers/userAuthController.js'
import upload from '../Middleware/upload.js';


const router = express.Router();

router.post('/userSignUp', upload.single('image'), userAuthController.userSignup);
router.post('/userLogin', userAuthController.userLogin)

export default router