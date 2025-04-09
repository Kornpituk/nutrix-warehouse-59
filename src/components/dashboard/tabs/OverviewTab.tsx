
import React from 'react';
import { motion } from 'framer-motion';
import { Package, AlertCircle, TrendingDown, TrendingUp } from 'lucide-react';
import DashboardSummaryCard from '../DashboardSummaryCard';
import InventoryTrends from '../charts/InventoryTrends';
import CategoryDistribution from '../charts/CategoryDistribution';
import WarehouseSpace from '../charts/WarehouseSpace';
import AlertsCard from '../AlertsCard';

interface OverviewTabProps {
  productSummary: { categorys: number; products: number };
  productExpireSummary: { categorys: number; products: number };
  stockMaxMinSummary: {
    stockMax: { categorys: number; products: number };
    stockMin: { categorys: number; products: number };
  };
}

const OverviewTab = ({ productSummary, productExpireSummary, stockMaxMinSummary }: OverviewTabProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <motion.div variants={containerVariants} className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardSummaryCard
          title="Total Products"
          value={productSummary.products}
          subtitle={`In ${productSummary.categorys} categories`}
          icon={<Package size={20} />}
          iconBgColor="bg-primary-50"
          iconColor="text-primary"
        />
        <DashboardSummaryCard
          title="Expiring Products"
          value={productExpireSummary.products}
          subtitle={`In ${productExpireSummary.categorys} categories`}
          icon={<AlertCircle size={20} />}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-500"
        />
        <DashboardSummaryCard
          title="Low Stock Products"
          value={stockMaxMinSummary.stockMin.products}
          subtitle={`In ${stockMaxMinSummary.stockMin.categorys} categories`}
          icon={<TrendingDown size={20} />}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
        />
        <DashboardSummaryCard
          title="Max Stock Products"
          value={stockMaxMinSummary.stockMax.products}
          subtitle={`In ${stockMaxMinSummary.stockMax.categorys} categories`}
          icon={<TrendingUp size={20} />}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
      </motion.div>

      <motion.div variants={containerVariants} className="mb-6 grid gap-6 lg:grid-cols-2">
        <InventoryTrends />
        <CategoryDistribution />
      </motion.div>

      <motion.div variants={containerVariants} className="mb-6">
        <WarehouseSpace />
      </motion.div>

      <motion.div variants={containerVariants}>
        <AlertsCard
          lowStockCount={stockMaxMinSummary.stockMin.products}
          lowStockCategories={stockMaxMinSummary.stockMin.categorys}
          expiringCount={productExpireSummary.products}
          expiringCategories={productExpireSummary.categorys}
        />
      </motion.div>
    </>
  );
};

export default OverviewTab;
