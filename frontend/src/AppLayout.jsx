import { useState, useEffect } from "react";
import AddExpenseModal from "./components/Dashboard/AddExpenseModal";
import Navbar from "./components/Layout/Navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Shared expense state for all children!
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
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
