
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, MoveHorizontal, BarChart2, TrendingUp, Truck } from 'lucide-react';
import DashboardSummaryCard from '../DashboardSummaryCard';
import ChartCard from '../ChartCard';

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

const warehouseMovementData = [
  { x: 10, y: 30, z: 200, name: 'Dog Food Pallet A' },
  { x: 40, y: 50, z: 150, name: 'Cat Food Pallet B' },
  { x: 70, y: 20, z: 300, name: 'Bird Food Box C' },
  { x: 30, y: 80, z: 100, name: 'Fish Food Package D' },
  { x: 50, y: 50, z: 250, name: 'Premium Pet Food E' },
  { x: 80, y: 10, z: 180, name: 'Special Diet Mix F' },
];

const inventoryMovementData = [
  { id: 1, product: 'Premium Dog Food', from: 'Receiving', to: 'Zone A', quantity: 120, time: '10:30 AM', status: 'Completed' },
  { id: 2, product: 'Cat Treats', from: 'Zone B', to: 'Packing', quantity: 75, time: '11:45 AM', status: 'In Progress' },
  { id: 3, product: 'Bird Seed Mix', from: 'Zone C', to: 'Zone D', quantity: 50, time: '01:15 PM', status: 'Pending' },
  { id: 4, product: 'Fish Food Flakes', from: 'Receiving', to: 'Zone B', quantity: 30, time: '02:30 PM', status: 'Scheduled' },
  { id: 5, product: 'Small Animal Bedding', from: 'Zone A', to: 'Shipping', quantity: 45, time: '03:45 PM', status: 'Completed' },
];

const MovementTab = () => {
  return (
    <motion.div variants={containerVariants} className="grid gap-6">
      <motion.div variants={itemVariants}>
        <ChartCard title="Warehouse Item Movement">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
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
            <Scatter name="Products" data={warehouseMovementData} fill="#AB0006" />
          </ScatterChart>
        </ChartCard>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Inventory Movements</CardTitle>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">Live Updates</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryMovementData.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="font-medium">{movement.product}</TableCell>
                      <TableCell>{movement.from}</TableCell>
                      <TableCell>{movement.to}</TableCell>
                      <TableCell className="text-right">{movement.quantity}</TableCell>
                      <TableCell>{movement.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          movement.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          movement.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          movement.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {movement.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardSummaryCard
          title="Today's Movements"
          value={187}
          icon={<MoveHorizontal size={20} />}
          iconBgColor="bg-primary-50"
          iconColor="text-primary"
        />
        <DashboardSummaryCard
          title="Avg. Processing Time"
          value="14.3 min"
          icon={<BarChart2 size={20} />}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        <DashboardSummaryCard
          title="Efficiency Rate"
          value="94.7%"
          icon={<TrendingUp size={20} />}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <DashboardSummaryCard
          title="Active Transporters"
          value={12}
          icon={<Truck size={20} />}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
      </motion.div>
    </motion.div>
  );
};

export default MovementTab;
