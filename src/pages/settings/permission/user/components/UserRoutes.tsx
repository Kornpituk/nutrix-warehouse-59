
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserEditPage from '../UserEditPage';
import { useUserContext } from '../context';
import UserListView from './UserListView';

const UserRoutes: React.FC = () => {
  const { selectedUser, handleSaveUser } = useUserContext();

  return (
    <Routes>
      <Route path="/" element={<UserListView />} />
      <Route path="/new" element={
        <UserEditPage 
          onSave={handleSaveUser} 
          isNew={true} 
        />
      } />
      <Route path="/edit/:id" element={
        <UserEditPage 
          user={selectedUser!} 
          onSave={handleSaveUser}
        />
      } />
    </Routes>
  );
};

export default UserRoutes;
