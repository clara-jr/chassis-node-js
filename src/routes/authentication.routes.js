import express from 'express';
const router = express.Router();
import AuthController from '../controllers/authentication.controller.js';
import asyncErrorHandler from '../middlewares/async-error-handler.js';

router
  .post('/login', asyncErrorHandler(AuthController.login))
  .post('/refresh', asyncErrorHandler(AuthController.refreshSession))
  .post('/logout', asyncErrorHandler(AuthController.logout));

export default router;
