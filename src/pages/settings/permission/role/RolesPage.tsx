
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Eye, MoreHorizontal, Edit, Copy, Trash2, UserPlus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';
import { Module } from '../types';
import { mockModules } from '../mockData';

interface Role {
  id: string;
  name: string;
  description: string;
  usedInPermissions: number;
  isNew?: boolean;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'System administrator with all permissions',
    usedInPermissions: 8
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Can manage users but has limited system access',
    usedInPermissions: 5
  },
  {
    id: '3',
    name: 'User',
    description: 'Regular user with basic permissions',
    usedInPermissions: 1
  }
];

export default function RolesPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [modules, setModules] = useState<Module[]>(mockModules);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignPermissionDialogOpen, setIsAssignPermissionDialogOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }

    const newRole: Role = {
      id: String(Date.now()),
      name: newRoleName,
      description: newRoleDescription,
      usedInPermissions: 0,
      isNew: true
    };

    setRoles([...roles, newRole]);
    setNewRoleName('');
    setNewRoleDescription('');
    setIsAddRoleDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Role added successfully"
    });
  };

  const handleDeleteRole = () => {
    if (selectedRole) {
      setRoles(roles.filter(role => role.id !== selectedRole.id));
      setIsDeleteDialogOpen(false);
      setSelectedRole(null);
      
      toast({
        title: "Success",
        description: `Role "${selectedRole.name}" has been deleted`
      });
    }
  };

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

  const handleSearch = () => {
    // Implement search functionality
    // For now, this is just a placeholder
  };

  const handleClear = () => {
    setSearchTerm('');
    // Reset search results
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Roles</h1>
          <p className="text-muted-foreground">Manage user roles in your system.</p>
        </div>
        <Button 
          onClick={() => setIsAddRoleDialogOpen(true)}
          className="gap-1 bg-primary"
        >
          <Plus className="size-4" /> Add Role
        </Button>
      </div>
      
      <div className="rounded-md border bg-white">
        <div className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Input 
                placeholder="Search all" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Button variant="default" onClick={handleSearch}>
              <Search className="size-4 mr-1" /> Search
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <span>Clear</span>
            </Button>
          </div>
        </div>
        
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
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-white">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedRole(role);
                            setIsAssignPermissionDialogOpen(true);
                          }}
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
                          onClick={() => {
                            setSelectedRole(role);
                            setIsDeleteDialogOpen(true);
                          }}
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
      </div>

      <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
            <DialogDescription>
              Create a new role in the system. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input 
                id="name" 
                placeholder="e.g. Editor"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description"
                placeholder="Describe the role's purpose" 
                className="min-h-[100px] resize-none"
                value={newRoleDescription}
                onChange={(e) => setNewRoleDescription(e.target.value)}
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
              onClick={handleAddRole}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteRole}
        title="Delete Role"
        description={`Are you sure you want to delete the role "${selectedRole?.name}"? This action cannot be undone.`}
      />

      <Dialog open={isAssignPermissionDialogOpen} onOpenChange={setIsAssignPermissionDialogOpen}>
        <DialogContent className="sm:max-w-[700px] bg-white">
          <DialogHeader>
            <DialogTitle>Assign Permission</DialogTitle>
            <DialogDescription>
              Find all of Permission
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 py-2">
            <Input placeholder="Search all" />
            <Button variant="default">
              <Search className="size-4 mr-1" /> Search
            </Button>
            <Button variant="outline">Clear</Button>
          </div>
          <div className="overflow-y-auto max-h-[400px] border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Permission Name</TableHead>
                  <TableHead>Permission Code</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.flatMap(module => module.permissions).map(permission => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>{permission.id}</TableCell>
                    <TableCell>{permission.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="default" className="bg-primary">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
