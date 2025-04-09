
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartCard from '../ChartCard';

const shipmentsData = [
  { name: 'Mon', outbound: 65, inbound: 45 },
  { name: 'Tue', outbound: 59, inbound: 40 },
  { name: 'Wed', outbound: 80, inbound: 55 },
  { name: 'Thu', outbound: 81, inbound: 60 },
  { name: 'Fri', outbound: 56, inbound: 50 },
  { name: 'Sat', outbound: 40, inbound: 30 },
  { name: 'Sun', outbound: 35, inbound: 25 },
];

const InboundOutbound = () => {
  return (
    <ChartCard title="Inbound vs Outbound" className="lg:col-span-2">
      <BarChart data={shipmentsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="inbound" fill="#06D6A0" />
        <Bar dataKey="outbound" fill="#AB0006" />
      </BarChart>
    </ChartCard>
  );
};

export default InboundOutbound;
