
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
        title: "สำเร็จ",
        description: `บทบาท "${selectedRole.name}" ถูกลบเรียบร้อยแล้ว`
      });
    }
  };

  const handleViewDetails = (role: Role) => {
    navigate(`/settings/permission/roles/details/${role.id}`);
  };

  const handleEditRole = (role: Role) => {
    navigate(`/settings/permission/roles/edit/${role.id}`);
  };

  const handleAssignPermission = (role: Role) => {
    setSelectedRole(role);
    setIsAssignPermissionDialogOpen(true);
  };

  const handleSearch = () => {
    // Filter roles based on search term
    // โค้ดจริงควรจะส่งคำค้นหาไปยัง API
    console.log("Searching for:", searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    // Reset search results to show all roles
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
          onAssignPermission={handleAssignPermission}
        />
      </div>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteRole}
        title="ลบบทบาท"
        description={`คุณแน่ใจหรือไม่ว่าต้องการลบบทบาท "${selectedRole?.name}"? การกระทำนี้ไม่สามารถยกเลิกได้`}
      />

      <AssignPermissionDialog 
        open={isAssignPermissionDialogOpen}
        onOpenChange={setIsAssignPermissionDialogOpen}
        modules={modules}
        roleId={selectedRole?.id}
        roleName={selectedRole?.name}
      />
    </div>
  );
}
