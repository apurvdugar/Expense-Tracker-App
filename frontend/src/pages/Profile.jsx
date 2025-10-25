import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useOutletContext } from "react-router-dom";

const BACKEND_URL = 'https://expense-tracker-app-backend-1.onrender.com';

function Profile() {
  const { user } = useAuth();
  const { expenses } = useOutletContext();

  const [budget, setBudget] = useState(10000);
  const [editing, setEditing] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false); 

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${BACKEND_URL}/api/user/budget`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setBudget(data.budget || 10000);
          setBudgetInput(data.budget || 10000);
        }
      } catch (error) {
        console.error('Error fetching budget:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, []);

  // Account stats
  const categories = [...new Set(expenses.map(e => e.category))];
  const totalSpend = expenses.reduce((a, b) => a + b.amount, 0);

  async function saveBudget() {
    try {
      setSaveLoading(true); 
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/api/user/budget`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ budget: budgetInput })
      });

      if (response.ok) {
        setBudget(budgetInput);
        setEditing(false);
        
        alert('✅ Budget updated successfully!');
      } else {
        alert('❌ Failed to update budget');
      }
    } catch (error) {
      console.error('Error saving budget:', error);
      alert('❌ Failed to update budget. Please try again.');
    } finally {
      setSaveLoading(false); 
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-tr from-white via-slate-50 to-green-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-linear-to-tr from-white via-slate-50 to-green-50 pt-24">
      <div className="absolute -top-32 -left-32 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-green-100 via-blue-100 to-cyan-100 blur-2xl opacity-25 animate-blob1" />
      <div className="absolute -bottom-40 -right-40 w-88 h-88 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-green-100 to-indigo-100 blur-2xl opacity-25 animate-blob2" />

      <div className="container mx-auto max-w-7xl py-10 px-4">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight mb-8">
          Profile
        </h1>
        
        {/* User Info Card */}
        <div className="bg-white/90 rounded-xl shadow-md border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 w-20">Name:</span>
              <span className="text-gray-900">{user?.name || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 w-20">Email:</span>
              <span className="text-gray-900">{user?.email || "N/A"}</span>
            </div>
          </div>
        </div>
        
        {/* Budget Card */}
        <div className="bg-white/90 rounded-xl shadow-md border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-green-700 mb-4">Monthly Budget</h2>
          {!editing ? (
            <div className="flex items-center gap-4">
              <span className="font-bold text-2xl text-gray-900">₹{budget.toLocaleString()}</span>
              <button
                className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
                onClick={() => setEditing(true)}
              >
                Edit Budget
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <input
                type="number"
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-48 font-medium focus:border-green-500 focus:ring-1 focus:ring-green-300"
                value={budgetInput}
                min={0}
                onChange={e => setBudgetInput(Number(e.target.value))}
                disabled={saveLoading}
              />
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
                  onClick={saveBudget}
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition disabled:opacity-50"
                  onClick={() => {
                    setBudgetInput(budget);
                    setEditing(false);
                  }}
                  disabled={saveLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Account Stats Card */}
        <div className="bg-white/90 rounded-xl shadow-md border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-green-700 mb-4">Account Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-linear-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-sm font-medium text-green-700 mb-1">Total Spend</div>
              <div className="text-2xl font-bold text-green-900">₹{totalSpend.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-sm font-medium text-blue-700 mb-1">Transactions</div>
              <div className="text-2xl font-bold text-blue-900">{expenses.length}</div>
            </div>
            <div className="p-4 bg-linear-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-sm font-medium text-purple-700 mb-1">Categories Used</div>
              <div className="text-2xl font-bold text-purple-900">{categories.length}</div>
            </div>
          </div>
          {categories.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">Active Categories:</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
