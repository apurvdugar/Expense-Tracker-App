# 💰 Expense Tracker App

A modern, responsive web application for tracking personal expenses with category management, insights, and financial reporting.

## 🚀 Features

- **User Authentication**: Secure signup/login system
- **Dashboard Overview**: Quick insights into spending patterns
- **Expense Management**: Add, edit, and delete expenses
- **Category Tracking**: Organize expenses by custom categories
- **Visual Reports**: Charts and graphs for expense analysis
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Financial Tips**: Built-in financial advice section

## 🛠️ Tech Stack

- **Frontend**:
  - React.js with Vite
  - Radix UI for components
  - TailwindCSS for styling
  - Tremor for charts
  - React Router for navigation

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for database
  - JWT for authentication

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🚀 Running the App

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📱 Usage

1. Sign up for a new account or login
2. Add expenses from the dashboard
3. Categorize your spending
4. View insights and reports
5. Track your financial progress

## 🔒 Environment Variables

### Backend
- `PORT`: Server port (default: 8000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend
- `VITE_API_BASE_URL`: Backend API URL

## 📁 Project Structure

```
expense-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── ...
    └── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for UI components
- [Tremor](https://www.tremor.so/) for charts
- [TailwindCSS](https://tailwindcss.com/) for styling

## 📧 Contact

Your Name - [@apurvdugar](https://twitter.com/yourusername)

Project Link: https://github.com/apurvdugar/Expense-Tracker-App