import { useState, useEffect } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/Dashboard/StatCard';
import { DollarSign, TrendingDown, Calendar, PieChart } from 'lucide-react';
import ExpensePieChart from '../components/Dashboard/ExpensePieChart';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { expenses } = useOutletContext();

  // Expense calculations
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpenses = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      const now = new Date();
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const categoryCount = [...new Set(expenses.map(e => e.category))].length;

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const recentExpenses = [...expenses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <>
      
    <div className="relative min-h-screen bg-linear-to-tr from-white via-slate-50 to-green-50 overflow-x-hidden pt-24">
      {/* Animated Blobs */}
      <div className="absolute -top-32 -left-32 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-green-100 via-blue-100 to-cyan-100 blur-2xl opacity-25 animate-blob1" />
      <div className="absolute -bottom-40 -right-40 w-88 h-88 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-green-100 to-indigo-100 blur-2xl opacity-25 animate-blob2" />


      <div className="container mx-auto max-w-7xl py-10 px-4">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight mb-4">Financial Overview</h1>
        {/* Stat Cards Row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            icon={DollarSign}
            colorClass="bg-linear-to-br from-lime-500 via-green-500 to-green-700 text-white "
            glass
            />
          <StatCard
            title="This Month"
            value={`₹${thisMonthExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            icon={Calendar}
            colorClass="bg-linear-to-br from-blue-400 via-cyan-400 to-cyan-700 text-white"
            glass
          />
          <StatCard
            title="Total Transactions"
            value={expenses.length}
            icon={TrendingDown}
            colorClass="bg-linear-to-br from-zinc-700 via-gray-700 to-blue-600 text-white"
            glass
            />
          <StatCard
            title="Categories"
            value={categoryCount}
            icon={PieChart}
            colorClass="bg-linear-to-br from-orange-400 via-pink-500 to-red-500 text-white"
            glass
            />
        </div>

        {/* Lower analytics section: Expense Distribution + Recent Expenses */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/90 rounded-xl shadow border border-slate-100 p-6 min-h-[280px]">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Expense Distribution</h2>
            {/* Pie chart or analytics here */}
             <ExpensePieChart expenses={expenses} />
          </div>
          <div className="bg-white/90 rounded-xl shadow border border-slate-100 p-6 min-h-[280px]">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Expenses</h2>
            {recentExpenses.length === 0 ? (
              <div className="text-slate-400 py-6 text-center">No recent expenses yet.</div>
            ) : (
              <div className="rounded-2xl bg-linear-to-br from-white via-slate-50 to-green-50 shadow-md border border-slate-100 p-6 min-h-[280px]">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="font-semibold text-gray-700 pb-1">Name</th>
                    <th className="font-semibold text-gray-700 pb-1">Category</th>
                    <th className="font-semibold text-gray-700 pb-1">Amount</th>
                    <th className="font-semibold text-gray-700 pb-1">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExpenses.map((e, i) => (
                    <tr key={e.id || i} className="border-t text-sm">
                      <td className="py-1">{e.description}</td>
                      <td className="py-1">{e.category}</td>
                      <td className="py-1 font-bold text-green-600">₹{e.amount}</td>
                      <td className="py-1">{new Date(e.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>

          </div>
        </div>
      </div>

      <style>{`
        .glass-effect { backdrop-filter: blur(14px) saturate(160%); background-blend-mode: soft-light; }
        @keyframes blob1 {0%,100%{transform:scale(1);} 33%{transform:scale(1.11) translateY(-10px);} 66%{transform:scale(0.96) translateX(6px);} }
        @keyframes blob2 {0%,100%{transform:scale(1);} 25%{transform:scale(1.05) translateY(-5px);} 55%{transform:scale(0.94) translateX(-13px);} }
        .animate-blob1 { animation: blob1 21s infinite cubic-bezier(.44,1.36,.45,.97);}
        .animate-blob2 { animation: blob2 19s infinite cubic-bezier(.23,.99,.52,.99);}
        html { scroll-behavior: smooth; }
        `}</style>
    
    </>
  );
};

export default Dashboard;
