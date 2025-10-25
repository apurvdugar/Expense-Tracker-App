function ExportInsightsCSV({ expenses }) {
  function exportCSV() {
    // Aggregate for CSV summary
    const now = new Date();
    const thisMonthExpenses = expenses.filter(e => {
      const d = new Date(e.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const monthlyTotal = thisMonthExpenses.reduce((a, b) => a + b.amount, 0);

    const totals = expenses.reduce((acc, e) => {
      const cat = e.category || "Other";
      acc[cat] = (acc[cat] || 0) + e.amount;
      return acc;
    }, {});
    const sortedCategories = Object.entries(totals)
      .sort((a, b) => b[1] - a[1]);

    let csv = `Expense Insights\n\nMonthly Total,${monthlyTotal}\n\nTop Categories\nCategory,Amount\n`;
    csv += sortedCategories.map(([cat, amt]) => `${cat},${amt}`).join("\n");
    csv += "\n\nLargest Transactions\nDate,Description,Category,Amount\n";
    const largest = [...thisMonthExpenses].sort((a, b) => b.amount - a.amount).slice(0, 5);
    csv += largest.map(e =>
      `[${new Date(e.createdAt).toLocaleDateString()}],${e.description},${e.category},${e.amount}`
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expense_insights.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 flex justify-end">
      <button
        className="bg-green-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-green-700 transition shadow"
        onClick={exportCSV}
      >
        Export Insights as CSV
      </button>
    </div>
  );
}

export default ExportInsightsCSV;
