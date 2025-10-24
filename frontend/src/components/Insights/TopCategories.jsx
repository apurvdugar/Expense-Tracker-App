function TopCategories({ expenses }) {
  // Aggregate
  const totals = expenses.reduce((acc, e) => {
    const cat = e.category || "Other";
    acc[cat] = (acc[cat] || 0) + e.amount;
    return acc;
  }, {});
  
  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-10">
      <h2 className="font-bold text-xl text-green-700 mb-4">Top 3 Spending Categories</h2>
      {sorted.length === 0 ? (
        <div className="text-gray-400 py-6">No data yet.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {sorted.map(([cat, amt], i) => (
            <div key={cat} className="flex items-center justify-between py-2 px-4 rounded bg-green-50">
              <span className="font-bold text-green-800">
                {i + 1}. {cat}
              </span>
              <span className="font-semibold text-lg text-green-700">₹{amt.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopCategories;
