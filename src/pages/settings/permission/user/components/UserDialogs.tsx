
import React, { useState } from 'react';
import UserDetailsDialog from '../UserDetailsDialog';
import DeleteConfirmationDialog from '../../DeleteConfirmationDialog';
import { useUserContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const UserDialogs: React.FC = () => {
  const { 
    selectedUser, 
    userToDelete, 
    confirmDeleteUser, 
    setSelectedUser,
    setUserToDelete,
    handleEditUser 
  } = useUserContext();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  React.useEffect(() => {
    if (selectedUser && !userDetailsOpen) {
      setUserDetailsOpen(true);
    }
    
    if (userToDelete && !deleteDialogOpen) {
      setDeleteDialogOpen(true);
    }
  }, [selectedUser, userToDelete, userDetailsOpen, deleteDialogOpen]);

  const handleEditFromDetails = (user) => {
    handleEditUser(user);
    setUserDetailsOpen(false);
    navigate(`/settings/permission/users/edit/${user.id}`);
  };

  return (
    <>
      <UserDetailsDialog
        open={userDetailsOpen}
        onOpenChange={(open) => {
          setUserDetailsOpen(open);
          if (!open) setSelectedUser(null);
        }}
        user={selectedUser}
        onEditUser={handleEditFromDetails}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setUserToDelete(null);
        }}
        onConfirm={confirmDeleteUser}
        title={t('permission.deleteUser')}
        description={t('permission.deleteUserConfirmation')}
      />
    </>
  );
};

export default UserDialogs;
