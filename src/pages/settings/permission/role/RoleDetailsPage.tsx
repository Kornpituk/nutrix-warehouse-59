
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import RoleDetailsHeader from './components/RoleDetailsHeader';
import { Button } from '@/components/ui/button';

// Mock role data - in a real app, you would fetch this from an API
const getRoleById = (id: string) => {
  return {
    id,
    name: id === '1' ? 'Admin' : id === '2' ? 'Manager' : 'User',
    description: id === '1' 
      ? 'System administrator with all permissions' 
      : id === '2' 
      ? 'Can manage users but has limited system access' 
      : 'Regular user with basic permissions',
    usedInPermissions: id === '1' ? 8 : id === '2' ? 5 : 1
  };
};

const RoleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // In a real application, you would fetch this data from an API
  const role = getRoleById(id || '');
  
  const handleEdit = () => {
    navigate(`/settings/permission/roles/edit/${id}`);
  };

  if (!role) {
    return <div className="p-4">Role not found</div>;
  }

  return (
    <div className="container mx-auto">
      <RoleDetailsHeader role={role} onEdit={handleEdit} />
      
      <div className="bg-white rounded-md shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">{t('permission.roleDetails')}</h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">{t('permission.roleName')}</p>
            <p className="font-medium">{role.name}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">{t('permission.roleDescription')}</p>
            <p>{role.description}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">{t('permission.usedInPermissions')}</p>
            <p>{role.usedInPermissions}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow p-6">
        <h2 className="text-lg font-medium mb-4">{t('permission.assignedPermissions')}</h2>
        
        {/* This would typically be a list of permissions assigned to this role */}
        <p className="text-gray-500">{t('permission.noPermissionsAssigned')}</p>
      </div>
    </div>
  );
};

export default RoleDetailsPage;
