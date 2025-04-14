
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, MoreHorizontal, Edit, Copy, Trash2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Role } from '../types';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface RoleListProps {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
  onViewDetails: (role: Role) => void;
  onEditRole: (role: Role) => void;
  onDeleteRole: (role: Role) => void;
  onAssignPermission: (role: Role) => void;
}

const RoleList: React.FC<RoleListProps> = ({ 
  roles, 
  setRoles,
  onViewDetails,
  onEditRole,
  onDeleteRole,
  onAssignPermission
}) => {
  const { toast } = useToast();
  
  const handleDuplicateRole = (role: Role) => {
    const duplicatedRole = {
      ...role,
      id: String(Date.now()),
      name: `${role.name} (Copy)`,
      isNew: true
    };
    
    setRoles([...roles, duplicatedRole]);
    
    toast({
      title: "Success",
      description: `Role "${role.name}" has been duplicated`
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Used In Permissions</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="font-medium">
              {role.name}
              {role.isNew && (
                <span className="ml-2 rounded bg-red-500 px-1.5 py-0.5 text-xs text-white">New</span>
              )}
            </TableCell>
            <TableCell>{role.description}</TableCell>
            <TableCell>{role.usedInPermissions}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end items-center">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onViewDetails(role)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => onEditRole(role)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => onAssignPermission(role)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Assign Permission</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => handleDuplicateRole(role)}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicate</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                      onClick={() => onDeleteRole(role)}
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

export default RoleList;
