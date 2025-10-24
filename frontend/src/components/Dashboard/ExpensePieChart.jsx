import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

// Nice financial chart colors
const COLORS = ["#069e2d", "#0676a1", "#f39237", "#da1e37", "#923cb5", "#025A4B"];

const ExpensePieChart = ({ expenses }) => {
  // Group and sum by category
  const data =
    expenses && expenses.length > 0
      ? Object.entries(
          expenses.reduce((acc, e) => {
            acc[e.category] = (acc[e.category] || 0) + e.amount;
            return acc;
          }, {})
        ).map(([cat, amt]) => ({ name: cat, value: amt }))
      : [];

  if (data.length === 0) {
    return <div className="text-slate-400 text-center py-8">No expenses to display</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={54}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;
