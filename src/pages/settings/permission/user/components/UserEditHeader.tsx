
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserEditHeaderProps {
  isNew: boolean;
  onSave: () => void;
}

const UserEditHeader: React.FC<UserEditHeaderProps> = ({ isNew, onSave }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/settings/permission/users');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={handleBack} className="p-0 h-8 w-8">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">
          {isNew ? t('permission.addUser') : t('permission.editUser')}
        </h1>
      </div>
      <Button 
        onClick={onSave} 
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        <Check className="mr-2 h-4 w-4" /> {t('common.save')}
      </Button>
    </div>
  );
};

export default UserEditHeader;
