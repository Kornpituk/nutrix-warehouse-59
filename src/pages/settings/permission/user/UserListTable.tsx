
import React from 'react';
import { Eye, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface UserListTableProps {
  users: User[];
  onViewUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const UserListTable: React.FC<UserListTableProps> = ({
  users,
  onViewUser,
  onEditUser,
  onDeleteUser
}) => {
  const { t } = useLanguage();

  const renderStatusBadge = (isActive: boolean) => {
    const statusClassName = isActive 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
    
    const statusText = isActive ? "Active" : "Inactive";
    
    return (
      <div className={`px-3 py-1 text-xs font-medium rounded-full w-fit ${statusClassName}`}>
        {statusText}
      </div>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="uppercase text-xs">Status</TableHead>
            <TableHead className="uppercase text-xs">Full name</TableHead>
            <TableHead className="uppercase text-xs">Username</TableHead>
            <TableHead className="uppercase text-xs">Role</TableHead>
            <TableHead className="uppercase text-xs">Department</TableHead>
            <TableHead className="uppercase text-xs">Position</TableHead>
            <TableHead className="uppercase text-xs text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-10">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="border-b">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  {renderStatusBadge(user.isActive)}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500">
                    {user.name.charAt(0)}
                  </div>
                  {user.name}
                </TableCell>
                <TableCell>{user.email.split('@')[0]}</TableCell>
                <TableCell>
                  {user.isAdmin ? 'Admin' : user.permissions.length > 5 ? 'Manager' : 'User'}
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center">
                    <Button variant="ghost" size="icon" onClick={() => onViewUser(user)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 bg-white">
                        <DropdownMenuItem onClick={() => onEditUser(user)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDeleteUser(user)}
                          className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserListTable;
