import express from 'express';
import postController from '../Controllers/postController.js'
import upload from '../Middleware/upload.js';

const router = express.Router();

router.post('/predict', upload.single('image'), postController.predict);
router.post('/addPost', upload.single('image'), postController.addPost)

export default router