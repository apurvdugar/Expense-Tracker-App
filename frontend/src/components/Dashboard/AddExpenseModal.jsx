import { useState } from "react";

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

const AddExpenseModal = ({ visible, onClose, onAddExpense }) => {
  const [form, setForm] = useState({ amount: "", category: "", description: "" });

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category) return;
    
    onAddExpense({
      amount: parseFloat(form.amount),
      category: form.category,
      description: form.description
    });
    
    setForm({ amount: "", category: "", description: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl min-w-[340px] max-w-sm w-full flex flex-col gap-3">
        <h2 className="text-2xl font-extrabold text-green-700">Add New Expense</h2>
        <form className="flex flex-col gap-4 mt-1" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount (₹)"
            className="border-2 border-gray-300 px-4 py-2 rounded-lg font-medium focus:border-green-500 focus:ring-1 focus:ring-green-300 text-lg"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            min="0"
            step="0.01"
            required
          />
          <select
            className="border-2 border-gray-300 px-4 py-2 rounded-lg text-lg font-medium focus:border-green-500 focus:ring-1 focus:ring-green-300"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="" disabled>
              Category
            </option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description"
            className="border-2 border-gray-300 px-4 py-2 rounded-lg font-medium focus:border-green-500 focus:ring-1 focus:ring-green-300"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            maxLength={100}
            required
          />

          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 font-bold px-5 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
