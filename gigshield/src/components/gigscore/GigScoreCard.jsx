import React from 'react';

export default function GigScoreCard({ score }) {
  const percentage = ((score - 300) / (850 - 300)) * 100;
  const color = score >= 700 ? '#3ecf8e' : score >= 550 ? '#f5a623' : '#ef4444';
  const label = score >= 700 ? 'Excellent' : score >= 550 ? 'Good' : 'Needs Work';

  return (
    <div className="bg-[#161d26] rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center">
      <h3 className="font-semibold syne mb-4 self-start">GigScore</h3>

      <div className="relative w-36 h-36">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={`${percentage * 2.51} 251`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold mono" style={{ color }}>{score}</span>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
      </div>

      <div className="mt-4 w-full space-y-2 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Range</span>
          <span className="mono">300 – 850</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Percentile</span>
          <span className="mono text-[#3ecf8e]">Top 18%</span>
        </div>
      </div>
    </div>
  );
}
