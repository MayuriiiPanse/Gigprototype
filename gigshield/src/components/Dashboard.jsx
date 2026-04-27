import React from 'react';
import StatCards from './dashboard/StatCards';
import EarningsChart from './earnings/EarningsChart';
import GigScoreCard from './gigscore/GigScoreCard';
import RecentTransactions from './dashboard/RecentTransactions';
import PlatformList from './platforms/PlatformList';

export default function Dashboard({ data }) {
  return (
    <>
      <StatCards data={data} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        <div className="lg:col-span-2">
          <EarningsChart data={data.earningsData} />
        </div>
        <GigScoreCard score={data.gigscore} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlatformList />
        <RecentTransactions />
      </div>
    </>
  );
}
