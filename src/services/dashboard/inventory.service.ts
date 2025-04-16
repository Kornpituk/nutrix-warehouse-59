
import apiClient from '../api-client';

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  location: string;
  expiryDate?: string;
  updatedAt: string;
}

export interface LowStockItem extends InventoryItem {
  percentRemaining: number;
}

export interface ExpiringItem extends InventoryItem {
  daysUntilExpiry: number;
}

const mockLowStockItems: LowStockItem[] = [
  {
    id: '1',
    sku: 'DF-001',
    name: 'Premium Dry Dog Food',
    category: 'Dog Food',
    currentStock: 15,
    minimumStock: 50,
    location: 'A1-02',
    updatedAt: '2023-06-01T10:30:00Z',
    percentRemaining: 30
  },
  {
    id: '2',
    sku: 'CF-003',
    name: 'Gourmet Cat Food',
    category: 'Cat Food',
    currentStock: 8,
    minimumStock: 30,
    location: 'B2-05',
    updatedAt: '2023-06-02T14:45:00Z',
    percentRemaining: 26.7
  },
  {
    id: '3',
    sku: 'PT-012',
    name: 'Dog Dental Treats',
    category: 'Pet Treats',
    currentStock: 12,
    minimumStock: 25,
    location: 'C3-08',
    updatedAt: '2023-06-03T09:15:00Z',
    percentRemaining: 48
  },
];

const mockExpiringItems: ExpiringItem[] = [
  {
    id: '4',
    sku: 'WF-007',
    name: 'Wet Cat Food',
    category: 'Cat Food',
    currentStock: 45,
    minimumStock: 20,
    location: 'D1-03',
    expiryDate: '2023-07-15T00:00:00Z',
    updatedAt: '2023-05-15T11:20:00Z',
    daysUntilExpiry: 30
  },
  {
    id: '5',
    sku: 'PT-008',
    name: 'Fresh Dog Treats',
    category: 'Pet Treats',
    currentStock: 28,
    minimumStock: 15,
    location: 'A2-07',
    expiryDate: '2023-07-20T00:00:00Z',
    updatedAt: '2023-05-20T16:30:00Z',
    daysUntilExpiry: 35
  },
];

const InventoryService = {
  async getLowStockItems(): Promise<LowStockItem[]> {
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.get<LowStockItem[]>('/inventory/low-stock');
      // return response.data;
      
      // For demo purposes, return mock data
      return mockLowStockItems;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      throw error;
    }
  },
  
  async getExpiringItems(): Promise<ExpiringItem[]> {
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.get<ExpiringItem[]>('/inventory/expiring');
      // return response.data;
      
      // For demo purposes, return mock data
      return mockExpiringItems;
    } catch (error) {
      console.error('Error fetching expiring items:', error);
      throw error;
    }
  },
};

export default InventoryService;
