
import React from 'react';
import { motion } from 'framer-motion';
import ChartCard from '../ChartCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const InventoryTab = () => {
  return (
    <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-2">
      <motion.div variants={itemVariants} className="lg:col-span-2">
        <ChartCard title="Inventory by Category">
          <BarChart data={[
            { name: 'Dog Food', value: 2350 },
            { name: 'Cat Food', value: 1987 },
            { name: 'Bird Food', value: 876 },
            { name: 'Fish Food', value: 432 },
            { name: 'Small Animal', value: 198 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#AB0006" />
          </BarChart>
        </ChartCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Premium Dog Kibble', value: 432, growth: 5.2 },
                { name: 'Organic Cat Formula', value: 387, growth: 3.8 },
                { name: 'Senior Pet Mix', value: 298, growth: -1.2 },
                { name: 'Puppy Starter Pack', value: 254, growth: 7.5 },
                { name: 'Grain-Free Diet', value: 213, growth: 2.3 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 h-2 w-2 rounded-full bg-primary"></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">{item.value} units</span>
                    <span className={`flex items-center text-xs ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.growth >= 0 ? (
                        <TrendingUp size={12} className="mr-1" />
                      ) : (
                        <TrendingDown size={12} className="mr-1" />
                      )}
                      {Math.abs(item.growth)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ChartCard title="Inventory Turnover">
          <AreaChart data={[
            { name: 'Week 1', turnover: 2.1 },
            { name: 'Week 2', turnover: 2.3 },
            { name: 'Week 3', turnover: 2.2 },
            { name: 'Week 4', turnover: 2.5 },
            { name: 'Week 5', turnover: 2.4 },
            { name: 'Week 6', turnover: 2.7 },
            { name: 'Week 7', turnover: 2.9 },
            { name: 'Week 8', turnover: 3.0 },
          ]}>
            <defs>
              <linearGradient id="colorTurnover" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06D6A0" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#06D6A0" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="turnover" stroke="#06D6A0" fillOpacity={1} fill="url(#colorTurnover)" />
          </AreaChart>
        </ChartCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ChartCard title="Staff Productivity">
          <LineChart
            data={[
              { name: 'Week 1', picking: 42, packing: 28, shipping: 18 },
              { name: 'Week 2', picking: 38, packing: 30, shipping: 20 },
              { name: 'Week 3', picking: 45, packing: 32, shipping: 25 },
              { name: 'Week 4', picking: 50, packing: 35, shipping: 30 },
            ]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="picking" stroke="#AB0006" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="packing" stroke="#FFD166" />
            <Line type="monotone" dataKey="shipping" stroke="#06D6A0" />
          </LineChart>
        </ChartCard>
      </motion.div>
    </motion.div>
  );
};

export default InventoryTab;
