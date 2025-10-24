const DeleteExpenseModal = ({ visible, expense, onClose, onConfirm }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow max-w-sm w-full">
        <h2 className="text-lg font-bold text-red-700 mb-2">Delete Expense</h2>
        <p className="mb-4">
          Do you really want to delete <span className="font-bold">{expense?.description}</span> ({expense?.category}) for <span className="font-bold text-green-700">₹{expense?.amount}</span>?
          <br />
          <span className="text-slate-500">This action cannot be undone.</span>
        </p>
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >Cancel</button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold"
          >Delete</button>
        </div>
      </div>
    </div>
  );
};
export default DeleteExpenseModal;