import React from 'react';

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold syne">{title}</h2>
      {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
