
import React from 'react';
import { motion } from 'framer-motion';
import WarehouseMovementChart from '../movement/WarehouseMovementChart';
import InventoryMovementTable from '../movement/InventoryMovementTable';
import MovementSummaryCards from '../movement/MovementSummaryCards';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
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
      <WarehouseMovementChart data={warehouseMovementData} />
      <InventoryMovementTable movements={inventoryMovementData} />
      <MovementSummaryCards />
    </motion.div>
  );
};

export default MovementTab;
