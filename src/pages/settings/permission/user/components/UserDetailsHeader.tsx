
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';

interface UserDetailsHeaderProps {
  user: User;
  onEdit: () => void;
}

const UserDetailsHeader: React.FC<UserDetailsHeaderProps> = ({ user, onEdit }) => {
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
          {t('permission.userDetails')}
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

export default UserDetailsHeader;
