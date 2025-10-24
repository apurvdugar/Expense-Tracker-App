import { useEffect, useState } from "react";

function formatInsights(insights) {
  // Split insights into sections based on numbered headings (1., 2., etc.)
  const sections = insights.split(/(?=\d+\.\s+[A-Za-z\s]+:)/).filter(section => section.trim());

  return sections.map(section => {
    const titleMatch = section.match(/^\d+\.\s+([^:]+):/);
    if (!titleMatch) return null;

    const title = titleMatch[1].trim();
    const content = section.slice(titleMatch[0].length).trim();

    // Bullet points
    const bulletPoints = content.split("\n")
      .map(line => line.trim())
      .filter(line => line.startsWith("-"))
      .map(point => {
        let cleanPoint = point.slice(1).trim();
        cleanPoint = cleanPoint.replace(/₹(\d+)/g, '<span class="text-[#2d6a4f] font-semibold">₹$1</span>');
        cleanPoint = cleanPoint.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-[#2d6a4f]">$1</span>');
        return `<li class="mb-4 last:mb-0 pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-[#40916c] before:top-0">${cleanPoint}</li>`;
      })
      .join('');

    return `
      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-6 last:mb-0">
        <div class="flex items-center gap-3 mb-4">
          <h3 class="text-xl font-bold text-[#40916c]">${title}</h3>
        </div>
        <ul class="space-y-2 text-gray-700 list-none">
          ${bulletPoints}
        </ul>
      </div>
    `;
  }).join('');
}

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
      if (!response.ok || !data || !data.insights) throw new Error(data.message || "Failed to get insights");
      return data.insights;
    } catch (err) {
      setError(true);
      return null;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      const insights = await fetchAIInsights();
      if (insights) setInsightsHtml(formatInsights(insights));
    })();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-tr from-green-50 via-blue-50 to-slate-50 pt-24">
      <div className="container mx-auto max-w-xl bg-white rounded-xl shadow-lg p-8 mt-10">
        <h1 className="text-3xl font-bold text-green-700 mb-8">Smart AI Tips & Recommendations</h1>
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#40916c] border-t-transparent"></div>
            <p className="mt-4 text-[#40916c] font-medium">Analyzing your financial data...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 rounded p-4 my-4">
            <p className="text-red-700 font-semibold">Failed to load AI insights. Try again later.</p>
          </div>
        )}
        {!loading && !error && (
          <div className="ai-insights-container" dangerouslySetInnerHTML={{ __html: insightsHtml }} />
        )}
      </div>
    </div>
  );
}
