
import React, { useState } from 'react';
import UserDetailsDialog from '../UserDetailsDialog';
import UserFormDialog from '../UserFormDialog';
import DeleteConfirmationDialog from '../../DeleteConfirmationDialog';
import { useUserContext } from '../context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserFormData } from '../../types';

const UserDialogs: React.FC = () => {
  const { 
    selectedUser, 
    userToDelete, 
    modules, 
    confirmDeleteUser, 
    handleSaveUser, 
    setSelectedUser,
    setUserToDelete,
    handleEditUser 
  } = useUserContext();
  const { t } = useLanguage();
  
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Form schema for user form
  const formSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: t('validation.email') }),
    userName: z.string().min(1, { message: t('validation.required') }),
    firstName: z.string().min(1, { message: t('validation.required') }),
    lastName: z.string().min(1, { message: t('validation.required') }),
    password: z.string().min(6, { message: t('validation.minLength') }),
    position: z.string().min(1, { message: t('validation.required') }),
    role: z.string().min(1, { message: t('validation.required') }),
    department: z.string().min(1, { message: t('validation.required') }),
    isActive: z.boolean(),
    isAdmin: z.boolean(),
    created: z.string().optional(),
    updated: z.string().optional(),
    permissions: z.array(z.string())
  });

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      position: '',
      department: '',
      role: '',
      isActive: true,
      isAdmin: false,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      permissions: []
    }
  });
  
  // Update form values when selected user changes
  React.useEffect(() => {
    if (selectedUser && isEditMode) {
      form.reset({
        name: selectedUser.name,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        userName: selectedUser.userName,
        password: selectedUser.password || '',
        position: selectedUser.position,
        department: selectedUser.department,
        role: selectedUser.role,
        isActive: selectedUser.isActive,
        isAdmin: selectedUser.isAdmin || false,
        created: selectedUser.created,
        updated: selectedUser.updated,
        permissions: selectedUser.permissions.map(p => p.id)
      });
    } else if (!isEditMode) {
      form.reset({
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        position: '',
        department: '',
        role: '',
        isActive: true,
        isAdmin: false,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        permissions: []
      });
    }
  }, [selectedUser, isEditMode, form]);

  // Watch for changes in context and update local state
  React.useEffect(() => {
    if (selectedUser && !userDetailsOpen && !userFormOpen) {
      setUserDetailsOpen(true);
    }
    
    if (userToDelete && !deleteDialogOpen) {
      setDeleteDialogOpen(true);
    }
  }, [selectedUser, userToDelete, userDetailsOpen, userFormOpen, deleteDialogOpen]);

  return (
    <>
      <UserDetailsDialog
        open={userDetailsOpen}
        onOpenChange={(open) => {
          setUserDetailsOpen(open);
          if (!open) setSelectedUser(null);
        }}
        user={selectedUser}
        onEditUser={handleEditUser}
      />
      
      <UserFormDialog
        open={userFormOpen}
        onOpenChange={(open) => {
          setUserFormOpen(open);
          if (!open) {
            setSelectedUser(null);
            setIsEditMode(false);
          }
        }}
        title={isEditMode ? t('permission.editUser') : t('permission.addUser')}
        description={isEditMode ? t('permission.editUserDesc') : t('permission.addUserDesc')}
        form={form}
        modules={modules}
        onSubmit={handleSaveUser}
        onCancel={() => setUserFormOpen(false)}
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
