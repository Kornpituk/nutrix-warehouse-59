
import React from 'react';
import { Button } from '@/components/ui/button';
import { Exchange } from 'lucide-react';
import { useCompany } from '@/contexts/CompanyContext';

const ThemeToggle = () => {
  const { isAltTheme, toggleTheme, companyData } = useCompany();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      title={`Switch to ${isAltTheme ? 'Nutrix' : 'Alternative'} theme`}
    >
      <Exchange size={18} className={isAltTheme ? 'text-[#129748]' : 'text-primary'} />
    </Button>
  );
};

export default ThemeToggle;
