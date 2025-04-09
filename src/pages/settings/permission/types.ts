
export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  position: string;
  department: string;
  permissions: Permission[];
  isActive: boolean;
  userName: string;
  password: string;
  isAdmin?: boolean;
  created: string;
  updated: string;
  avatar?: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category?: string; // Make category optional
}

export interface Module {
  id: string;
  name: string;
  permissions: Permission[];
}
