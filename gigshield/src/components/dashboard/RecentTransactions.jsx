import React from 'react';

const transactions = [
  { platform: 'Zomato', amount: '+₹420', time: 'Today, 2:30 PM', status: 'credit' },
  { platform: 'Swiggy', amount: '+₹380', time: 'Today, 11:15 AM', status: 'credit' },
  { platform: 'Ola', amount: '+₹290', time: 'Yesterday, 6:45 PM', status: 'credit' },
  { platform: 'Zomato', amount: '+₹510', time: 'Yesterday, 1:20 PM', status: 'credit' },
  { platform: 'Swiggy', amount: '+₹340', time: '25 Mar, 9:10 AM', status: 'credit' },
];

const platformColors = {
  Zomato: 'bg-red-500/20 text-red-400',
  Swiggy: 'bg-orange-500/20 text-orange-400',
  Ola: 'bg-yellow-500/20 text-yellow-400',
};

export default function RecentTransactions() {
  return (
    <div className="bg-[#161d26] rounded-2xl p-6 border border-white/5">
      <h3 className="font-semibold syne mb-5">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map((tx, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-lg font-medium ${platformColors[tx.platform]}`}>
                {tx.platform}
              </span>
              <span className="text-xs text-gray-500">{tx.time}</span>
            </div>
            <span className="text-[#3ecf8e] font-mono font-medium">{tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
