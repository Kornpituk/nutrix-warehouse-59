
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Role {
  id: string;
  name: string;
  description: string;
  usedInPermissions: number;
}

interface RoleDetailsHeaderProps {
  role: Role;
  onEdit: () => void;
}

const RoleDetailsHeader: React.FC<RoleDetailsHeaderProps> = ({ role, onEdit }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/settings/permission/roles');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={handleBack} className="p-0 h-8 w-8">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">
          {t('permission.roleDetails')}
        </h1>
      </div>
      <Button 
        onClick={onEdit} 
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        <Edit className="mr-2 h-4 w-4" /> {t('common.edit')}
      </Button>
    </div>
  );
};

export default RoleDetailsHeader;
