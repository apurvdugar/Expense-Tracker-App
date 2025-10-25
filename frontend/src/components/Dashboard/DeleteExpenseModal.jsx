const DeleteExpenseModal = ({ visible, expense, onClose, onConfirm, loading }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
        <h2 className="text-xl font-extrabold text-red-700 mb-3">Delete Expense</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete <span className="font-bold">{expense?.description}</span> 
          <span className="text-gray-500"> ({expense?.category})</span> for{" "}
          <span className="font-bold text-green-700">₹{expense?.amount}</span>?
          <br />
          <span className="text-red-600 text-sm font-medium mt-2 block">
            ⚠️ This action cannot be undone.
          </span>
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-semibold transition disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition disabled:opacity-50 flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpenseModal;