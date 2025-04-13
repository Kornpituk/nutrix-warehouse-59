
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PermissionItem } from '@/types/settingType/permission/permission';

interface PermissionDetailsViewProps {
  selectedPermission: PermissionItem;
  setIsViewDetailsMode: (value: boolean) => void;
  handleEditPermission: (permission: PermissionItem) => void;
}

const PermissionDetailsView: React.FC<PermissionDetailsViewProps> = ({
  selectedPermission,
  setIsViewDetailsMode,
  handleEditPermission,
}) => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button
          variant="link"
          onClick={() => setIsViewDetailsMode(false)}
          className="p-0 flex items-center text-foreground gap-1"
        >
          <ArrowLeft className="size-4" />
          <span>Back</span>
        </Button>
        <div className="ml-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Permission Details
          </h1>
          <p className="text-muted-foreground">
            View permission information and usage
          </p>
        </div>
        <div className="ml-auto">
          <Button
            onClick={() => {
              handleEditPermission(selectedPermission);
            }}
            className="bg-primary"
          >
            Edit Permission
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-white p-6 space-y-6">
        <div>
          <h2 className="font-medium mb-2">Permission Name</h2>
          <p className="text-lg">{selectedPermission.PermissionName}</p>
        </div>

        <div>
          <h2 className="font-medium mb-2">
            Code{" "}
            <span className="text-sm text-gray-500 font-normal">
              {selectedPermission.PermissionCode}
            </span>
          </h2>
          <p className="text-sm text-gray-500">
            A unique code used to identify this permission in your
            system
          </p>
        </div>

        <div>
          <h2 className="font-medium mb-2">Description</h2>
          <p>{selectedPermission.Description}</p>
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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Used In Roles</h2>
        <p className="text-muted-foreground mb-4">
          Roles that currently use this permission
        </p>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-primary">
                  Admin
                </TableCell>
                <TableCell>
                  System administrator with all permissions
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-primary">
                  Manager
                </TableCell>
                <TableCell>
                  Can manage users but has limited system access
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PermissionDetailsView;
