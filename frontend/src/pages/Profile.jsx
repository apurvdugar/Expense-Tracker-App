import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useOutletContext } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const { expenses } = useOutletContext();

  // Load or set budget from localStorage
  const storedBudget = localStorage.getItem("user_budget");
  const [budget, setBudget] = useState(storedBudget ? Number(storedBudget) : 10000);
  const [editing, setEditing] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget);

  // Account stats
  const categories = [...new Set(expenses.map(e => e.category))];
  const totalSpend = expenses.reduce((a, b) => a + b.amount, 0);

  function saveBudget() {
    setBudget(budgetInput);
    localStorage.setItem("user_budget", budgetInput);
    setEditing(false);
  }

  return (
    <div className="relative min-h-screen bg-linear-to-tr from-white via-slate-50 to-green-50 pt-24">
      <div className="absolute -top-32 -left-32 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-green-100 via-blue-100 to-cyan-100 blur-2xl opacity-25 animate-blob1" />
      <div className="absolute -bottom-40 -right-40 w-88 h-88 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-green-100 to-indigo-100 blur-2xl opacity-25 animate-blob2" />

      <div className="container mx-auto max-w-7xl py-10 px-4">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight mb-8">
          Profile
        </h1>
        <div className="flex flex-col gap-1 mb-8">
          <div><span className="font-semibold">Name:</span> {user?.name || "N/A"}</div>
          <div><span className="font-semibold">Email:</span> {user?.email || "N/A"}</div>
          {/* Add more fields here as available */}
        </div>
        {/* Budget edit */}
        <div className="mb-8">
          <div className="font-semibold text-green-700 mb-2">Monthly Budget</div>
          {!editing ? (
            <div className="flex items-center gap-4">
              <span className="font-bold text-xl">₹{budget.toLocaleString()}</span>
              <button
                className="px-4 py-1 rounded bg-green-200 text-green-700 font-semibold hover:bg-green-300"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <input
                type="number"
                className="border rounded px-3 py-2 w-32"
                value={budgetInput}
                min={0}
                onChange={e => setBudgetInput(Number(e.target.value))}
              />
              <button
                className="px-4 py-1 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
                onClick={saveBudget}
              >
                Save
              </button>
              <button
                className="px-4 py-1 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        {/* Account stats */}
        <div className="mb-8">
          <div className="font-semibold text-green-700 mb-2">Account Stats</div>
          <div>Total Spend: <span className="font-bold">₹{totalSpend.toLocaleString()}</span></div>
          <div>Transactions: <span className="font-bold">{expenses.length}</span></div>
          <div>Categories Used: <span className="font-bold">{categories.length}</span> ({categories.join(", ")})</div>
        </div>
        {/* Future: Add settings/options here */}
        {/* <div>Reset expenses | Export | Change password | Delete account</div> */}
      </div>
    </div>
  );
}

export default Profile;
