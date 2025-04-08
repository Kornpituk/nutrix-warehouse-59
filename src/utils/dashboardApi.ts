
import { authenticatedFetch } from './auth';

interface ProductSummary {
  categorys: number;
  products: number;
}

interface ProductExpireSummary {
  categorys: number;
  products: number;
}

interface StockMaxMinSummary {
  stockMax: {
    categorys: number;
    products: number;
  };
  stockMin: {
    categorys: number;
    products: number;
  };
}

export const fetchProductSummary = async (): Promise<ProductSummary> => {
  try {
    // Get the warehouse ID and encode it properly for headers
    const warehouseId = localStorage.getItem('selectedWarehouse') || '001';
    
    const response = await authenticatedFetch(
      'https://webapiorg.easetrackwms.com/api/v1/Dashboard/Summary/Product',
      {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'x-location': warehouseId
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product summary data');
    }

    const data: ProductSummary = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product summary:', error);
    // Return default values when API fails
    return { categorys: 0, products: 0 };
  }
};

export const fetchProductExpireSummary = async (): Promise<ProductExpireSummary> => {
  try {
    // Get the warehouse ID and encode it properly for headers
    const warehouseId = localStorage.getItem('selectedWarehouse') || '001';
    
    const response = await authenticatedFetch(
      'https://webapiorg.easetrackwms.com/api/v1/Dashboard/Summary/ProductExpire',
      {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'x-location': warehouseId
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product expire summary data');
    }

    const data: ProductExpireSummary = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product expire summary:', error);
    // Return default values when API fails
    return { categorys: 0, products: 0 };
  }
};

export const fetchStockMaxMinSummary = async (): Promise<StockMaxMinSummary> => {
  try {
    // Get the warehouse ID and encode it properly for headers
    const warehouseId = localStorage.getItem('selectedWarehouse') || '001';
    
    const response = await authenticatedFetch(
      'https://webapiorg.easetrackwms.com/api/v1/Dashboard/Summary/StockMaxMin',
      {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'x-location': warehouseId
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stock max/min summary data');
    }

    const data: StockMaxMinSummary = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock max/min summary:', error);
    // Return default values when API fails
    return {
      stockMax: { categorys: 0, products: 0 },
      stockMin: { categorys: 0, products: 0 }
    };
  }
};
