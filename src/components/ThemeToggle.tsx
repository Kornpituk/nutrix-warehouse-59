import React from 'react';
import { Button } from '@/components/ui/button';
import { Repeat } from 'lucide-react';
import { useCompany } from '@/contexts/CompanyContext';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { isAltTheme, toggleTheme, companyData } = useCompany();
  // Get current theme mode from ThemeContext
  const { mode, setMode } = useTheme();
  
  // Toggle between light and dark mode
  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} // Keep the company theme toggle functionality
      title={`Switch to ${isAltTheme ? 'Nutrix' : 'Alternative'} theme`}
      className="relative mr-2"
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