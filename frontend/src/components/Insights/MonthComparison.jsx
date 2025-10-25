function MonthComparison({ expenses }) {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  let thisMonthTotal = 0, lastMonthTotal = 0;
  expenses.forEach(e => {
    const d = new Date(e.createdAt);
    if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
      thisMonthTotal += e.amount;
    } else if (d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear) {
      lastMonthTotal += e.amount;
    }
  });

  let diff = thisMonthTotal - lastMonthTotal;
  let percentChange = lastMonthTotal === 0 ? 0 : (diff / lastMonthTotal) * 100;
  let up = diff > 0;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-10">
      <h2 className="font-bold text-xl text-green-700 mb-2">Month-over-Month Spending</h2>
      <div className="flex flex-col gap-2 font-semibold text-gray-700">
        <span>
          <span className="text-green-700">This Month:</span> ₹{thisMonthTotal.toLocaleString()}
        </span>
        <span>
          <span className="text-gray-500">Last Month:</span> ₹{lastMonthTotal.toLocaleString()}
        </span>
        {lastMonthTotal > 0 && (
          <span className={up ? "text-red-600" : "text-green-600"}>
            {up ? "▲" : "▼"} {Math.abs(percentChange).toFixed(1)}% {up ? "increase" : "decrease"}
          </span>
        )}
        {lastMonthTotal === 0 && (
          <span className="text-gray-400">No data for last month</span>
        )}
      </div>
    </div>
  );
}

export default MonthComparison;
