
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import UsersPage from './permission/UsersPage';
import RolesPage from './permission/RolesPage';
import PermissionsPage from './permission/PermissionsPage';

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
    <div className="container mx-auto">
      <Routes>
        <Route path="users" element={<UsersPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="permissions" element={<PermissionsPage />} />
      </Routes>
    </div>
  );
};

export default PermissionSettings;
