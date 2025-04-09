
import { User, Module, UserFormData } from '../../types';

export interface UserContextProps {
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
