import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loading } from "@/components/ui/custom/loading";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Import refactored components
import UserListTable from './permission/UserListTable';
import UserDetailsDialog from './permission/UserDetailsDialog';
import UserFormDialog from './permission/UserFormDialog';
import DeleteConfirmationDialog from './permission/DeleteConfirmationDialog';
import SearchFilterBar from './permission/SearchFilterBar';
import { User, Module } from './permission/types';
import { mockUsers, mockModules } from './permission/mockData';

const PermissionSettings: React.FC = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form schema for user form
  const formSchema = z.object({
    name: z.string().min(1, { message: t('validation.required') }),
    email: z.string().email({ message: t('validation.email') }),
    password: z.string().min(6, { message: t('validation.minLength', { length: 6 }) }),
    position: z.string().min(1, { message: t('validation.required') }),
    department: z.string().min(1, { message: t('validation.required') }),
    isActive: z.boolean().default(true),
    isAdmin: z.boolean().default(false),
    permissions: z.array(z.string()).default([])
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      position: '',
      department: '',
      isActive: true,
      isAdmin: false,
      permissions: []
    }
  });

  // Reset form with user data when selectedUser or isEditMode changes
  useEffect(() => {
    if (selectedUser && isEditMode) {
      form.reset({
        name: selectedUser.name,
        email: selectedUser.email,
        password: selectedUser.password || '',
        position: selectedUser.position,
        department: selectedUser.department,
        isActive: selectedUser.isActive,
        isAdmin: selectedUser.isAdmin || false,
        permissions: selectedUser.permissions.map(p => p.id)
      });
    } else if (!isEditMode) {
      form.reset({
        name: '',
        email: '',
        password: '',
        position: '',
        department: '',
        isActive: true,
        isAdmin: false,
        permissions: []
      });
    }
  }, [selectedUser, isEditMode, form]);

  useEffect(() => {
    // Simulate API call to fetch users and modules
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setModules(mockModules);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(lowercaseSearchTerm) ||
      user.email.toLowerCase().includes(lowercaseSearchTerm) ||
      user.position.toLowerCase().includes(lowercaseSearchTerm) ||
      user.department.toLowerCase().includes(lowercaseSearchTerm)
    );
    
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (activeOnly: boolean) => {
    if (activeOnly) {
      setFilteredUsers(users.filter(user => user.isActive));
    } else {
      setFilteredUsers(users);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setUserFormOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setUserFormOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
      setFilteredUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
      
      toast({
        title: t('common.deleted'),
        description: t('permission.userDeleted'),
      });
      
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSaveUser = (formData: z.infer<typeof formSchema>) => {
    const permissionObjects = formData.permissions.map(id => {
      // Find the permission in modules
      for (const module of modules) {
        const permission = module.permissions.find(p => p.id === id);
        if (permission) return permission;
      }
      return { id, name: 'Unknown', description: 'Unknown permission' };
    });
  
    const user: User = {
      id: selectedUser?.id || String(Date.now()),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      position: formData.position,
      department: formData.department,
      isActive: formData.isActive,
      isAdmin: formData.isAdmin,
      permissions: permissionObjects
    };
    
    if (isEditMode) {
      // Update existing user
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? user : u));
      setFilteredUsers(prevUsers => prevUsers.map(u => u.id === user.id ? user : u));
      toast({
        title: t('common.updated'),
        description: t('permission.userUpdated'),
      });
    } else {
      // Add new user
      setUsers(prevUsers => [...prevUsers, user]);
      setFilteredUsers(prevUsers => [...prevUsers, user]);
      toast({
        title: t('common.added'),
        description: t('permission.userAdded'),
      });
    }
    
    setUserFormOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('permission.title')}</h1>
          <p className="text-muted-foreground">{t('permission.description')}</p>
        </div>
        <Button 
          onClick={handleAddUser}
          className="gap-1 bg-primary"
        >
          <Plus className="size-4" /> {t('permission.addUser')}
        </Button>
      </div>
      
      <div className="rounded-md border bg-white">
        <div className="p-4">
          <SearchFilterBar 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange} 
          />
        </div>
        
        <UserListTable 
          users={filteredUsers}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>
      
      <UserDetailsDialog
        open={userDetailsOpen}
        onOpenChange={setUserDetailsOpen}
        user={selectedUser}
      />
      
      <UserFormDialog
        open={userFormOpen}
        onOpenChange={setUserFormOpen}
        title={isEditMode ? t('permission.editUser') : t('permission.addUser')}
        description={isEditMode ? t('permission.editUserDesc') : t('permission.addUserDesc')}
        form={form}
        modules={modules}
        onSubmit={handleSaveUser}
        onCancel={() => setUserFormOpen(false)}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeleteUser}
        title={t('permission.deleteUser')}
        description={t('permission.deleteUserConfirmation')}
      />
    </div>
  );
};

export default PermissionSettings;
