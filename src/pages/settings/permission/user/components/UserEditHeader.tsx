
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
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={handleBack} className="p-0 h-8 w-8">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">
            {isNew ? t('permission.addUser') : t('permission.editUser')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isNew ? t('permission.addUserDesc') : t('permission.editUserDesc')}
          </p>
        </div>
      </div>
      <Button 
        onClick={onSave} 
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        <Check className="mr-1 h-4 w-4" /> {t('common.save')} Changes
      </Button>
    </div>
  );
};

export default UserEditHeader;
