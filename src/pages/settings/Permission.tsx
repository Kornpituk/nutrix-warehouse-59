
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loading } from "@/components/ui/custom/loading";

// Import refactored components
import UserListTable from './permission/UserListTable';
import UserDetailsDialog from './permission/UserDetailsDialog';
import UserFormDialog from './permission/UserFormDialog';
import DeleteConfirmationDialog from './permission/DeleteConfirmationDialog';
import SearchFilterBar from './permission/SearchFilterBar';
import { User, Permission, Module } from './permission/types';

const PermissionSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Dialog states
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  
  // Selected user states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch users and modules
    setTimeout(() => {
      // Mock data
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          position: 'Admin',
          department: 'IT',
          isActive: true,
          permissions: [
            { id: '1', name: 'View Dashboard', description: 'Can view the dashboard' },
            { id: '2', name: 'Manage Users', description: 'Can create, edit, and delete users' },
            { id: '3', name: 'View Reports', description: 'Can view all reports' }
          ]
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          position: 'Manager',
          department: 'Operations',
          isActive: true,
          permissions: [
            { id: '1', name: 'View Dashboard', description: 'Can view the dashboard' },
            { id: '4', name: 'Edit Products', description: 'Can edit product information' }
          ]
        },
        {
          id: '3',
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          position: 'Warehouse Staff',
          department: 'Warehouse',
          isActive: false,
          permissions: [
            { id: '5', name: 'View Inventory', description: 'Can view inventory levels' }
          ]
        }
      ];

      const mockModules: Module[] = [
        {
          id: '1',
          name: 'Dashboard',
          permissions: [
            { id: '1', name: 'View Dashboard', description: 'Can view the dashboard' }
          ]
        },
        {
          id: '2',
          name: 'User Management',
          permissions: [
            { id: '2', name: 'Manage Users', description: 'Can create, edit, and delete users' }
          ]
        },
        {
          id: '3',
          name: 'Reports',
          permissions: [
            { id: '3', name: 'View Reports', description: 'Can view all reports' }
          ]
        },
        {
          id: '4',
          name: 'Products',
          permissions: [
            { id: '4', name: 'Edit Products', description: 'Can edit product information' }
          ]
        },
        {
          id: '5',
          name: 'Inventory',
          permissions: [
            { id: '5', name: 'View Inventory', description: 'Can view inventory levels' }
          ]
        }
      ];

      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setModules(mockModules);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setUserFormOpen(true);
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setUserFormOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDetails = () => {
    setUserDetailsOpen(false);
  };

  const handleEditFromDetails = () => {
    setUserDetailsOpen(false);
    setIsEditMode(true);
    setUserFormOpen(true);
  };

  const handleSaveUser = (user: User) => {
    if (isEditMode) {
      // Update existing user
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? user : u));
      toast({
        title: t('common.updated'),
        description: t('permission.userUpdated'),
      });
    } else {
      // Add new user
      setUsers(prevUsers => [...prevUsers, { ...user, id: String(Date.now()) }]);
      toast({
        title: t('common.added'),
        description: t('permission.userAdded'),
      });
    }
    setUserFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
      toast({
        title: t('common.deleted'),
        description: t('permission.userDeleted'),
      });
      setDeleteConfirmationOpen(false);
      setUserToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading text={t('common.loading')} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('permission.title')}</h1>
        <p className="text-gray-600">{t('permission.subtitle')}</p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        <Button onClick={handleAddUser} className="bg-primary">
          <Plus className="mr-2 h-4 w-4" />
          {t('permission.addUser')}
        </Button>
      </div>

      <UserListTable
        users={filteredUsers}
        handleViewDetails={handleViewDetails}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
      />

      <UserDetailsDialog
        open={userDetailsOpen}
        onOpenChange={setUserDetailsOpen}
        selectedUser={selectedUser}
        modules={modules}
        onClose={handleCloseDetails}
        onEdit={handleEditFromDetails}
      />

      <UserFormDialog
        open={userFormOpen}
        onOpenChange={setUserFormOpen}
        selectedUser={selectedUser}
        isEditMode={isEditMode}
        modules={modules}
        onSave={handleSaveUser}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        onOpenChange={setDeleteConfirmationOpen}
        userToDelete={userToDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PermissionSettings;
