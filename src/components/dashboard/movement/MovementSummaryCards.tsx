
import React from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal, BarChart2, TrendingUp, Truck } from 'lucide-react';
import DashboardSummaryCard from '../DashboardSummaryCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const MovementSummaryCards = () => {
  return (
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
  );
};

export default MovementSummaryCards;
