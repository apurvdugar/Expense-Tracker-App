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
    if (!insights.match(/^\d+\./m)) {
      return `
        <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <p class="text-blue-900 font-medium">${insights}</p>
        </div>
      `;
    }

    const lines = insights.split('\n').filter(line => line.trim());
    const tips = [];
    let currentTip = null;

    for (const line of lines) {
      const match = line.match(/^(\d+)\.\s*(.+)/);
      if (match) {
        if (currentTip) tips.push(currentTip);
        currentTip = {
          number: match[1],
          content: match[2]
        };
      } else if (currentTip && line.trim()) {
        currentTip.content += ' ' + line.trim();
      }
    }
    if (currentTip) tips.push(currentTip);

    return tips.map(tip => {
      const categoryMatch = tip.content.match(/^\[?([^\]]+)\]?:\s*(.+)/);
      const category = categoryMatch ? categoryMatch[1] : `Tip ${tip.number}`;
      const text = categoryMatch ? categoryMatch[2] : tip.content;

      const formattedText = text
        .replace(/₹(\d+[,\d]*)/g, '<span class="text-green-600 font-semibold">₹$1</span>')
        .replace(/\*\*(.+?)\*\*/g, '<span class="font-semibold text-green-700">$1</span>');

      return `
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-4 last:mb-0 border-l-4 border-green-500">
          <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm">${tip.number}</span>
            <h3 class="text-lg font-bold text-green-700">${category}</h3>
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
    <div className="relative min-h-screen bg-linear-to-tr from-white via-slate-50 to-green-50 overflow-x-hidden pt-24">
      {/* ✅ Added animated blobs */}
      <div className="absolute -top-32 -left-32 w-md h-112 rounded-full pointer-events-none z-0 bg-linear-to-br from-green-100 via-blue-100 to-cyan-100 blur-2xl opacity-25 animate-blob1" />
      <div className="absolute -bottom-40 -right-40 w-88 h-88 rounded-full pointer-events-none z-0 bg-linear-to-br from-fuchsia-100 via-green-100 to-indigo-100 blur-2xl opacity-25 animate-blob2" />

      <div className="container mx-auto max-w-7xl py-10 px-4">
        {/* ✅ Consistent heading */}
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight mb-8">💡 Smart AI Tips & Recommendations</h1>
        <p className="text-gray-600 mb-8 text-lg">Personalized financial advice based on your spending patterns</p>
        
        <div className="max-w-3xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-md p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mb-4"></div>
              <p className="text-green-700 font-medium">Analyzing your financial data...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
              <p className="text-red-700 font-semibold">❌ Failed to load AI insights. Please try again later.</p>
            </div>
          )}
          
          {!loading && !error && insightsHtml && (
            <div className="ai-insights-container" dangerouslySetInnerHTML={{ __html: insightsHtml }} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes blob1 {0%,100%{transform:scale(1);} 33%{transform:scale(1.11) translateY(-10px);} 66%{transform:scale(0.96) translateX(6px);} }
        @keyframes blob2 {0%,100%{transform:scale(1);} 25%{transform:scale(1.05) translateY(-5px);} 55%{transform:scale(0.94) translateX(-13px);} }
        .animate-blob1 { animation: blob1 21s infinite cubic-bezier(.44,1.36,.45,.97);}
        .animate-blob2 { animation: blob2 19s infinite cubic-bezier(.23,.99,.52,.99);}
      `}</style>
    </div>
  );
}
