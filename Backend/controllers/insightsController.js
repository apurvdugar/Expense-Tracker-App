import express from "express";
import { GoogleGenAI } from '@google/genai'; 
import ExpenseModel from '../models/expenses.model.js';

const router = express.Router();

function prepareExpenseData(expenses) {
    const monthlyTotals = {};
    expenses.forEach(exp => {
      const month = new Date(exp.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
    });

    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
    const categoryPercentages = {};
    Object.entries(categoryTotals).forEach(([category, amount]) => {
      categoryPercentages[category] = ((amount / total) * 100).toFixed(1);
    });

    return {
      total,
      categoryPercentages,
      monthlyTotals,
      timespan: {
        start: expenses.length ? expenses[expenses.length-1].createdAt : null,
        end: expenses.length ? expenses[0].createdAt : null
      }
    };
}

function generateAnalysisPrompt(data) {
    return `As a financial advisor, analyze this expense data and provide detailed insights:
Total Spending: ₹${data.total}
Time Period: ${new Date(data.timespan.start).toLocaleDateString()} to ${new Date(data.timespan.end).toLocaleDateString()}
Category Breakdown (% of total):
${Object.entries(data.categoryPercentages).map(([c, p]) => `- ${c}: ${p}%`).join('\n')}
Monthly Spending:
${Object.entries(data.monthlyTotals).map(([m,a]) => `- ${m}: ₹${a}`).join('\n')}
Please provide:
1. Key Observations
2. Budget Optimization
3. Risk Analysis
4. Positive Habits
5. Action Items
Format the response with bullet points.`;
}

// GET: AI Expense Insights
export const getAIInsights = async (req, res) => {
    try {
        const userId = req.userId;
        const expenses = await ExpenseModel.find({ user: userId })
          .sort({ createdAt: -1 })
          .limit(100);

        if (!expenses.length) return res.status(404).json({ message: 'No expenses found' });

        const data = prepareExpenseData(expenses);
        const prompt = generateAnalysisPrompt(data);

        // Gemini API Client initialization
        // Note: The new SDK class is GoogleGenAI
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        // 🛑 FIX 2: Switched to the current stable model ID
        const model = ai.getGenerativeModel({
            // 'gemini-pro' is deprecated/unreliable. Use the current stable alias.
            model: 'gemini-2.5-flash', 
            // Note: Safety settings may not be needed for this benign prompt,
            // but the structure is fine.
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
        });

        try {
            // Note: Using sendMessage with startChat() is for multi-turn conversations.
            // For a single request like this, generateContent is simpler and more efficient.
            const chat = model.startChat({ history: [] });
            const result = await chat.sendMessage({ message: prompt });
            
            // 🛑 FIX 3: In the new SDK, accessing text is usually a direct property.
            // However, since you're using chat.sendMessage, it should be .text()
            const text = result.response.text;
            
            if (!text) {
                // Add a fallback for blocked/empty text
                return res.status(500).json({ message: "AI generated an empty or blocked response. Please check prompt/settings." });
            }
            
            return res.json({ insights: text, expenseData: data });
        } catch (aiError) {
            console.error('AI Generation Error:', aiError);
            // Propagate the specific AI error message
            return res.status(500).json({ message: "Failed to generate AI insights", error: aiError.message });
        }

    } catch (error) {
        console.error('Error in insights controller:', error);
        res.status(500).json({
          message: "Failed to process insights request",
          error: error.message
        });
    }
};

// GET: Statistics (kept unchanged)
export const getStatistics = async (req, res) => {
    try {
        const userId = req.userId;
        const expenses = await ExpenseModel.find({ user: userId });

        if (!expenses.length) return res.status(404).json({ message: 'No expenses found' });

        const currentDate = new Date();
        const currentMonthExpenses = expenses.filter(exp => {
          const d = new Date(exp.createdAt);
          return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
        });

        const monthlyTotalSpending = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

        const categorySpending = expenses.reduce((acc, exp) => {
          acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
          return acc;
        }, {});

        const monthlySpending = expenses.reduce((acc, exp) => {
          const month = new Date(exp.createdAt).toLocaleString('default', { month: 'long' });
          acc[month] = (acc[month] || 0) + exp.amount;
          return acc;
        }, {});

        const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
        const highestExpense = sortedExpenses[0];
        const lowestExpense = sortedExpenses[sortedExpenses.length - 1];

        res.json({ monthlyTotalSpending, categorySpending, monthlySpending, highestExpense, lowestExpense });
    } catch (error) {
        console.error('Error generating statistics:', error);
        res.status(500).json({ message: "Failed to generate insights" });
    }
};