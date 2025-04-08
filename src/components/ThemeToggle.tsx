
import React from 'react';
import { Button } from '@/components/ui/button';
import { Repeat } from 'lucide-react';
import { useCompany } from '@/contexts/CompanyContext';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle = () => {
  const { isAltTheme, toggleTheme, companyData } = useCompany();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      title={`Switch to ${isAltTheme ? 'Nutrix' : 'Alternative'} theme`}
      className="relative"
    >
      <Repeat 
        size={18} 
        className={isAltTheme ? 'text-[#129748]' : 'text-primary'} 
      />
      <span className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${isAltTheme ? 'bg-[#129748]' : 'bg-primary'}`}></span>
    </Button>
  );
};

export default ThemeToggle;
