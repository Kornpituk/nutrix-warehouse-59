import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context';

const UserHeader: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedUser } = useUserContext();

  const handleAddUser = () => {
    setSelectedUser(null);
    navigate('/settings/permission/users/new');
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User</h1>
        <p className="text-muted-foreground">Find all of your company's user accounts and their associate roles.</p>
      </div>
      <Button 
        onClick={handleAddUser}
        className="gap-1 bg-primary"
      >
        <Plus className="size-4" /> Add User
      </Button>
    </div>
  );
};

export default UserHeader;
