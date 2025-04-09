import React, { useEffect, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Import refactored components
import UserListTable from './UserListTable';
import UserDetailsDialog from './UserDetailsDialog';
import UserFormDialog from './UserFormDialog';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';
import { User, Module } from '../types';
import { mockUsers, mockModules } from '../mockData';

// Form schema for user form
const createUserSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(1, { message: t('validation.required') }),
  firstName: z.string().min(1, { message: t('validation.required') }),
  lastName: z.string().min(1, { message: t('validation.required') }),
  email: z.string().email({ message: t('validation.email') }),
  userName: z.string().min(1, { message: t('validation.required') }),
  password: z.string().min(6, { message: t('validation.minLength') }),
  position: z.string().min(1, { message: t('validation.required') }),
  department: z.string().min(1, { message: t('validation.required') }),
  role: z.string().min(1, { message: t('validation.required') }),
  isActive: z.boolean(),
  isAdmin: z.boolean(),
  permissions: z.array(z.string()),
  created: z.string().optional(),
  updated: z.string().optional()
});

export default function UsersPage() {
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Create form with schema
  const formSchema = createUserSchema(t);
  type FormValues = z.infer<typeof formSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      position: '',
      department: '',
      role: '',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      isActive: true,
      isAdmin: false,
      permissions: []
    }
  });

  // Fetch users data
  const fetchUsers = useCallback(() => {
    setLoading(true);
    // Simulating API call with timeout
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setModules(mockModules);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset form when selectedUser or editMode changes
  useEffect(() => {
    if (selectedUser && isEditMode) {
      form.reset({
        name: selectedUser.name,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        userName: selectedUser.userName,
        password: selectedUser.password,  // Don't pre-fill password for security
        position: selectedUser.position,
        department: selectedUser.department,
        role: selectedUser.role,
        isActive: selectedUser.isActive,
        isAdmin: selectedUser.isAdmin || false,
        permissions: selectedUser.permissions.map(p => p.id)
      });
    } else if (!isEditMode) {
      form.reset({
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        position: '',
        department: '',
        role: '',
        isActive: true,
        isAdmin: false,
        permissions: []
      });
    }
  }, [selectedUser, isEditMode, form]);

  // Search functionality
  const handleSearch = useCallback(() => {
    if (!searchTerm.trim() && !selectedRole) {
      setFilteredUsers(users);
      return;
    }
    
    let filtered = users;
    
    // Apply search term filter
    if (searchTerm.trim()) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(lowercaseSearchTerm) ||
        user.email.toLowerCase().includes(lowercaseSearchTerm) ||
        user.position.toLowerCase().includes(lowercaseSearchTerm) ||
        user.department.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // Apply role filter
    if (selectedRole) {
      if (selectedRole === 'Admin') {
        filtered = filtered.filter(user => user.isAdmin);
      } else if (selectedRole === 'Manager') {
        filtered = filtered.filter(user => 
          !user.isAdmin && user.permissions.length >= 5
        );
      } else if (selectedRole === 'User') {
        filtered = filtered.filter(user => 
          !user.isAdmin && user.permissions.length < 5
        );
      }
    }
    
    setFilteredUsers(filtered);
  }, [searchTerm, selectedRole, users]);

  // Apply filters when search term or role changes
  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedRole, handleSearch]);

  const handleClear = () => {
    setSearchTerm('');
    setSelectedRole('');
    setFilteredUsers(users);
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

  const handleSaveUser = (formData: FormValues) => {
    const permissionObjects = formData.permissions.map(id => {
      for (const module of modules) {
        const permission = module.permissions.find(p => p.id === id);
        if (permission) return permission;
      }
      return { id, name: 'Unknown', description: 'Unknown permission' };
    });
  
    const now = new Date().toISOString();
    const user: User = {
      id: selectedUser?.id || String(Date.now()),
      name: formData.name,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      userName: formData.userName,
      password: formData.password,
      position: formData.position,
      department: formData.department,
      role: formData.role,
      isActive: formData.isActive,
      isAdmin: formData.isAdmin,
      permissions: permissionObjects,
      created: selectedUser?.created || now,
      updated: now,
    };
    
    if (isEditMode) {
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? user : u));
      setFilteredUsers(prevUsers => prevUsers.map(u => u.id === user.id ? user : u));
      toast({
        title: t('common.updated'),
        description: t('permission.userUpdated'),
      });
    } else {
      setUsers(prevUsers => [...prevUsers, user]);
      setFilteredUsers(prevUsers => [...prevUsers, user]);
      toast({
        title: t('common.added'),
        description: t('permission.userAdded'),
      });
    }
    
    setUserFormOpen(false);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('permission.users')}</h1>
          <p className="text-muted-foreground">{t('permission.usersDescription')}</p>
        </div>
        <Button 
          onClick={handleAddUser}
          className="gap-1 bg-primary"
        >
          <Plus className="h-4 w-4" /> {t('permission.addUser')}
        </Button>
      </div>
      
      <div className="rounded-md border bg-white shadow-sm">
        <div className="p-4 flex flex-wrap gap-2">
          <Select 
            value={selectedRole} 
            onValueChange={setSelectedRole}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t('permission.selectRole')} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="User">User</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex-grow relative">
            <Input 
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleClear}
          >
            {t('common.clear')}
          </Button>
          
          <Button 
            variant="outline"
            onClick={fetchUsers}
            className="ml-auto"
          >
            <RefreshCw className="h-4 w-4 mr-1" /> {t('common.refresh')}
          </Button>
        </div>
        
        <UserListTable 
          users={filteredUsers}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>
      
      {selectedUser && (
        <UserDetailsDialog
          open={userDetailsOpen}
          onOpenChange={setUserDetailsOpen}
          user={selectedUser}
        />
      )}
      
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
}