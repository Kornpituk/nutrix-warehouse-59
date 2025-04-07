
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, UserPlus, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import refactored components
import UserListTable from './UserListTable';
import UserDetailsDialog from './UserDetailsDialog';
import UserFormDialog from './UserFormDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { User, Module } from './types';
import { mockUsers, mockModules } from './mockData';
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

  // Form schema for user form
  const formSchema = z.object({
    name: z.string().min(1, { message: t('validation.required') }),
    email: z.string().email({ message: t('validation.email') }),
    password: z.string().min(6, { message: t('validation.minLength') }),
    position: z.string().min(1, { message: t('validation.required') }),
    department: z.string().min(1, { message: t('validation.required') }),
    isActive: z.boolean(),
    isAdmin: z.boolean(),
    permissions: z.array(z.string())
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
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setModules(mockModules);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = () => {
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

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    
    if (!role) {
      setFilteredUsers(users);
      return;
    }
    
    let filtered = users;
    
    if (role === 'Admin') {
      filtered = users.filter(user => user.isAdmin);
    } else if (role === 'Manager') {
      filtered = users.filter(user => 
        !user.isAdmin && user.permissions.length >= 5
      );
    } else if (role === 'User') {
      filtered = users.filter(user => 
        !user.isAdmin && user.permissions.length < 5
      );
    } else if (role === 'all') {
      filtered = users;
    }
    
    setFilteredUsers(filtered);
  };

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

  const handleSaveUser = (formData: z.infer<typeof formSchema>) => {
    const permissionObjects = formData.permissions.map(id => {
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
          <h1 className="text-2xl font-bold tracking-tight">User</h1>
          <p className="text-muted-foreground">Find all of your company's user accounts and their associate roles.</p>
        </div>
        <Button 
          onClick={handleAddUser}
          className="gap-1 bg-primary"
        >
          <Plus className="size-4" /> Add User
        </Button>
      </div>
      
      <div className="rounded-md border bg-white">
        <div className="p-4 flex gap-2">
          <Select 
            value={selectedRole} 
            onValueChange={handleRoleFilter}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="User">User</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex-grow relative">
            <Input 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          
          <Button 
            variant="default" 
            onClick={handleSearch}
          >
            <Search className="size-4 mr-1" /> Search
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleClear}
          >
            Clear
          </Button>
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
}
