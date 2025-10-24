import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import expenseRouter from './routes/expenseRoutes.js';
import insightRouter from './routes/insightRoutes.js'; 

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8000; 

connectDB();

// Middleware
app.use(express.json()); 
app.use(cookieParser());

import cors from 'cors';
const allowedOrigins = [
  'http://localhost:5173',
  'https://expense-tracker-app-tau-nine.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Health check route
app.get('/', (req, res) => {
  res.send('MERN Expense Tracker API is Running!');
});

// Main routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/expenses', expenseRouter);    
app.use('/api/insights', insightRouter);      


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
