
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserFormData } from '../types';
import UserEditHeader from './components/UserEditHeader';
import UserEditForm from './components/UserEditForm';

interface UserEditPageProps {
  user?: User;
  onSave: (data: UserFormData) => void;
  isNew?: boolean;
}

const UserEditPage: React.FC<UserEditPageProps> = ({ user, onSave, isNew = false }) => {
  const navigate = useNavigate();
  
  // Convert User to UserFormData for the form
  const userFormData: UserFormData | undefined = user ? {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userName: user.userName,
    password: user.password,
    position: user.position,
    department: user.department,
    role: user.role,
    isActive: user.isActive,
    isAdmin: user.isAdmin || false, // Provide default value if undefined
    permissions: user.permissions.map(p => p.id),
    created: user.created,
    updated: user.updated,
  } : undefined;

  const handleSubmit = (data: UserFormData) => {
    onSave(data);
  };

  return (
    <div className="container mx-auto py-4">
      <UserEditHeader 
        isNew={isNew} 
        onSave={() => document.querySelector('form')?.requestSubmit()} 
      />
      
      <UserEditForm 
        user={userFormData} 
        isNew={isNew} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default UserEditPage;
