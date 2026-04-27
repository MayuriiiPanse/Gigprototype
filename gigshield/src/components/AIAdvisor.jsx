import React, { useState } from 'react';
import { callGemini } from '../utils/gemini';

const SUGGESTIONS = [
  "How can I improve my GigScore?",
  "Best way to save taxes as a gig worker?",
  "Should I take a personal loan with GigScore 742?",
  "How to apply for a rental using my certificate?",
];

export default function AIAdvisor({ data }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async (q) => {
    const question = q || query;
    if (!question.trim()) return;
    setLoading(true);
    setQuery('');

    setMessages(prev => [...prev, { role: 'user', text: question }]);

    const prompt = `You are a helpful financial advisor for gig workers in India. Worker: Ravi Kumar, GigScore ${data.gigscore}, monthly ~₹23,600, platforms: Zomato, Swiggy, Ola. Answer concisely and helpfully. Question: ${question}`;
    const text = await callGemini(prompt);

    setMessages(prev => [...prev, { role: 'ai', text }]);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#161d26] rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-bold syne">AI Financial Advisor</h2>
          <p className="text-sm text-gray-400 mt-1">Powered by Gemini • Personalized for Ravi Kumar</p>
        </div>

        <div className="p-6 min-h-[300px] space-y-4 max-h-[400px] overflow-y-auto">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Try asking:</p>
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => askAI(s)}
                  className="block w-full text-left text-sm p-3 bg-black/40 hover:bg-black/70 rounded-xl text-gray-300 transition-all border border-white/5"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#f5a623]/20 text-white rounded-br-sm'
                  : 'bg-black/50 text-gray-200 rounded-bl-sm'
              }`}>
                {m.role === 'ai' && <span className="text-xs text-[#3ecf8e] font-medium block mb-1">AI Advisor</span>}
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-black/50 p-4 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#f5a623] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#f5a623] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#f5a623] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/5">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askAI()}
              placeholder="Ask anything about your finances..."
              className="flex-1 p-4 bg-black rounded-2xl text-white placeholder-gray-600 border border-white/5 focus:outline-none focus:border-white/20"
            />
            <button
              onClick={() => askAI()}
              disabled={loading || !query.trim()}
              className="px-8 bg-[#f5a623] hover:bg-amber-500 disabled:opacity-40 text-black font-bold rounded-2xl transition-all"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
