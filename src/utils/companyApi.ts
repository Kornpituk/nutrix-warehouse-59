
import { authenticatedFetch } from './auth';

export interface CompanyData {
  comId: string;
  companyName: string;
  logo: string;
}

export const fetchCompanyData = async (): Promise<CompanyData> => {
  try {
    // Get the warehouse ID from localStorage
    const warehouseId = localStorage.getItem('selectedWarehouse') || '001';

    const response = await authenticatedFetch(
      'https://webapiorg.easetrackwms.com/api/v1/Company',
      {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'x-location': warehouseId,
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi4LiT4Lix4LiQ4Lie4LilIiwibmFtZWlkIjoiMDAwMDAxIiwibmJmIjoxNzQ0MDc3MzI3LCJleHAiOjE3NDYyMzczMjcsImlhdCI6MTc0NDA3NzMyNywiaXNzIjoiSXNzdWVyIiwiYXVkIjoiQXVkaWVuY2UifQ.1ufIkf69BP2b5ZCD1boaSHKTnkR2mTXRyGtC1DmSU2g',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch company data');
    }

    const data: CompanyData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching company data:', error);
    // Return default values when API fails
    return {
      comId: '',
      companyName: 'Nutrix WMS',
      logo: '/Nutrix.png'
    };
  }
};
