
export interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  permissions: Permission[];
  isActive: boolean;
  password: string;
  isAdmin?: boolean;
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
