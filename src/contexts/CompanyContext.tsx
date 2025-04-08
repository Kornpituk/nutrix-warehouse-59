
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
    
    // Update CSS variables for theme colors directly on :root
    const rootElement = document.documentElement;
    
    if (isAltTheme) {
      rootElement.style.setProperty('--primary', '#129748');
      rootElement.style.setProperty('--primary-foreground', '#FFFFFF');
      
      // Also add a data attribute to the document for additional theme-based styling
      document.body.setAttribute('data-theme', 'alt');
      
      console.log('Theme changed to alternative with color #129748');
    } else {
      rootElement.style.setProperty('--primary', '#AB0006');
      rootElement.style.setProperty('--primary-foreground', '#FFFFFF');
      
      // Remove the data attribute when using default theme
      document.body.removeAttribute('data-theme');
      
      console.log('Theme changed to default with color #AB0006');
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
