import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ExpenseModel from "../models/expenses.model.js";

const router = express.Router();

router.get("/api/ai-tips", async (req, res) => {
  try {
    
    const userId = req.user?.id; // Depends on your auth middleware

    // Fetch user expenses
    const expenses = await ExpenseModel.find({ user: userId });

    // Build a prompt for Gemini
    const prompt = `
      Analyze these expenses and give me 5 personalized financial improvement tips for an Indian user:
      ${expenses.map(e => `- Rs.${e.amount} for ${e.category} (${e.description}) on ${new Date(e.date).toLocaleDateString()}`).join("\n")}
    `;

    // Call Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const aiMessage = result.response.text();

    res.json({ insights: aiMessage });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch AI insights", error: err.message });
  }
});

export default router;
