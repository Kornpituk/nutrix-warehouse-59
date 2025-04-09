
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import UserEditHeader from './components/UserEditHeader';
import UserEditForm from './components/UserEditForm';

interface UserEditPageProps {
  user?: User;
  onSave: (data: any) => void;
  isNew?: boolean;
}

const UserEditPage: React.FC<UserEditPageProps> = ({ user, onSave, isNew = false }) => {
  const navigate = useNavigate();
  
  const handleSubmit = (data: any) => {
    onSave(data);
  };

  return (
    <div className="container mx-auto py-4">
      <UserEditHeader 
        isNew={isNew} 
        onSave={() => document.querySelector('form')?.requestSubmit()} 
      />
      
      <UserEditForm 
        user={user} 
        isNew={isNew} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default UserEditPage;
