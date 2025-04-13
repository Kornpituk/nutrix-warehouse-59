
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PermissionHeaderProps {
  onAddPermission: () => void;
}

const PermissionHeader: React.FC<PermissionHeaderProps> = ({ onAddPermission }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Permissions</h1>
        <p className="text-muted-foreground">
          Manage permissions in your system.
        </p>
      </div>
      <Button
        onClick={onAddPermission}
        className="gap-1 bg-primary"
      >
        <Plus className="size-4" /> Add Permission
      </Button>
    </div>
  );
};

export default PermissionHeader;
