
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Module, UserFormData } from '../../types';
import { mockUsers, mockModules } from '../../mockData';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserContextProps {
  users: User[];
  filteredUsers: User[];
  modules: Module[];
  selectedUser: User | null;
  userToDelete: User | null;
  loading: boolean;
  handleSearch: (searchTerm: string) => void;
  handleRoleFilter: (role: string) => void;
  handleClear: () => void;
  handleViewUser: (user: User) => void;
  handleEditUser: (user: User) => void;
  handleDeleteUser: (user: User) => void;
  confirmDeleteUser: () => void;
  handleSaveUser: (formData: UserFormData) => void;
  setSelectedUser: (user: User | null) => void;
  setUserToDelete: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  
  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setModules(mockModules);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const lowercaseSearchTerm = term.toLowerCase();
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
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
      setFilteredUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
      
      toast({
        title: t('common.deleted'),
        description: t('permission.userDeleted'),
      });
      
      setUserToDelete(null);
    }
  };

  const handleSaveUser = (formData: UserFormData) => {
    const permissionObjects = formData.permissions.map(id => {
      for (const module of modules) {
        const permission = module.permissions.find(p => p.id === id);
        if (permission) return permission;
      }
      return { id, name: 'Unknown', description: 'Unknown permission' };
    });
  
    const user: User = {
      id: selectedUser?.id || String(Date.now()),
      name: `${formData.firstName} ${formData.lastName}`,
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
      created: formData.created || new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    
    if (selectedUser) {
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
    
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider value={{
      users,
      filteredUsers,
      modules,
      selectedUser,
      userToDelete,
      loading,
      handleSearch,
      handleRoleFilter,
      handleClear,
      handleViewUser,
      handleEditUser,
      handleDeleteUser,
      confirmDeleteUser,
      handleSaveUser,
      setSelectedUser,
      setUserToDelete
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
