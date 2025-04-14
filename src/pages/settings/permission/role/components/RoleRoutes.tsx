
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleDetailsPage from '../RoleDetailsPage';
import RoleEditPage from '../RoleEditPage';
import RolesPage from '../RolesPage';

const RoleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RolesPage />} />
      <Route path="/new" element={<RoleEditPage isNew={true} />} />
      <Route path="/edit/:id" element={<RoleEditPage />} />
      <Route path="/details/:id" element={<RoleDetailsPage />} />
    </Routes>
  );
};

export default RoleRoutes;
