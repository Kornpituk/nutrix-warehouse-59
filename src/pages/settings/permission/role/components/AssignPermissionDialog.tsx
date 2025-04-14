
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Module } from '../../types';
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

interface AssignPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modules: Module[];
}

const AssignPermissionDialog: React.FC<AssignPermissionDialogProps> = ({
  open,
  onOpenChange,
  modules
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};

export default AssignPermissionDialog;
