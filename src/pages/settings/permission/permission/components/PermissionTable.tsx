
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Eye,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
} from 'lucide-react';
import { PermissionItem } from '@/types/settingType/permission/permission';

interface PermissionTableProps {
  permissions: PermissionItem[];
  handleViewPermissionDetails: (permission: PermissionItem) => void;
  handleEditPermission: (permission: PermissionItem) => void;
  handleDeleteConfirmation: (permission: PermissionItem) => void;
}

const PermissionTable: React.FC<PermissionTableProps> = ({
  permissions,
  handleViewPermissionDetails,
  handleEditPermission,
  handleDeleteConfirmation,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Last Update</TableHead>
          <TableHead>Used In Role</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map((permission) => (
          <TableRow key={permission.PermissionId}>
            <TableCell className="font-medium">
              {permission.PermissionName}
            </TableCell>
            <TableCell>{permission.PermissionCode}</TableCell>
            <TableCell>{permission.Description}</TableCell>
            <TableCell>{permission.ModifiedAt ? new Date(permission.ModifiedAt).toLocaleString() : 'Not modified yet'}</TableCell>
            <TableCell>{permission.UsedInRols}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleViewPermissionDetails(permission)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 bg-white"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleEditPermission(permission)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      // onClick={() => handleDuplicatePermission(permission)}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicate</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                      onClick={() => handleDeleteConfirmation(permission)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PermissionTable;
