
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartCard from '../ChartCard';

const inventoryData = [
  { name: 'Jan', value: 3500 },
  { name: 'Feb', value: 4200 },
  { name: 'Mar', value: 3800 },
  { name: 'Apr', value: 4000 },
  { name: 'May', value: 4500 },
  { name: 'Jun', value: 4800 },
  { name: 'Jul', value: 5200 },
];

const InventoryTrends = () => {
  return (
    <ChartCard title="Inventory Trends">
      <AreaChart data={inventoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#AB0006" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#AB0006" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#AB0006" fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
    </ChartCard>
  );
};

export default InventoryTrends;
