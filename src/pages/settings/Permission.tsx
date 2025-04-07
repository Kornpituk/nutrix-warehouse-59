
import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import UsersPage from './permission/UsersPage';
import RolesPage from './permission/RolesPage';
import PermissionsPage from './permission/PermissionsPage';
import PermissionNav from './permission/PermissionNav';

const PermissionSettings: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Check if we're at the main permission page
  const isMainPage = currentPath === '/settings/permission';
  
  if (isMainPage) {
    // Redirect to users page by default
    return <Navigate to="/settings/permission/users" replace />;
  }
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{t('settings.permission')}</h1>
        <p className="text-muted-foreground">
          {t('settings.permissionDescription')}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <PermissionNav />
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
