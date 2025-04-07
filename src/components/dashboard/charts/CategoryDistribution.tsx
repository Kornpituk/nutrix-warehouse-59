
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import ChartCard from '../ChartCard';

const categoryData = [
  { name: 'Dog Food', value: 35 },
  { name: 'Cat Food', value: 30 },
  { name: 'Bird Food', value: 15 },
  { name: 'Fish Food', value: 10 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#AB0006', '#FF6B6B', '#FFD166', '#06D6A0', '#118AB2'];

const CategoryDistribution = () => {
  return (
    <ChartCard title="Category Distribution">
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ChartCard>
  );
};

export default CategoryDistribution;
