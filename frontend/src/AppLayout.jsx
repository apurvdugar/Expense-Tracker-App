import { useState, useEffect } from "react";
import AddExpenseModal from "./components/Dashboard/AddExpenseModal";
import Navbar from "./components/Layout/Navbar";
import { Outlet } from "react-router-dom";

const BACKEND_URL = 'https://expense-tracker-app-backend-1.onrender.com';

function AppLayout() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Centralized fetch function
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, skipping fetch');
        setLoading(false);
        return;
      }

      console.log('Fetching expenses...');
      
      const response = await fetch(`${BACKEND_URL}/api/expenses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

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
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
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

      // Refetch expenses after adding
      await fetchExpenses();
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
      {/* Pass loading state and refetch function to children */}
      <Outlet context={{ expenses, setExpenses, loading, refetchExpenses: fetchExpenses }} />
    </>
  );
}

export default AppLayout;
