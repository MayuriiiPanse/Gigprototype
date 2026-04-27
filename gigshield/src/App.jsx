import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/Dashboard';
import GigScore from './components/GigScore';
import Certificate from './components/Certificate';
import Fund from './components/Fund';
import AIAdvisor from './components/AIAdvisor';
import { loadDemoData } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(loadDemoData());
  }, []);

  if (!data) return (
    <div className="h-screen flex items-center justify-center bg-[#07090d] text-white">
      Loading GigShield...
    </div>
  );

  return (
    <div className="flex h-screen bg-[#07090d] overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold syne mb-2">GigShield Dashboard</h1>
          <p className="text-gray-400 mb-8">Ravi Kumar • Indore, Madhya Pradesh</p>

          {activeTab === 'dashboard' && <Dashboard data={data} />}
          {activeTab === 'gigscore' && <GigScore data={data} />}
          {activeTab === 'certificate' && <Certificate data={data} />}
          {activeTab === 'fund' && <Fund data={data} />}
          {activeTab === 'advisor' && <AIAdvisor data={data} />}
        </div>
      </main>
    </div>
  );
}
