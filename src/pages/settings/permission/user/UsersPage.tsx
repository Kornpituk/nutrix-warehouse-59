
import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserProvider } from './context';
import UserRoutes from './components/UserRoutes';

const UsersPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const baseRoute = '/settings/permission/users';
  const isSubPath = path.startsWith(baseRoute) && path !== baseRoute;
  
  return (
    <UserProvider>
      <UserRoutes />
    </UserProvider>
  );
};

export default UsersPage;
