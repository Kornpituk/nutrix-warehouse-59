
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
  isAdmin: boolean; // Changed from optional to required
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

// Add the UserFormData type here to be used across all components
export interface UserFormData {
  name?: string; // Optional to match form schema
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  position: string;
  department: string;
  role: string;
  isActive: boolean;
  isAdmin: boolean;
  permissions: string[];
  created?: string;
  updated?: string;
}
