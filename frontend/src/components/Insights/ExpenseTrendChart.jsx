import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Utility to group expenses by day (or week)
function getDailyData(expenses) {
  // Map of date (YYYY-MM-DD) => total
  const dailyMap = {};
  expenses.forEach(e => {
    const d = new Date(e.createdAt);
    const key = d.toISOString().split('T')[0]; // Format YYYY-MM-DD
    dailyMap[key] = (dailyMap[key] || 0) + e.amount;
  });
  // Convert to array and sort by date
  return Object.entries(dailyMap)
    .map(([date, value]) => ({ date, value }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function ExpenseTrendChart({ expenses }) {
  const data = getDailyData(expenses);

  if (!data.length) return <div className="text-gray-400 py-6">No daily expenses yet.</div>;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid stroke="#e5e7eb" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#22c55e"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ExpenseTrendChart;
