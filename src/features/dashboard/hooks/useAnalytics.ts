
import { useState, useEffect } from 'react';
import AnalyticsService, {
  DashboardStats,
  InventoryTrend,
  CategoryDistribution,
  WarehouseSpace,
  InboundOutbound
} from '@/services/dashboard/analytics.service';

export function useAnalytics() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [inventoryTrends, setInventoryTrends] = useState<InventoryTrend[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<CategoryDistribution[]>([]);
  const [warehouseSpace, setWarehouseSpace] = useState<WarehouseSpace[]>([]);
  const [inboundOutbound, setInboundOutbound] = useState<InboundOutbound[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          statsData,
          trendsData,
          categoryData,
          warehouseData,
          movementData
        ] = await Promise.all([
          AnalyticsService.getDashboardStats(),
          AnalyticsService.getInventoryTrends(),
          AnalyticsService.getCategoryDistribution(),
          AnalyticsService.getWarehouseSpace(),
          AnalyticsService.getInboundOutbound()
        ]);
        
        setDashboardStats(statsData);
        setInventoryTrends(trendsData);
        setCategoryDistribution(categoryData);
        setWarehouseSpace(warehouseData);
        setInboundOutbound(movementData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics data'));
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    dashboardStats,
    inventoryTrends,
    categoryDistribution,
    warehouseSpace,
    inboundOutbound,
    isLoading,
    error
  };
}
