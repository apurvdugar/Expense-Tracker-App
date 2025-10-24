import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Choose colors for categories
const COLORS = [
  "#22c55e", "#0284c7", "#f59e42", "#ef4444", "#a855f7", "#14b8a6", "#fbbf24", "#64748b"
];

function categoryPieChart({ expenses }) {
  // Aggregate expenses by category
  const data = expenses.reduce((acc, e) => {
    const cat = e.category || "Other";
    acc[cat] = (acc[cat] || 0) + e.amount;
    return acc;
  }, {});
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  // Nothing to show
  if (!chartData.length) return <div className="text-gray-400 py-6">No expense data yet.</div>;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default categoryPieChart;
