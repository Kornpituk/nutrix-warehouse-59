
import { useState, useEffect } from 'react';
import InventoryService, { LowStockItem, ExpiringItem } from '@/services/dashboard/inventory.service';

export function useInventoryAlerts() {
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([]);
  const [expiringItems, setExpiringItems] = useState<ExpiringItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [lowStockData, expiringData] = await Promise.all([
          InventoryService.getLowStockItems(),
          InventoryService.getExpiringItems()
        ]);
        
        setLowStockItems(lowStockData);
        setExpiringItems(expiringData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch inventory alerts'));
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    lowStockItems,
    expiringItems,
    isLoading,
    error,
    totalAlerts: lowStockItems.length + expiringItems.length
  };
}
