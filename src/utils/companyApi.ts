
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
          // eslint-disable-next-line no-control-regex
          'x-location': warehouseId.replace(/[^\x00-\x7F]/g, '') // Remove non-ASCII characters,
        }
      }
    );

    if (!response) {
      throw new Error('Failed to fetch company data');
    }

    if(response){
      console.log('Company data response:', response);

    } 

    const data: CompanyData = await response.json();

    console.log('Company data:', response);
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
