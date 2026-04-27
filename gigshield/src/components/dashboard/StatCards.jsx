import React from 'react';

export default function StatCards({ data }) {
  const { stats } = data;
  const cards = [
    { label: 'This Month', value: stats.earnings, icon: '💰', color: 'text-[#3ecf8e]' },
    { label: 'Total Orders', value: stats.orders, icon: '📦', color: 'text-[#f5a623]' },
    { label: 'Active Days', value: stats.days, icon: '📅', color: 'text-blue-400' },
    { label: 'Day Streak', value: `${stats.streak} days`, icon: '🔥', color: 'text-orange-400' },
    { label: 'On-Time Rate', value: stats.onTime, icon: '✅', color: 'text-[#3ecf8e]' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-[#161d26] rounded-2xl p-5 border border-white/5">
          <div className="text-2xl mb-2">{card.icon}</div>
          <div className={`text-2xl font-bold mono ${card.color}`}>{card.value}</div>
          <div className="text-xs text-gray-500 mt-1">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
