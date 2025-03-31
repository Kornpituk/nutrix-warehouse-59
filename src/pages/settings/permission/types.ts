
export interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  permissions: Permission[];
  isActive: boolean;
}

export interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface Module {
  id: string;
  name: string;
  permissions: Permission[];
}
