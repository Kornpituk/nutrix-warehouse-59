
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import { getAuthTokens, isTokenExpired, refreshAccessToken } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const tokens = getAuthTokens();
      
      // If no tokens are present, we'll let the render function redirect
      if (!tokens) return;
      
      // If token is expired, try to refresh
      if (isTokenExpired()) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          toast({
            title: "Session expired",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
          navigate('/login');
        }
      }
    };
    
    checkAuth();
  }, [navigate, toast]);
  
  // Check if authenticated
  const isAuthenticated = getAuthTokens() !== null;
  const selectedWarehouse = localStorage.getItem('selectedWarehouse');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!selectedWarehouse) {
    return <Navigate to="/select-warehouse" replace />;
  }
  
  return (
    <SidebarNav>
      {children}
    </SidebarNav>
  );
};

export default ProtectedRoute;
