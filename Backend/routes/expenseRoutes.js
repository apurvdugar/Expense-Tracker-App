import express from 'express';
import validUserMiddleware from '../middleware/validUser.js';  // Adjust path if needed
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';

const expenseRouter = express.Router();

expenseRouter.get('/', validUserMiddleware, getExpenses);
expenseRouter.post('/', validUserMiddleware, addExpense);
expenseRouter.put('/:id', validUserMiddleware, updateExpense);
expenseRouter.delete('/:id', validUserMiddleware, deleteExpense);

export default expenseRouter;
