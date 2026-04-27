import React, { useState } from 'react';
import GigScoreCard from './gigscore/GigScoreCard';
import { callGemini } from '../utils/gemini';

export default function GigScore({ data }) {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const explainScore = async () => {
    setLoading(true);
    const prompt = `Explain GigScore 742 for gig worker Ravi Kumar in simple Hindi + English. Factors: high delivery rating, 12 inactive days, 26/30 active days.`;
    const text = await callGemini(prompt);
    setExplanation(text);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <GigScoreCard score={data.gigscore} />

      <div className="bg-[#161d26] p-6 rounded-2xl border border-white/5">
        <h3 className="font-semibold syne mb-4">AI Score Explainer</h3>
        <p className="text-sm text-gray-400 mb-5">
          Get a simple explanation of your GigScore in Hindi + English — understand what's helping and what's holding you back.
        </p>
        <button
          onClick={explainScore}
          disabled={loading}
          className="bg-[#f5a623] hover:bg-amber-500 disabled:opacity-50 text-black font-bold py-3 px-8 rounded-xl transition-all"
        >
          {loading ? "AI is thinking..." : "Ask AI: Explain My GigScore"}
        </button>

        {explanation && (
          <div className="mt-6 p-5 bg-black/50 rounded-xl text-sm leading-relaxed whitespace-pre-wrap">
            {explanation}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Consistency', value: '87%', note: 'Active 26/30 days', color: '#3ecf8e' },
          { label: 'Rating Score', value: '4.8★', note: 'Zomato avg', color: '#f5a623' },
          { label: 'Inactive Days', value: '12', note: 'Last 90 days', color: '#ef4444' },
        ].map(item => (
          <div key={item.label} className="bg-[#161d26] p-5 rounded-2xl border border-white/5">
            <div className="text-2xl font-bold mono" style={{ color: item.color }}>{item.value}</div>
            <div className="font-medium mt-1">{item.label}</div>
            <div className="text-xs text-gray-500 mt-1">{item.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
