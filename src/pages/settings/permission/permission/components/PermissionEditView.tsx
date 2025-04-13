
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { PermissionItem } from '@/types/settingType/permission/permission';

interface PermissionEditViewProps {
  selectedPermission: PermissionItem;
  newPermissionName: string;
  setNewPermissionName: (value: string) => void;
  newPermissionCode: string;
  setNewPermissionCode: (value: string) => void;
  newPermissionDescription: string;
  setNewPermissionDescription: (value: string) => void;
  setIsEditMode: (value: boolean) => void;
  handleSaveEdit: () => void;
}

const PermissionEditView: React.FC<PermissionEditViewProps> = ({
  selectedPermission,
  newPermissionName,
  setNewPermissionName,
  newPermissionCode,
  setNewPermissionCode,
  newPermissionDescription,
  setNewPermissionDescription,
  setIsEditMode,
  handleSaveEdit,
}) => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button
          variant="link"
          onClick={() => setIsEditMode(false)}
          className="p-0 flex items-center text-foreground gap-1"
        >
          <ArrowLeft className="size-4" />
          <span>Back</span>
        </Button>
        <div className="ml-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Edit Permission
          </h1>
          <p className="text-muted-foreground">Modify permission details</p>
        </div>
        <div className="ml-auto">
          <Button onClick={handleSaveEdit} className="bg-primary">
            Save Changes
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-white p-6 space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="font-medium">
            Permission Name
          </label>
          <Input
            id="name"
            value={newPermissionName}
            onChange={(e) => setNewPermissionName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="code" className="font-medium">
            Code
          </label>
          <Input
            id="code"
            value={newPermissionCode}
            onChange={(e) => setNewPermissionCode(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            A unique code used to identify this permission in your
            system
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <Textarea
            id="description"
            className="w-full min-h-[150px] p-3 border rounded-md"
            value={newPermissionDescription}
            onChange={(e) => setNewPermissionDescription(e.target.value)}
          />
        </div>

        <div>
          <h2 className="font-medium mb-2">Created</h2>
          <p>{new Date(selectedPermission.CreatedAt).toLocaleString()}</p>
        </div>

        <div>
          <h2 className="font-medium mb-2">Last Updated</h2>
          <p>{selectedPermission.ModifiedAt ? new Date(selectedPermission.ModifiedAt).toLocaleString() : 'Not modified yet'}</p>
        </div>
      </div>
    </div>
  );
};

export default PermissionEditView;
