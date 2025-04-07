
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartCard from '../ChartCard';

const warehouseSpaceData = [
  { name: 'Zone A', used: 85, available: 15 },
  { name: 'Zone B', used: 65, available: 35 },
  { name: 'Zone C', used: 90, available: 10 },
  { name: 'Zone D', used: 45, available: 55 },
];

const WarehouseSpace = () => {
  return (
    <ChartCard title="Warehouse Space Utilization">
      <BarChart data={warehouseSpaceData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" />
        <Tooltip formatter={(value) => [`${value}%`, 'Space']} />
        <Legend />
        <Bar dataKey="used" stackId="a" fill="#AB0006" name="Used Space (%)" />
        <Bar dataKey="available" stackId="a" fill="#06D6A0" name="Available Space (%)" />
      </BarChart>
    </ChartCard>
  );
};

export default WarehouseSpace;
