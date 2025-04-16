
export interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  roleId: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  position: string;
  department: string;
  roleId: string;
  status: 'active' | 'inactive';
}

export interface RoleFormData {
  name: string;
  description: string;
  permissions: string[];
}

export interface PermissionFormData {
  name: string;
  code: string;
  description: string;
  category: string;
}
