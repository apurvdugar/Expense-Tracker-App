import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ExpenseModel from "../models/expenses.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let expenses = await ExpenseModel.find({});
    console.log("✅ Expenses found:", expenses.length);

    if (!expenses || expenses.length === 0) {
      return res.json({
        insights: "No expenses available to analyze. Add some expenses first to get personalized financial tips!"
      });
    }

    const prompt = `
You are a financial advisor for Indian users. Analyze the following expenses and provide 5 specific, actionable, and personalized money-saving tips.

Expenses:
${expenses.map(e => `- ₹${e.amount} spent on ${e.category} (${e.description}) on ${new Date(e.date).toLocaleDateString('en-IN')}`).join("\n")}

Guidelines:
- Focus on practical, India-specific recommendations (e.g., local alternatives, budget brands, government schemes)
- Provide specific numbers or percentages where possible
- Prioritize tips based on the highest spending categories
- Keep each tip concise (2-3 sentences max)
- Use Indian Rupees (₹) for all monetary values

Format your response as:
1. [Category]: [Specific tip with actionable advice]
2. [Category]: [Specific tip with actionable advice]
...and so on.
    `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using flash for faster response
    
    const result = await model.generateContent(prompt);
    const aiMessage = result.response.text(); // ← FIXED: Added () to call the function

    res.json({ insights: aiMessage });
  } catch (err) {
    console.error("❌ AI Tips route error:", err);
    res.status(500).json({
      message: "Failed to fetch AI insights",
      error: err.message
    });
  }
});

export default router;