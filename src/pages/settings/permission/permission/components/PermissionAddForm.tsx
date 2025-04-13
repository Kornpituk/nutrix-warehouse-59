
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface PermissionAddFormProps {
  newPermissionName: string;
  setNewPermissionName: (value: string) => void;
  newPermissionCode: string;
  setNewPermissionCode: (value: string) => void;
  newPermissionDescription: string;
  setNewPermissionDescription: (value: string) => void;
  handleAddPermission: () => void;
}

const PermissionAddForm: React.FC<PermissionAddFormProps> = ({
  newPermissionName,
  setNewPermissionName,
  newPermissionCode,
  setNewPermissionCode,
  newPermissionDescription,
  setNewPermissionDescription,
  handleAddPermission,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Permission</DialogTitle>
        <DialogDescription>
          Create a new permission in the system. Click save when you're
          done.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            placeholder="e.g. Create Users"
            value={newPermissionName}
            onChange={(e) => setNewPermissionName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-medium">
            Code
          </label>
          <Input
            id="code"
            placeholder="e.g. users:create"
            value={newPermissionCode}
            onChange={(e) => setNewPermissionCode(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            A unique code used to identify this permission in your
            system
          </p>
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Describe what this permission allows"
            className="min-h-[100px] resize-none"
            value={newPermissionDescription}
            onChange={(e) => setNewPermissionDescription(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button
          variant="default"
          className="bg-primary"
          onClick={handleAddPermission}
        >
          Save
        </Button>
      </DialogFooter>
    </>
  );
};

export default PermissionAddForm;
