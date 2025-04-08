
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
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch company data');
    }

    const data: CompanyData = await response.json();

    console.log('Company data:', data);
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
