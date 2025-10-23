import ExpenseModel from '../models/expenses.model.js';
import { expensePayloadSchema } from '../validators/expenseValidator.js';

// GET: List expenses for the logged-in user
export const getExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await ExpenseModel.find({ user: userId });
    res.status(200).json({ expenses, message: "Expenses fetched successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// POST: Add a new expense
export const addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    // Validate input
    const validated = expensePayloadSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({ message: validated.error.errors[0].message });
    }

    await ExpenseModel.create({
      amount,
      category: category.toLowerCase(),
      description,
      user: req.userId,
    });

    res.status(201).json({ message: "Expense added" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense" });
  }
};

// PUT: Update an expense
export const updateExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const validated = expensePayloadSchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({ message: validated.error.errors[0].message });
    }

    const expenseId = req.params.id;
    const expense = await ExpenseModel.updateOne(
      { _id: expenseId, user: req.userId },
      { amount, category, description }
    );
    res.status(200).json({ message: "Expense updated", expense });
  } catch (e) {
    res.status(500).json({ message: "Failed to update expense" });
  }
};

// DELETE: Remove an expense
export const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    await ExpenseModel.deleteOne({ _id: expenseId, user: req.userId });
    res.status(200).json({ message: "Expense deleted" });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
