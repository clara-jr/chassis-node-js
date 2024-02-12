import express from 'express';
const router = express.Router();
import Controller from '../controllers/controller.js';
import { asyncErrorHandler } from './catch-async-errors.js';

// define the home page route
router.get('/', asyncErrorHandler(Controller.getAll));

export default router;
