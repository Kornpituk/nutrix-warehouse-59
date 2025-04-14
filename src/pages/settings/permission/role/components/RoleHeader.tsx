
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoleHeaderProps {
  onAddRole: () => void;
}

const RoleHeader: React.FC<RoleHeaderProps> = ({ onAddRole }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Roles</h1>
        <p className="text-muted-foreground">Manage user roles in your system.</p>
      </div>
      <Button 
        onClick={onAddRole}
        className="gap-1 bg-primary"
      >
        <Plus className="size-4" /> Add Role
      </Button>
    </div>
  );
};

export default RoleHeader;
