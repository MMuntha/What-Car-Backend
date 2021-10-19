import express from 'express';
import generalController from '../Controllers/generalController.js';

const router = express.Router();

router.post('/search', generalController.search)

export default router;