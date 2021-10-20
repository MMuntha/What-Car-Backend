import express from 'express';
import generalController from '../Controllers/generalController.js';
import postController from '../Controllers/postController.js';

const router = express.Router();

router.post('/userDetails', generalController.userDetails)
router.post('/findAllById', postController.findAllById)
router.post('/addComment', generalController.addComment)
export default router;