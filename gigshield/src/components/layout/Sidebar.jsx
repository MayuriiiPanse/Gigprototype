import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'gigscore', label: 'GigScore', icon: '⭐' },
  { id: 'certificate', label: 'Certificate', icon: '📄' },
  { id: 'fund', label: 'Emergency Fund', icon: '🆘' },
  { id: 'advisor', label: 'AI Advisor', icon: '🤖' },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-[#161d26] flex flex-col p-6 gap-2 shrink-0">
      <div className="mb-8">
        <h2 className="text-xl font-bold syne text-[#f5a623]">GigShield</h2>
        <p className="text-xs text-gray-500 mt-1">Financial Identity OS</p>
      </div>

      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
            ${activeTab === item.id
              ? 'bg-[#f5a623]/10 text-[#f5a623] border border-[#f5a623]/20'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
        >
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f5a623] flex items-center justify-center text-black font-bold text-sm">R</div>
          <div>
            <p className="text-sm font-medium">Ravi Kumar</p>
            <p className="text-xs text-gray-500">GS-IN-7742-MH</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
