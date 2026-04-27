import React, { useState } from 'react';
import { callGemini } from '../utils/gemini';

export default function Fund() {
  const [claimAmount, setClaimAmount] = useState('');
  const [reason, setReason] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const checkClaim = async () => {
    if (!claimAmount || !reason) return;
    setLoading(true);
    const prompt = `Evaluate emergency fund claim for gig worker: Amount ₹${claimAmount}, Reason: ${reason}. Is it legitimate? Reply with JSON: { "status": "legit/suspicious", "reason": "short explanation" }`;
    const text = await callGemini(prompt);
    setResult(text);
    setLoading(false);
  };

  let parsedResult = null;
  try {
    const clean = result.replace(/```json|```/g, '').trim();
    parsedResult = JSON.parse(clean);
  } catch (_) {}

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Fund Balance', value: '₹1,24,800', color: '#3ecf8e' },
          { label: 'Claims This Month', value: '23', color: '#f5a623' },
          { label: 'Avg Payout', value: '₹5,200', color: '#60a5fa' },
        ].map(item => (
          <div key={item.label} className="bg-[#161d26] p-4 rounded-2xl border border-white/5 text-center">
            <div className="text-xl font-bold mono" style={{ color: item.color }}>{item.value}</div>
            <div className="text-xs text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#161d26] p-8 rounded-3xl border border-white/5">
        <h2 className="text-2xl font-bold syne mb-2">Community Emergency Fund</h2>
        <p className="text-sm text-gray-400 mb-6">Submit a claim — AI will review it for legitimacy before processing.</p>

        <input
          type="number"
          placeholder="Claim Amount (₹)"
          value={claimAmount}
          onChange={(e) => setClaimAmount(e.target.value)}
          className="w-full p-4 bg-black rounded-2xl mb-4 text-white placeholder-gray-600 border border-white/5 focus:outline-none focus:border-white/20"
        />
        <textarea
          placeholder="Reason for claim (e.g., medical emergency, bike repair, accident)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-4 bg-black rounded-2xl h-32 mb-6 text-white placeholder-gray-600 border border-white/5 focus:outline-none focus:border-white/20 resize-none"
        />

        <button
          onClick={checkClaim}
          disabled={loading || !claimAmount || !reason}
          className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-40 py-4 rounded-2xl font-bold transition-all"
        >
          {loading ? "AI is reviewing your claim..." : "Submit Claim for AI Review"}
        </button>

        {result && (
          <div className="mt-6 p-5 bg-black rounded-2xl">
            {parsedResult ? (
              <div className="space-y-3">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm ${
                  parsedResult.status === 'legit'
                    ? 'bg-[#3ecf8e]/20 text-[#3ecf8e]'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {parsedResult.status === 'legit' ? '✅ Claim Approved' : '⚠️ Claim Flagged'}
                </div>
                <p className="text-sm text-gray-300">{parsedResult.reason}</p>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">{result}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
