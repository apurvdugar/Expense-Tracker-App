import { useOutletContext } from "react-router-dom";
import CategoryPieChart from "../components/Insights/categoryPieChart";
import ExpenseTrendChart from "../components/Insights/ExpenseTrendChart";
import TopCategories from "../components/Insights/TopCategories";
import BudgetProgress from "../components/Insights/BudgetProcessbar";
import LargeTransactions from "../components/Insights/LargeTransactions";
import MonthComparison from "../components/Insights/MonthComparison";
import ExportInsightsCSV from "../components/Insights/ExportInsightsCSV";

export default function Insights() {
  const { expenses } = useOutletContext();

  // Gather monthly stats
  const now = new Date();
  const thisMonthExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  const monthlyTotal = thisMonthExpenses.reduce((a, b) => a + b.amount, 0);
  const highest = thisMonthExpenses.reduce(
    (max, curr) => (curr.amount > max.amount ? curr : max),
    { amount: 0, description: "(No description)" }
  );
  const lowest = thisMonthExpenses.length
    ? thisMonthExpenses.reduce(
        (min, curr) => (curr.amount < min.amount ? curr : min),
        thisMonthExpenses[0]
      )
    : { amount: 0, description: "(No description)" };

  return (
    <div className="relative min-h-screen bg-linear-to-tr from-white via-slate-50 to-green-50 pt-24">
      <div className="absolute -top-32 -left-32 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-green-100 via-blue-100 to-cyan-100 blur-2xl opacity-25 animate-blob1" />
      <div className="absolute -bottom-40 -right-40 w-88 h-88 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-green-100 to-indigo-100 blur-2xl opacity-25 animate-blob2" />

      <div className="container mx-auto max-w-7xl py-10 px-4">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight mb-8">
          Insights Dashboard
        </h1>

        {/* ---------- Stats Cards Row ---------- */}
        <div className="flex flex-wrap gap-6 justify-center mb-10">
          <div className="bg-white w-72 rounded-xl shadow p-6">
            <div className="font-bold text-green-700 mb-2">Monthly Total</div>
            <div className="font-extrabold text-xl">
              ₹{monthlyTotal.toLocaleString()}
            </div>
          </div>
          <div className="bg-white w-72 rounded-xl shadow p-6">
            <div className="font-bold text-green-700 mb-2">Highest Expense</div>
            <div className="font-extrabold text-xl">
              ₹{highest.amount}
              <span className="block text-sm font-normal text-gray-600">
                {highest.description && `(${highest.description})`}
              </span>
            </div>
          </div>
          <div className="bg-white w-72 rounded-xl shadow p-6">
            <div className="font-bold text-green-700 mb-2">Lowest Expense</div>
            <div className="font-extrabold text-xl">
              ₹{lowest.amount}
              <span className="block text-sm font-normal text-gray-600">
                {lowest.description && `(${lowest.description})`}
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Main Analytics Grid ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <h2 className="font-bold text-lg text-green-700 mb-2 text-center">
              Category-wise Expense Distribution
            </h2>
            <CategoryPieChart expenses={expenses} />
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <h2 className="font-bold text-lg text-green-700 mb-2 text-center">
              Spending Trend (Daily)
            </h2>
            <ExpenseTrendChart expenses={expenses} />
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <TopCategories expenses={expenses} />
          </div>
        </div>

        {/* ---------- Lower Analytics Grid ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-xl shadow p-6 h-full flex flex-col justify-between">
            <BudgetProgress expenses={expenses} budget={100000} />
          </div>
          <div className="bg-white rounded-xl shadow p-6 h-full flex flex-col justify-between">
            <LargeTransactions expenses={expenses} count={3} />
          </div>
          <div className="bg-white rounded-xl shadow p-6 h-full flex flex-col justify-between">
            <MonthComparison expenses={expenses} />
          </div>
        </div>

        {/* ---------- CSV Export Button ---------- */}
        <div className="flex justify-end mt-4">
          <ExportInsightsCSV expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
