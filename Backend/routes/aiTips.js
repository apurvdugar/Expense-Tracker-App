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
    const modelInstance = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Switched to Flash for faster results
    
    // Call the API
    const result = await modelInstance.generateContent(prompt);
    
    // --- FIX APPLIED HERE: Robust response check and fallback ---
    let aiMessage = result.response.text;

    // Check if the response was blocked by safety filters
    if (!aiMessage) {
        const candidate = result.response.candidates?.[0];
        if (candidate && candidate.finishReason === 'SAFETY') {
            const safetyRating = candidate.safetyRatings?.[0];
            const blockedReason = safetyRating ? `Blocked for safety reason: ${safetyRating.category} at threshold ${safetyRating.threshold}.` : 'Blocked by safety filters.';
            aiMessage = `The AI model's response was blocked by safety filters. ${blockedReason}`;
        } else {
            // General empty response fallback
            aiMessage = "The AI model did not return any insights. Please try again or check the input data for issues.";
        }
    }
    // --- END FIX ---

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