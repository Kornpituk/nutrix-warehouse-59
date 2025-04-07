
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import UsersPage from './permission/UsersPage';
import RolesPage from './permission/RolesPage';
import PermissionsPage from './permission/PermissionsPage';
import PermissionNav from './permission/PermissionNav';

const PermissionSettings: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  // Check if we're at the main permission page
  const isMainPage = location.pathname === '/settings/permission';
  
  if (isMainPage) {
    // Redirect to users page by default
    return <Navigate to="/settings/permission/users" replace />;
  }
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex gap-6">
        <div className="w-56 shrink-0">
          <PermissionNav className="sticky top-6" />
        </div>
        <div className="flex-1">
          <Routes>
            <Route path="users" element={<UsersPage />} />
            <Route path="roles" element={<RolesPage />} />
            <Route path="permissions" element={<PermissionsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default PermissionSettings;
