
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import RoleEditHeader from './components/RoleEditHeader';

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

interface RoleEditPageProps {
  isNew?: boolean;
}

const RoleEditPage: React.FC<RoleEditPageProps> = ({ isNew = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Get role data if we're editing, or use empty defaults if creating a new role
  const defaultRole = isNew ? { 
    id: '', 
    name: '', 
    description: '', 
    usedInPermissions: 0 
  } : getRoleById(id || '');
  
  const [roleName, setRoleName] = useState(defaultRole.name);
  const [roleDescription, setRoleDescription] = useState(defaultRole.description);
  
  const handleCancel = () => {
    if (isNew) {
      navigate('/settings/permission/roles');
    } else {
      navigate(`/settings/permission/roles/details/${id}`);
    }
  };
  
  const handleSave = () => {
    if (!roleName.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send this data to your API
    console.log('Saving role:', {
      id: isNew ? 'new-id' : id,
      name: roleName,
      description: roleDescription,
    });
    
    toast({
      title: "Success",
      description: isNew 
        ? "Role created successfully" 
        : "Role updated successfully"
    });
    
    navigate('/settings/permission/roles');
  };
  
  return (
    <div className="container mx-auto">
      <RoleEditHeader isNew={isNew} />
      
      <div className="bg-white rounded-md shadow p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              {t('permission.roleName')} <span className="text-red-500">*</span>
            </label>
            <Input 
              id="name" 
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter role name"
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              {t('permission.roleDescription')}
            </label>
            <Textarea 
              id="description"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="Describe the role's purpose"
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white">
            {t('common.save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleEditPage;
