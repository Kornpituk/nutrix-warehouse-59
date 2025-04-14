
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus } from 'lucide-react';

const UserHeader: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/settings/permission/users/new');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t('settings.users')}
        </h1>
        <p className="text-muted-foreground">
          {t('settings.usersDescription')}
        </p>
      </div>
      <Button onClick={handleAddUser} className="bg-red-600 hover:bg-red-700 text-white">
        <Plus className="mr-2 h-4 w-4" /> {t('permission.addUser')}
      </Button>
    </div>
  );
};

export default UserHeader;
