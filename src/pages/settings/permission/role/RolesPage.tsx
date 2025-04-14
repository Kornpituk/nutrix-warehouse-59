
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockModules } from '../mockData';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';
import RoleHeader from './components/RoleHeader';
import RoleSearch from './components/RoleSearch';
import RoleList from './components/RoleList';
import AssignPermissionDialog from './components/AssignPermissionDialog';
import { Role } from './types';

// Mock data
const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'System administrator with all permissions',
    usedInPermissions: 8
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Can manage users but has limited system access',
    usedInPermissions: 5
  },
  {
    id: '3',
    name: 'User',
    description: 'Regular user with basic permissions',
    usedInPermissions: 1
  }
];

export default function RolesPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [modules] = useState(mockModules);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignPermissionDialogOpen, setIsAssignPermissionDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddRole = () => {
    navigate('/settings/permission/roles/new');
  };

  const handleDeleteRole = () => {
    if (selectedRole) {
      setRoles(roles.filter(role => role.id !== selectedRole.id));
      setIsDeleteDialogOpen(false);
      setSelectedRole(null);
      
      toast({
        title: "Success",
        description: `Role "${selectedRole.name}" has been deleted`
      });
    }
  };

  const handleViewDetails = (role: Role) => {
    navigate(`/settings/permission/roles/details/${role.id}`);
  };

  const handleEditRole = (role: Role) => {
    navigate(`/settings/permission/roles/edit/${role.id}`);
  };

  const handleSearch = () => {
    // Implement search functionality
    // For now, this is just a placeholder
  };

  const handleClear = () => {
    setSearchTerm('');
    // Reset search results
  };

  return (
    <div className="container mx-auto py-6">
      <RoleHeader onAddRole={handleAddRole} />
      
      <div className="rounded-md border bg-white">
        <RoleSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          onClear={handleClear}
        />
        
        <RoleList 
          roles={roles}
          setRoles={setRoles}
          onViewDetails={handleViewDetails}
          onEditRole={handleEditRole}
          onDeleteRole={(role) => {
            setSelectedRole(role);
            setIsDeleteDialogOpen(true);
          }}
          onAssignPermission={(role) => {
            setSelectedRole(role);
            setIsAssignPermissionDialogOpen(true);
          }}
        />
      </div>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteRole}
        title="Delete Role"
        description={`Are you sure you want to delete the role "${selectedRole?.name}"? This action cannot be undone.`}
      />

      <AssignPermissionDialog 
        open={isAssignPermissionDialogOpen}
        onOpenChange={setIsAssignPermissionDialogOpen}
        modules={modules}
      />
    </div>
  );
}
