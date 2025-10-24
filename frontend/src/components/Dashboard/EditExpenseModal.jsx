import { useState, useEffect } from "react";

const EditExpenseModal = ({ visible, expense, onClose, onSave }) => {
  const [form, setForm] = useState(
    expense || { description: "", category: "", amount: "", date: new Date().toISOString() }
  );
  // Keep form in sync with selected expense
  useEffect(() => {
    if (expense) setForm(expense);
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
            className="border-2 px-4 py-2 rounded-lg"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Expense Name"
            required
          />
          <input
            type="text"
            className="border-2 px-4 py-2 rounded-lg"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            placeholder="Category"
            required
          />
          <input
            type="number"
            className="border-2 px-4 py-2 rounded-lg"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            placeholder="Amount"
            min="0"
            required
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="bg-gray-100 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded font-bold">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;