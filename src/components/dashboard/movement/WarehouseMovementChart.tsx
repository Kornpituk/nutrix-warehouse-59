
import React from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartCard from '../ChartCard';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface WarehouseMovementItem {
  x: number;
  y: number;
  z: number;
  name: string;
}

interface WarehouseMovementChartProps {
  data: WarehouseMovementItem[];
}

const WarehouseMovementChart = ({ data }: WarehouseMovementChartProps) => {
  return (
    <motion.div variants={itemVariants}>
      <ChartCard title="Warehouse Item Movement">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Warehouse X-Coordinate" unit="m" />
          <YAxis type="number" dataKey="y" name="Warehouse Y-Coordinate" unit="m" />
          <ZAxis type="number" dataKey="z" range={[100, 500]} name="Volume" unit="units" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name, props) => {
            if (name === 'Warehouse X-Coordinate' || name === 'Warehouse Y-Coordinate') {
              return [`${value} m`, name];
            }
            if (name === 'Volume') {
              return [`${value} units`, name];
            }
            return [value, name];
          }} />
          <Legend />
          <Scatter name="Products" data={data} fill="#AB0006" />
        </ScatterChart>
      </ChartCard>
    </motion.div>
  );
};

export default WarehouseMovementChart;
