import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function EarningsChart({ data }) {
  return (
    <div className="bg-[#161d26] rounded-2xl p-6 border border-white/5 h-full">
      <h3 className="font-semibold syne mb-5">Earnings (Last 6 Months)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="zomato" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="swiggy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ola" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f5a623" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f5a623" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
          <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{ background: '#161d26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
            formatter={(value) => [`₹${value.toLocaleString()}`, '']}
          />
          <Legend />
          <Area type="monotone" dataKey="zomato" stroke="#ef4444" fill="url(#zomato)" strokeWidth={2} name="Zomato" />
          <Area type="monotone" dataKey="swiggy" stroke="#f97316" fill="url(#swiggy)" strokeWidth={2} name="Swiggy" />
          <Area type="monotone" dataKey="ola" stroke="#f5a623" fill="url(#ola)" strokeWidth={2} name="Ola" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
