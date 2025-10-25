import ExpenseModel from '../models/expenses.model.js';
import { expensePayloadSchema } from '../validators/expenseValidator.js';

// GET: List expenses for the logged-in user
export const getExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await ExpenseModel.find({ user: userId });
    res.status(200).json({ expenses, message: "Expenses fetched successfully" });
  } catch (e) {
    console.error('Get expenses error:', e);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// POST: Add a new expense
export const addExpense = async (req, res) => {
  try {
    console.log('Add expense request:', {
      body: req.body,
      userId: req.userId,
      headers: req.headers.authorization
    });
    
    const { amount, category, description } = req.body;
    
    const validated = expensePayloadSchema.safeParse(req.body);
    if (!validated.success) {
      console.error('Validation error:', validated.error.issues);
      return res.status(400).json({ 
        message: validated.error.issues[0]?.message || 'Validation failed',
        errors: validated.error.issues 
      });
    }

    if (!req.userId) {
      console.error('No userId found in request');
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const newExpense = await ExpenseModel.create({
      amount,
      category: category.toLowerCase(),
      description,
      user: req.userId,
    });
    
    console.log('Expense created:', newExpense);
    
    res.status(201).json({ 
      message: "Expense added", 
      expense: newExpense 
    });
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ 
      message: "Failed to add expense",
      error: error.message 
    });
  }
};

// PUT: Update an expense
export const updateExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const validated = expensePayloadSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({ 
        message: validated.error.issues[0]?.message || 'Validation failed'
      });
    }

    const expenseId = req.params.id;
    const expense = await ExpenseModel.updateOne(
      { _id: expenseId, user: req.userId },
      { amount, category: category.toLowerCase(), description }
    );
    res.status(200).json({ message: "Expense updated", expense });
  } catch (e) {
    console.error('Update expense error:', e);
    res.status(500).json({ message: "Failed to update expense", error: e.message });
  }
};

// DELETE: Remove an expense
export const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    await ExpenseModel.deleteOne({ _id: expenseId, user: req.userId });
    res.status(200).json({ message: "Expense deleted" });
  } catch (e) {
    console.error('Delete expense error:', e);
    res.status(500).json({ message: "Failed to delete expense", error: e.message });
  }
};
