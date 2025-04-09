
import React from 'react';
import { useUserContext } from '../context';
import UserHeader from './UserHeader';
import UserFilterBar from './UserFilterBar';
import UserListTable from '../UserListTable';
import UserDialogs from './UserDialogs';

const UserListView: React.FC = () => {
  const { 
    filteredUsers, 
    handleViewUser, 
    handleEditUser, 
    handleDeleteUser 
  } = useUserContext();

  return (
    <div className="container mx-auto py-6">
      <UserHeader />
      
      <div className="rounded-md border bg-white">
        <UserFilterBar />
        
        <UserListTable 
          users={filteredUsers}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>
      
      <UserDialogs />
    </div>
  );
};

export default UserListView;
