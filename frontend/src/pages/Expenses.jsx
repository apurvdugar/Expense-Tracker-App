import { useState, useEffect } from "react";
import { ChevronDown, Pencil, Trash2, Download } from "lucide-react";
import EditExpenseModal from "../components/Dashboard/EditExpenseModal";
import DeleteExpenseModal from "../components/Dashboard/DeleteExpenseModal";
import { useOutletContext } from "react-router-dom";

const columns = [
  { key: "name", label: "Expense Name" },
  { key: "category", label: "Category" },
  { key: "date", label: "Created At" },
  { key: "amount", label: "Amount" },
  { key: "edit/delete", label: "Edit/Delete" },
];

const ExpensesPage = () => {
  const { expenses, setExpenses } = useOutletContext();
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(columns.map(c => c.key));
  const [showColsDrop, setShowColsDrop] = useState(false);
  const [page, setPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);


  const perPage = 10;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(data);
  }, []);

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

  const confirmDelete = () => {
    const updated = expenses.filter(e => e.id !== expenseToDelete.id);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setDeleteModalOpen(false);
    setExpenseToDelete(null);
    };

  // Export to CSV utility (basic)
  const exportToCSV = (data) => {
    const header = columns.map(col => col.label).join(",");
    const rows = data.map(e =>
      [
        e.description,
        e.category,
        new Date(e.date).toLocaleDateString(),
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

  // Dummy handlers for edit/delete
  const startEditExpense = (expense) => {
    setExpenseToEdit(expense);
    setEditModalOpen(true);
  };

    const handleEditSave = (updatedExpense) => {
    const updated = expenses.map(e =>
        e.id === updatedExpense.id ? { ...updatedExpense } : e
    );
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    setEditModalOpen(false);
    };

  const handleDelete = (id) => {
    const exp = expenses.find(e => e.id === id);
    setExpenseToDelete(exp);
    setDeleteModalOpen(true);
    };

    

  return (
    <>
    <DeleteExpenseModal visible={deleteModalOpen} expense={expenseToDelete} onClose={() => setDeleteModalOpen(false)} onConfirm={confirmDelete} />
    <EditExpenseModal visible={editModalOpen} expense={expenseToEdit} onClose={() => setEditModalOpen(false)} onSave={handleEditSave} />

    <div className="relative min-h-screen bg-linear-to-tr from-white via-slate-50 to-green-50 overflow-x-hidden pt-24">
        <div className="absolute -top-32 -left-32 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-green-100 via-blue-100 to-cyan-100 blur-2xl opacity-25 animate-blob1" />
      <div className="absolute -bottom-40 -right-40 w-88 h-88 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-green-100 to-indigo-100 blur-2xl opacity-25 animate-blob2" />
      
      <div className="container mx-auto max-w-7xl py-10 px-4">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight mb-4">Detailed Expenses</h1>
        <div className="max-w-5xl mx-auto pt-4">
          <div className="flex items-center justify-between mb-4">
            <input
              className="border rounded px-4 py-2 w-1/3"
              placeholder="Filter names..."
              value={search}
              onChange={e => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                />
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 bg-gray-100 rounded border font-medium hover:bg-gray-200 cursor-pointer"
                onClick={() => exportToCSV(filtered)}
              >
                Export CSV <Download className="inline-block w-4 h-4 ml-1" />
              </button>
              {/* Columns dropdown */}
              <div className="relative inline-block">
                <button
                  className="px-6 py-2 bg-gray-100 rounded border font-medium cursor-pointer hover:bg-gray-200"
                  onClick={() => setShowColsDrop(s => !s)}
                  >
                  Columns <ChevronDown className="inline-block w-4 h-4 ml-1" />
                </button>
                {showColsDrop && (
                  <div className="absolute z-20 right-0 mt-1 bg-white border rounded shadow min-w-[120px] max-h-44 overflow-y-auto">
                    {columns.map(col => (
                        <label key={col.key} className="block px-3 py-2">
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(col.key)}
                          onChange={() => handleColumnToggle(col.key)}
                          className="mr-2"
                        />
                        {col.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden shadow bg-white">
            <table className="w-full text-left">
              <thead>
                <tr>
                    {columns
                    .filter(col => visibleColumns.includes(col.key))
                    .map(col => (
                        <th key={col.key} className="px-4 py-3 text-gray-700 font-semibold border-b">
                        {col.label}
                        </th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {paginated.length === 0 ? (
                    <tr>
                    <td colSpan={visibleColumns.length} className="py-10 text-center text-slate-400 font-medium">
                        No results.
                    </td>
                    </tr>
                ) : (
                    paginated.map((e, i) => (
                    <tr key={e.id || i} className="hover:bg-slate-50 transition">
                        {visibleColumns.includes("name") && (
                        <td className="px-4 py-3">{e.description}</td>
                        )}
                        {visibleColumns.includes("category") && (
                        <td className="px-4 py-3">{e.category}</td>
                        )}
                        {visibleColumns.includes("date") && (
                        <td className="px-4 py-3">{new Date(e.date).toLocaleDateString()}</td>
                        )}
                        {visibleColumns.includes("amount") && (
                        <td className="px-4 py-3 font-bold text-green-600">₹{e.amount}</td>
                        )}
                        {visibleColumns.includes("edit/delete") && (
                        <td className="px-4 py-3 whitespace-nowrap">
                            <button
                            onClick={() => startEditExpense(e)}
                            className="text-blue-600 hover:bg-blue-50 rounded-full p-1 mr-1"
                            title="Edit"
                            >
                            <Pencil size={18}/>
                            </button>
                            <button
                            onClick={() => handleDelete(e.id)}
                            className="text-red-600 hover:bg-red-50 rounded-full p-1"
                            title="Delete"
                            >
                            <Trash2 size={18}/>
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
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded border bg-gray-50 font-medium disabled:opacity-40"
              >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page * perPage >= filtered.length}
              className="px-4 py-2 rounded border bg-gray-50 font-medium disabled:opacity-40"
              >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ExpensesPage;
