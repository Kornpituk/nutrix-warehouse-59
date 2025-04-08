
import { User, Module } from './types';

// Mock users data for authentication and user management
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    position: 'Admin',
    department: 'IT',
    isActive: true,
    userName: 'admin',
    password: 'admin123',
    isAdmin: true,
    permissions: [
      { id: '1', name: 'Create Users', description: 'Can create new users' },
      { id: '2', name: 'Edit Users', description: 'Can edit existing users' },
      { id: '3', name: 'Delete Users', description: 'Can delete users' },
      { id: '4', name: 'View Users', description: 'Can view user details' },
      { id: '16', name: 'Edit Settings', description: 'Can edit system settings' },
      { id: '17', name: 'Manage Departments', description: 'Can manage departments' },
      { id: '18', name: 'Manage Roles', description: 'Can manage roles and permissions' }
    ],
    firstName: 'John',
    lastName: 'Smith',
    role: 'Admin',
    created: '01/04/2025, 17:36:28',
    updated: '01/04/2025, 17:36:28'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    position: 'Manager',
    department: 'Operations',
    isActive: true,
    password: 'user123',
    isAdmin: false,
    permissions: [
      { id: '3', name: 'View Reports', description: 'Can view reports' },
      { id: '8', name: 'View Items', description: 'Can view inventory details' },
      { id: '12', name: 'View Orders', description: 'Can view order details' }
    ],
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'Manager',
    userName: 'Sarah',
    created: '01/04/2025, 17:36:28',
    updated: '01/04/2025, 17:36:28'
  },
  {
    id: '3',
    name: 'Mike Thompson',
    email: 'mike@example.com',
    position: 'Warehouse Staff',
    department: 'Warehouse',
    isActive: true,
    password: 'warehouse123',
    isAdmin: false,
    permissions: [
      { id: '5', name: 'Create Items', description: 'Can create new inventory items' },
      { id: '6', name: 'Edit Items', description: 'Can edit inventory items' },
      { id: '8', name: 'View Items', description: 'Can view inventory details' }
    ],
    firstName: 'Mike',
    lastName: 'Thompson',
    role: 'Staff',
    userName: 'Mike',
    created: '01/04/2025, 17:36:28',
    updated: '01/04/2025, 17:36:28'
  }
];

// Module data with permissions
export const mockModules: Module[] = [
  {
    id: '1',
    name: 'User Management',
    permissions: [
      { id: '1', name: 'Create Users', description: 'Can create new users' },
      { id: '2', name: 'Edit Users', description: 'Can edit existing users' },
      { id: '3', name: 'Delete Users', description: 'Can delete users' },
      { id: '4', name: 'View Users', description: 'Can view user details' },
    ]
  },
  {
    id: '2',
    name: 'Inventory Management',
    permissions: [
      { id: '5', name: 'Create Items', description: 'Can create new inventory items' },
      { id: '6', name: 'Edit Items', description: 'Can edit inventory items' },
      { id: '7', name: 'Delete Items', description: 'Can delete inventory items' },
      { id: '8', name: 'View Items', description: 'Can view inventory details' },
    ]
  },
  {
    id: '3',
    name: 'Order Management',
    permissions: [
      { id: '9', name: 'Create Orders', description: 'Can create new orders' },
      { id: '10', name: 'Edit Orders', description: 'Can edit orders' },
      { id: '11', name: 'Cancel Orders', description: 'Can cancel orders' },
      { id: '12', name: 'View Orders', description: 'Can view order details' },
    ]
  },
  {
    id: '4',
    name: 'Reports',
    permissions: [
      { id: '13', name: 'View Reports', description: 'Can view reports' },
      { id: '14', name: 'Export Reports', description: 'Can export reports' },
      { id: '15', name: 'Schedule Reports', description: 'Can schedule reports' },
    ]
  },
  {
    id: '5',
    name: 'Settings',
    permissions: [
      { id: '16', name: 'Edit Settings', description: 'Can edit system settings' },
      { id: '17', name: 'Manage Departments', description: 'Can manage departments' },
      { id: '18', name: 'Manage Roles', description: 'Can manage roles and permissions' },
    ]
  }
];
