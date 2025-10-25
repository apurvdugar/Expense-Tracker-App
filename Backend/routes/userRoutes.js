import express from 'express';
import validUserMiddleware from '../middleware/validUser.js';
import { getCurrentUser, getBudget, updateBudget } from '../controllers/userController.js';

const userRouter = express.Router();

// Get current user info
userRouter.get('/current', validUserMiddleware, getCurrentUser);

// Budget routes
userRouter.get('/budget', validUserMiddleware, getBudget);
userRouter.put('/budget', validUserMiddleware, updateBudget);

export default userRouter;
