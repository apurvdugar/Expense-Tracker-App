import { useState, useEffect } from "react";
import { ChevronDown, Pencil, Trash2, Download } from "lucide-react";
import EditExpenseModal from "../components/Dashboard/EditExpenseModal";
import DeleteExpenseModal from "../components/Dashboard/DeleteExpenseModal";
import { useOutletContext } from "react-router-dom";
import toast from 'react-hot-toast';

const BACKEND_URL = 'https://expense-tracker-app-backend-1.onrender.com';

const columns = [
  { key: "name", label: "Expense Name" },
  { key: "category", label: "Category" },
  { key: "date", label: "Created At" },
  { key: "amount", label: "Amount" },
  { key: "edit/delete", label: "Edit/Delete" },
];

const ExpensesPage = () => {
  const { expenses, loading, refetchExpenses } = useOutletContext();
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(columns.map(c => c.key));
  const [showColsDrop, setShowColsDrop] = useState(false);
  const [page, setPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    refetchExpenses();
  }, []);
  const perPage = 10;

  const filtered = expenses.filter(
    e =>
      e.description?.toLowerCase().includes(search.toLowerCase()) ||
      e.category?.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleColumnToggle = key => {
    setVisibleColumns(c =>
      c.includes(key) ? c.filter(col => col !== key) : [...c, key]
    );
  };

  const confirmDelete = async () => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');
      const expenseId = expenseToDelete._id || expenseToDelete.id;
      
      const response = await fetch(`${BACKEND_URL}/api/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (response.ok) {
        await refetchExpenses();
        setDeleteModalOpen(false);
        setExpenseToDelete(null);
        toast.success('Expense deleted successfully');
      } else {
        toast.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense');
    } finally {
      setActionLoading(false);
    }
  };

  const exportToCSV = (data) => {
    const header = columns.map(col => col.label).join(",");
    const rows = data.map(e =>
      [
        e.description,
        e.category,
        new Date(e.createdAt).toLocaleDateString(),
        e.amount
      ].join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startEditExpense = (expense) => {
    setExpenseToEdit(expense);
    setEditModalOpen(true);
  };

  const handleEditSave = async (updatedExpense) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');
      const expenseId = updatedExpense._id || updatedExpense.id;
      
      const response = await fetch(`${BACKEND_URL}/api/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          amount: updatedExpense.amount,
          category: updatedExpense.category.toLowerCase(),
          description: updatedExpense.description
        })
      });

      if (response.ok) {
        await refetchExpenses();
        setEditModalOpen(false);
        toast.success('Expense updated successfully');
      } else {
        toast.error('Failed to update expense');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      toast.error('Failed to update expense');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = (expense) => {
    setExpenseToDelete(expense);
    setDeleteModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-tr from-white via-slate-50 to-green-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DeleteExpenseModal 
        visible={deleteModalOpen} 
        expense={expenseToDelete} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={confirmDelete}
        loading={actionLoading}
      />
      <EditExpenseModal 
        visible={editModalOpen} 
        expense={expenseToEdit} 
        onClose={() => setEditModalOpen(false)} 
        onSave={handleEditSave}
        loading={actionLoading}
      />

      <div className="relative min-h-screen bg-linear-to-tr from-white via-slate-50 to-green-50 overflow-x-hidden pt-24">
        {/* Animated Blobs */}
        <div className="absolute -top-32 -left-32 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-green-100 via-blue-100 to-cyan-100 blur-2xl opacity-25 animate-blob1" />
        <div className="absolute -bottom-40 -right-40 w-88 h-88 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-green-100 to-indigo-100 blur-2xl opacity-25 animate-blob2" />
        
        <div className="container mx-auto max-w-7xl py-10 px-4">
          {/* ✅ Changed mb-4 to mb-8 for consistency */}
          <h1 className="text-3xl font-extrabold text-green-700 tracking-tight mb-8">Detailed Expenses</h1>
          
          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <input
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:border-green-500 focus:ring-1 focus:ring-green-300"
              placeholder="Search by name or category..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 cursor-pointer transition flex items-center gap-2"
                onClick={() => exportToCSV(filtered)}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              
              <div className="relative inline-block">
                <button
                  className="px-4 py-2 bg-gray-100 rounded-lg border font-semibold cursor-pointer hover:bg-gray-200 transition flex items-center gap-2"
                  onClick={() => setShowColsDrop(s => !s)}
                >
                  Columns
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showColsDrop && (
                  <div className="absolute z-20 right-0 mt-2 bg-white border rounded-lg shadow-lg min-w-40 max-h-48 overflow-y-auto">
                    {columns.map(col => (
                      <label key={col.key} className="block px-4 py-2 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(col.key)}
                          onChange={() => handleColumnToggle(col.key)}
                          className="mr-2"
                        />
                        <span className="text-sm">{col.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Table */}
          <div className="border rounded-lg overflow-hidden shadow bg-white">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  {columns
                    .filter(col => visibleColumns.includes(col.key))
                    .map(col => (
                      <th key={col.key} className="px-4 py-3 text-gray-700 font-semibold border-b text-sm">
                        {col.label}
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={visibleColumns.length} className="py-12 text-center text-slate-400 font-medium">
                      No expenses found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((e, i) => (
                    <tr key={e._id || i} className="hover:bg-slate-50 transition">
                      {visibleColumns.includes("name") && (
                        <td className="px-4 py-3">{e.description}</td>
                      )}
                      {visibleColumns.includes("category") && (
                        <td className="px-4 py-3 capitalize">{e.category}</td>
                      )}
                      {visibleColumns.includes("date") && (
                        <td className="px-4 py-3 text-gray-600">{new Date(e.createdAt).toLocaleDateString()}</td>
                      )}
                      {visibleColumns.includes("amount") && (
                        <td className="px-4 py-3 font-bold text-green-600">₹{e.amount}</td>
                      )}
                      {visibleColumns.includes("edit/delete") && (
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => startEditExpense(e)}
                            className="text-blue-600 hover:bg-blue-50 rounded-full p-2 mr-1 transition"
                            title="Edit"
                            disabled={actionLoading}
                          >
                            <Pencil size={16}/>
                          </button>
                          <button
                            onClick={() => handleDelete(e)}
                            className="text-red-600 hover:bg-red-50 rounded-full p-2 transition"
                            title="Delete"
                            disabled={actionLoading}
                          >
                            <Trash2 size={16}/>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Showing {paginated.length > 0 ? (page - 1) * perPage + 1 : 0} to {Math.min(page * perPage, filtered.length)} of {filtered.length} expenses
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border bg-white font-semibold disabled:opacity-40 hover:bg-gray-50 transition"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page * perPage >= filtered.length}
                className="px-4 py-2 rounded-lg border bg-white font-semibold disabled:opacity-40 hover:bg-gray-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob1 {0%,100%{transform:scale(1);} 33%{transform:scale(1.11) translateY(-10px);} 66%{transform:scale(0.96) translateX(6px);} }
        @keyframes blob2 {0%,100%{transform:scale(1);} 25%{transform:scale(1.05) translateY(-5px);} 55%{transform:scale(0.94) translateX(-13px);} }
        .animate-blob1 { animation: blob1 21s infinite cubic-bezier(.44,1.36,.45,.97);}
        .animate-blob2 { animation: blob2 19s infinite cubic-bezier(.23,.99,.52,.99);}
      `}</style>
    </>
  );
};

export default ExpensesPage;
