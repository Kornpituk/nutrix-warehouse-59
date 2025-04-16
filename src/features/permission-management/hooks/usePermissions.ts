
import { useState, useEffect } from 'react';
import { Permission } from '../types';

// This would be replaced with actual API calls in a real application
const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'View Dashboard',
    code: 'dashboard:view',
    description: 'Allow viewing the dashboard',
    category: 'Dashboard',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Manage Users',
    code: 'users:manage',
    description: 'Allow creating, updating, and deleting users',
    category: 'User Management',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'View Inventory',
    code: 'inventory:view',
    description: 'Allow viewing inventory data',
    category: 'Inventory',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        // In a real application, we would fetch from the API
        // const response = await apiClient.get('/permissions');
        // setPermissions(response.data);
        
        // For demo purposes, we'll use mock data
        setPermissions(mockPermissions);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setIsLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const createPermission = async (data: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // In a real application, we would call the API
      // const response = await apiClient.post('/permissions', data);
      // const newPermission = response.data;
      
      // For demo purposes, we'll create a mock permission
      const newPermission: Permission = {
        id: `${permissions.length + 1}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setPermissions([...permissions, newPermission]);
      return newPermission;
    } catch (err) {
      throw err instanceof Error ? err : new Error('An unknown error occurred');
    }
  };

  const updatePermission = async (id: string, data: Partial<Permission>) => {
    try {
      // In a real application, we would call the API
      // const response = await apiClient.put(`/permissions/${id}`, data);
      // const updatedPermission = response.data;
      
      // For demo purposes, we'll update the permission locally
      const updatedPermissions = permissions.map(permission => 
        permission.id === id 
          ? { ...permission, ...data, updatedAt: new Date().toISOString() }
          : permission
      );
      
      setPermissions(updatedPermissions);
      return updatedPermissions.find(p => p.id === id);
    } catch (err) {
      throw err instanceof Error ? err : new Error('An unknown error occurred');
    }
  };

  const deletePermission = async (id: string) => {
    try {
      // In a real application, we would call the API
      // await apiClient.delete(`/permissions/${id}`);
      
      // For demo purposes, we'll delete the permission locally
      const filteredPermissions = permissions.filter(permission => permission.id !== id);
      setPermissions(filteredPermissions);
    } catch (err) {
      throw err instanceof Error ? err : new Error('An unknown error occurred');
    }
  };

  return {
    permissions,
    isLoading,
    error,
    createPermission,
    updatePermission,
    deletePermission,
  };
}
