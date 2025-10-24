function BudgetProgress({ expenses, budget = 10000 }) {
  const now = new Date();
  const thisMonthExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const total = thisMonthExpenses.reduce((a, b) => a + b.amount, 0);
  const percent = Math.min((total / budget) * 100, 100);

  let color = "bg-green-400";
  if (percent > 75) color = "bg-orange-400";
  if (percent > 90) color = "bg-red-500";

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-10">
      <h2 className="font-bold text-xl text-green-700 mb-4">Monthly Budget Progress</h2>
      <div className="mb-2 flex justify-between font-medium text-gray-700">
        <span>Spent: ₹{total.toLocaleString()}</span>
        <span>Limit: ₹{budget.toLocaleString()}</span>
      </div>
      <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{ width: percent + '%' }}
          className={`h-full rounded-full transition-all duration-500 ${color}`}
        />
      </div>
      <div className="mt-2 text-sm text-gray-500">Used {percent.toFixed(1)}% of your monthly budget.</div>
      {percent >= 100 && <div className="mt-2 text-red-600 font-bold">You have exceeded your monthly limit!</div>}
    </div>
  );
}

export default BudgetProgress;
