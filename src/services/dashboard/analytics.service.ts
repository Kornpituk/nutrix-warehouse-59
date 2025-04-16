
import apiClient from '../api-client';

export interface DashboardStats {
  totalProducts: number;
  totalWarehouseSpace: number;
  spaceUtilization: number;
  lowStockItems: number;
  expiringItems: number;
  inboundShipments: number;
  outboundShipments: number;
}

export interface InventoryTrend {
  date: string;
  inventoryLevel: number;
}

export interface CategoryDistribution {
  category: string;
  percentage: number;
  count: number;
}

export interface WarehouseSpace {
  warehouseName: string;
  totalCapacity: number;
  usedSpace: number;
  availableSpace: number;
}

export interface InboundOutbound {
  month: string;
  inbound: number;
  outbound: number;
}

const mockDashboardStats: DashboardStats = {
  totalProducts: 458,
  totalWarehouseSpace: 5000,
  spaceUtilization: 78,
  lowStockItems: 12,
  expiringItems: 8,
  inboundShipments: 5,
  outboundShipments: 7,
};

const mockInventoryTrends: InventoryTrend[] = [
  { date: '2023-01', inventoryLevel: 320 },
  { date: '2023-02', inventoryLevel: 350 },
  { date: '2023-03', inventoryLevel: 400 },
  { date: '2023-04', inventoryLevel: 380 },
  { date: '2023-05', inventoryLevel: 420 },
  { date: '2023-06', inventoryLevel: 450 },
];

const mockCategoryDistribution: CategoryDistribution[] = [
  { category: 'Dog Food', percentage: 45, count: 206 },
  { category: 'Cat Food', percentage: 30, count: 137 },
  { category: 'Bird Food', percentage: 15, count: 69 },
  { category: 'Fish Food', percentage: 10, count: 46 },
];

const mockWarehouseSpace: WarehouseSpace[] = [
  { warehouseName: 'Main Warehouse', totalCapacity: 3000, usedSpace: 2400, availableSpace: 600 },
  { warehouseName: 'North Facility', totalCapacity: 2000, usedSpace: 1500, availableSpace: 500 },
];

const mockInboundOutbound: InboundOutbound[] = [
  { month: 'Jan', inbound: 120, outbound: 90 },
  { month: 'Feb', inbound: 140, outbound: 110 },
  { month: 'Mar', inbound: 160, outbound: 130 },
  { month: 'Apr', inbound: 180, outbound: 150 },
  { month: 'May', inbound: 200, outbound: 170 },
  { month: 'Jun', inbound: 220, outbound: 190 },
];

const AnalyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.get<DashboardStats>('/analytics/dashboard-stats');
      // return response.data;
      
      // For demo purposes, return mock data
      return mockDashboardStats;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
  
  async getInventoryTrends(): Promise<InventoryTrend[]> {
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.get<InventoryTrend[]>('/analytics/inventory-trends');
      // return response.data;
      
      // For demo purposes, return mock data
      return mockInventoryTrends;
    } catch (error) {
      console.error('Error fetching inventory trends:', error);
      throw error;
    }
  },
  
  async getCategoryDistribution(): Promise<CategoryDistribution[]> {
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.get<CategoryDistribution[]>('/analytics/category-distribution');
      // return response.data;
      
      // For demo purposes, return mock data
      return mockCategoryDistribution;
    } catch (error) {
      console.error('Error fetching category distribution:', error);
      throw error;
    }
  },
  
  async getWarehouseSpace(): Promise<WarehouseSpace[]> {
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.get<WarehouseSpace[]>('/analytics/warehouse-space');
      // return response.data;
      
      // For demo purposes, return mock data
      return mockWarehouseSpace;
    } catch (error) {
      console.error('Error fetching warehouse space:', error);
      throw error;
    }
  },
  
  async getInboundOutbound(): Promise<InboundOutbound[]> {
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.get<InboundOutbound[]>('/analytics/inbound-outbound');
      // return response.data;
      
      // For demo purposes, return mock data
      return mockInboundOutbound;
    } catch (error) {
      console.error('Error fetching inbound/outbound data:', error);
      throw error;
    }
  },
};

export default AnalyticsService;
