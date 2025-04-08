
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCompanyData, CompanyData } from '../utils/companyApi';

interface CompanyContextType {
  isAltTheme: boolean;
  toggleTheme: () => void;
  companyData: CompanyData | null;
  isLoading: boolean;
}

const defaultCompanyData: CompanyData = {
  comId: '',
  companyName: 'Nutrix WMS',
  logo: '/Nutrix.png'
};

const CompanyContext = createContext<CompanyContextType>({
  isAltTheme: false,
  toggleTheme: () => {},
  companyData: defaultCompanyData,
  isLoading: true,
});

export const useCompany = () => useContext(CompanyContext);

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
  const [isAltTheme, setIsAltTheme] = useState(() => {
    const saved = localStorage.getItem('isAltTheme');
    return saved ? JSON.parse(saved) : false;
  });
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompanyData = async () => {
      if (isAltTheme) {
        try {
          const data = await fetchCompanyData();
          setCompanyData(data);
        } catch (error) {
          console.error('Failed to load company data:', error);
        }
      } else {
        setCompanyData(defaultCompanyData);
      }
      setIsLoading(false);
    };

    loadCompanyData();
  }, [isAltTheme]);

  useEffect(() => {
    localStorage.setItem('isAltTheme', JSON.stringify(isAltTheme));
    
    // Update the document title based on the company theme
    if (companyData) {
      document.title = companyData.companyName;
    }
    
    // Update CSS variables for theme colors
    const rootStyle = document.documentElement.style;
    if (isAltTheme) {
      rootStyle.setProperty('--primary', '#129748');
      rootStyle.setProperty('--primary-foreground', '#FFFFFF');
    } else {
      rootStyle.setProperty('--primary', '#AB0006');
      rootStyle.setProperty('--primary-foreground', '#FFFFFF');
    }
    
  }, [isAltTheme, companyData]);

  const toggleTheme = () => {
    setIsAltTheme((prev) => !prev);
  };

  return (
    <CompanyContext.Provider value={{ isAltTheme, toggleTheme, companyData, isLoading }}>
      {children}
    </CompanyContext.Provider>
  );
};
