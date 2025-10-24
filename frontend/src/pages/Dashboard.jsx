import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Layout/Navbar';
import StatCard from '../components/Dashboard/statCard';
import ExpenseForm from '../components/Dashboard/ExpenseForm';
import ExpenseList from '../components/Dashboard/ExpenseList';
import { DollarSign, TrendingDown, Calendar, PieChart } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  const handleAddExpense = (newExpense) => {
    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const now = new Date();
    return expenseDate.getMonth() === now.getMonth() && 
           expenseDate.getFullYear() === now.getFullYear();
  }).reduce((sum, expense) => sum + expense.amount, 0);

  const categoryCount = [...new Set(expenses.map(e => e.category))].length;

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses.toFixed(2)}`}
            icon={DollarSign}
            colorClass="from-primary to-accent"
          />
          <StatCard
            title="This Month"
            value={`₹${thisMonthExpenses.toFixed(2)}`}
            icon={Calendar}
            colorClass="from-accent to-primary"
          />
          <StatCard
            title="Total Transactions"
            value={expenses.length}
            icon={TrendingDown}
            colorClass="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Categories"
            value={categoryCount}
            icon={PieChart}
            colorClass="from-orange-500 to-pink-500"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
