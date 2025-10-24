import { useEffect, useState } from "react";

export default function Tips() {
  const [insightsHtml, setInsightsHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchAIInsights() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Missing token, please login.");

      setLoading(true);
      setError(false);

      const response = await fetch('https://expense-tracker-app-backend-1.onrender.com/api/ai-tips', {
        headers: { 'token': token }
      });

      const data = await response.json();
      if (!response.ok || !data || !data.insights) {
        throw new Error(data.message || "Failed to get insights");
      }
      return data.insights;
    } catch (err) {
      console.error("Error fetching AI insights:", err);
      setError(true);
      return null;
    } finally {
      setLoading(false);
    }
  }

  function formatInsights(insights) {
    // Handle "no expenses" case
    if (!insights.match(/^\d+\./m)) {
      return `
        <div class="bg-blue-50 border-l-4 border-blue-500 rounded p-6">
          <p class="text-blue-900 font-medium">${insights}</p>
        </div>
      `;
    }

    // Split by numbered lines (1., 2., 3., etc.)
    const lines = insights.split('\n').filter(line => line.trim());
    const tips = [];
    let currentTip = null;

    for (const line of lines) {
      const match = line.match(/^(\d+)\.\s*(.+)/);
      if (match) {
        // New tip found
        if (currentTip) tips.push(currentTip);
        currentTip = {
          number: match[1],
          content: match[2]
        };
      } else if (currentTip && line.trim()) {
        // Continuation of current tip
        currentTip.content += ' ' + line.trim();
      }
    }
    if (currentTip) tips.push(currentTip);

    // Format as HTML
    return tips.map(tip => {
      // Extract category if present in format: [Category]: text
      const categoryMatch = tip.content.match(/^\[?([^\]]+)\]?:\s*(.+)/);
      const category = categoryMatch ? categoryMatch[1] : `Tip ${tip.number}`;
      const text = categoryMatch ? categoryMatch[2] : tip.content;

      // Highlight ₹ amounts
      const formattedText = text
        .replace(/₹(\d+[,\d]*)/g, '<span class="text-[#2d6a4f] font-semibold">₹$1</span>')
        .replace(/\*\*(.+?)\*\*/g, '<span class="font-semibold text-[#2d6a4f]">$1</span>');

      return `
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-6 last:mb-0 border-l-4 border-[#40916c]">
          <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-[#40916c] text-white font-bold text-sm">${tip.number}</span>
            <h3 class="text-xl font-bold text-[#40916c]">${category}</h3>
          </div>
          <p class="text-gray-700 leading-relaxed">${formattedText}</p>
        </div>
      `;
    }).join('');
  }

  useEffect(() => {
    (async () => {
      const insights = await fetchAIInsights();
      if (insights) {
        setInsightsHtml(formatInsights(insights));
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-slate-50 pt-24">
      <div className="container mx-auto max-w-3xl bg-white rounded-xl shadow-lg p-8 mt-10">
        <h1 className="text-3xl font-bold text-green-700 mb-2">💡 Smart AI Tips & Recommendations</h1>
        <p className="text-gray-600 mb-8">Personalized financial advice based on your spending</p>
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#40916c] border-t-transparent"></div>
            <p className="mt-4 text-[#40916c] font-medium">Analyzing your financial data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 rounded p-4 my-4">
            <p className="text-red-700 font-semibold">❌ Failed to load AI insights. Try again later.</p>
          </div>
        )}
        
        {!loading && !error && insightsHtml && (
          <div className="ai-insights-container" dangerouslySetInnerHTML={{ __html: insightsHtml }} />
        )}
      </div>
    </div>
  );
}
