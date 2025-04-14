
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoleEditHeaderProps {
  isNew?: boolean;
}

const RoleEditHeader: React.FC<RoleEditHeaderProps> = ({ isNew = false }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/settings/permission/roles');
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <Button variant="ghost" onClick={handleBack} className="p-0 h-8 w-8">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-bold">
        {isNew ? t('permission.addRole') : t('permission.editRole')}
      </h1>
    </div>
  );
};

export default RoleEditHeader;
