import { User, Module, UserFormData } from '../../types';
import { SetStateAction, Dispatch } from 'react';

interface UserOperationsProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  filteredUsers: User[];
  setFilteredUsers: Dispatch<SetStateAction<User[]>>;
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  userToDelete: User | null;
  setUserToDelete: Dispatch<SetStateAction<User | null>>;
  modules: Module[];
  toast: (props: { title: string; description: string }) => void;
  t: (key: string) => string;
}

export const createUserOperations = ({
  users,
  setUsers,
  filteredUsers,
  setFilteredUsers,
  selectedUser,
  setSelectedUser,
  userToDelete,
  setUserToDelete,
  modules,
  toast,
  t
}: UserOperationsProps) => {
  const handleSearch = (term: string) => {
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
    setFilteredUsers(users);
  };

  const handleViewUser = (user: User) => {
    // This function is now used for navigation, not dialog opening
    // Navigation is handled directly in UserListTable
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

  return {
    handleSearch,
    handleRoleFilter,
    handleClear,
    handleViewUser,
    handleEditUser,
    handleDeleteUser,
    confirmDeleteUser,
    handleSaveUser
  };
};
