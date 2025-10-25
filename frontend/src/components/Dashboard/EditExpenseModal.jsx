import { useState, useEffect } from "react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Utilities",
  "Education",
  "Medical",
  "Entertainment",
  "Other"
];

const EditExpenseModal = ({ visible, expense, onClose, onSave, loading }) => {
  const [form, setForm] = useState({
    description: "",
    category: "",
    amount: ""
  });

  // Keep form in sync with selected expense
  useEffect(() => {
    if (expense) {
      setForm({
        _id: expense._id || expense.id,
        description: expense.description || "",
        category: expense.category || "",
        amount: expense.amount || ""
      });
    }
  }, [expense]);

  if (!visible) return null;

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl min-w-[340px] max-w-sm w-full flex flex-col gap-3">
        <h2 className="text-2xl font-extrabold text-green-700 mb-3">Edit Expense</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-2 border-gray-300 px-4 py-2 rounded-lg font-medium focus:border-green-500 focus:ring-1 focus:ring-green-300"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            maxLength={100}
            required
            disabled={loading}
          />
          
          <select
            className="border-2 border-gray-300 px-4 py-2 rounded-lg font-medium focus:border-green-500 focus:ring-1 focus:ring-green-300"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            required
            disabled={loading}
          >
            <option value="" disabled>
              Select Category
            </option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <input
            type="number"
            className="border-2 border-gray-300 px-4 py-2 rounded-lg font-medium focus:border-green-500 focus:ring-1 focus:ring-green-300"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            placeholder="Amount (₹)"
            min="0"
            step="0.01"
            required
            disabled={loading}
          />
          
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 font-bold px-5 py-2 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;