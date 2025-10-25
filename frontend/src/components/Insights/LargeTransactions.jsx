function LargeTransactions({ expenses, count = 3 }) {
  const now = new Date();
  const thisMonthExpenses = expenses.filter(e => {
    const d = new Date(e.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  // Sort by amount, descending, pick top N
  const largest = [...thisMonthExpenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, count);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-10">
      <h2 className="font-bold text-xl text-green-700 mb-4">Largest Transactions This Month</h2>
      {largest.length === 0 ? (
        <div className="text-gray-400 py-6">No large transactions yet.</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-gray-500 font-medium pb-2">Date</th>
              <th className="text-left text-gray-500 font-medium pb-2">Description</th>
              <th className="text-left text-gray-500 font-medium pb-2">Category</th>
              <th className="text-right text-gray-500 font-medium pb-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {largest.map((e, i) => (
              <tr key={e.id || i} className="border-t">
                <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                <td>{e.description || '—'}</td>
                <td>{e.category}</td>
                <td className="text-right font-bold text-green-700">₹{e.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LargeTransactions;
