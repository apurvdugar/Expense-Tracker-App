import { useState, useEffect } from "react";
import AddExpenseModal from "./components/Dashboard/AddExpenseModal";
import Navbar from "./components/Layout/Navbar";
import { Outlet } from "react-router-dom";

const BACKEND_URL = 'https://expense-tracker-app-backend-1.onrender.com';

function AppLayout() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from backend on mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found, skipping fetch');
          return;
        }

        console.log('Fetching expenses with token:', token);
        
        // ✅ FIXED: Added /api/expenses to the URL
        const response = await fetch(`${BACKEND_URL}/api/expenses`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        console.log('Fetch expenses response:', response);

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched expenses:', data);
          setExpenses(data.expenses || []);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch expenses:', errorData);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = async (newExpense) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        alert('Please login first');
        return;
      }

      console.log('Adding expense:', newExpense);

      
      const response = await fetch(`${BACKEND_URL}/api/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          amount: newExpense.amount,
          category: newExpense.category.toLowerCase(),
          description: newExpense.description
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          console.error('Parsed error:', errorData);
          alert(`Failed to add expense: ${errorData.message}`);
        } catch {
          console.error('Could not parse error as JSON');
          alert(`Failed to add expense: ${errorText}`);
        }
        return;
      }

      const result = await response.json();
      console.log('Expense added:', result);

      // Refetch expenses to get the latest data
      const getResponse = await fetch(`${BACKEND_URL}/api/expenses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (getResponse.ok) {
        const data = await getResponse.json();
        setExpenses(data.expenses || []);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  const handleOpenAddExpense = () => setShowAddExpense(true);
  const handleCloseAddExpense = () => setShowAddExpense(false);

  return (
    <>
      <Navbar onAddExpense={handleOpenAddExpense} />
      <AddExpenseModal
        visible={showAddExpense}
        onClose={handleCloseAddExpense}
        onAddExpense={handleAddExpense}
      />
      <Outlet context={{ expenses, setExpenses }} />
    </>
  );
}

export default AppLayout;
