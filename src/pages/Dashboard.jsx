// src/pages/Dashboard.jsx
import React from 'react';
import { Users, CreditCard, Banknote, PieChart, BarChart2 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Customers" value="1,245" icon={<Users size={28} />} gradient="from-indigo-500 to-purple-600" />
        <Card title="Accounts" value="3,872" icon={<CreditCard size={28} />} gradient="from-green-500 to-teal-600" />
        <Card title="Transactions" value="12,789" icon={<Banknote size={28} />} gradient="from-yellow-500 to-orange-500" />
        <Card title="Revenue" value="$58,430" icon={<PieChart size={28} />} gradient="from-pink-500 to-red-500" />
      </div>
    </div>
  );
}

function Card({ title, value, icon, gradient }) {
  return (
    <div className="relative bg-white rounded-xl shadow p-5 overflow-hidden">
      <div className={`absolute -top-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-30`} />
      <div className="relative flex items-center space-x-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white`}>{icon}</div>
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
