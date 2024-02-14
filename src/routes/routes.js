import express from 'express';
const router = express.Router();
import Controller from '../controllers/controller.js';
import asyncErrorHandler from '../middlewares/async-error-handler.js';

router.get('/', asyncErrorHandler(Controller.getAll));

export default router;
