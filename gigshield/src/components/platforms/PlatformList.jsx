import React from 'react';

const platforms = [
  { name: 'Zomato', earnings: '₹12,400', orders: 284, rating: 4.8, color: '#ef4444', icon: '🍕' },
  { name: 'Swiggy', earnings: '₹8,200', orders: 221, rating: 4.7, color: '#f97316', icon: '🛵' },
  { name: 'Ola', earnings: '₹3,000', orders: 114, rating: 4.6, color: '#f5a623', icon: '🚗' },
];

export default function PlatformList() {
  return (
    <div className="bg-[#161d26] rounded-2xl p-6 border border-white/5">
      <h3 className="font-semibold syne mb-5">Platform Breakdown</h3>
      <div className="space-y-4">
        {platforms.map((p) => (
          <div key={p.name} className="flex items-center gap-4">
            <div className="text-2xl">{p.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{p.name}</span>
                <span className="text-sm mono" style={{ color: p.color }}>{p.earnings}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(parseInt(p.earnings.replace(/[^\d]/g, '')) / 23600) * 100}%`,
                    background: p.color
                  }}
                />
              </div>
              <div className="flex gap-4 mt-1">
                <span className="text-xs text-gray-500">{p.orders} orders</span>
                <span className="text-xs text-gray-500">⭐ {p.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
