
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Module } from '../../types';
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
  roleId?: string;
  roleName?: string;
}

const AssignPermissionDialog: React.FC<AssignPermissionDialogProps> = ({
  open,
  onOpenChange,
  modules,
  roleId,
  roleName
}) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, boolean>>({});
  
  const handleSearch = () => {
    // ในกรณีนี้เราแค่กรองแบบ client-side
    // เราสามารถเพิ่มฟังก์ชันค้นหาแบบ server-side ในอนาคต
  };
  
  const handleClear = () => {
    setSearchTerm('');
  };
  
  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId]
    }));
  };
  
  const handleSave = () => {
    // ในโค้ดจริงต้องส่งข้อมูลไปยัง API
    const selectedPermissionIds = Object.entries(selectedPermissions)
      .filter(([, isSelected]) => isSelected)
      .map(([id]) => id);
    
    console.log(`Saving permissions for role ${roleId}:`, selectedPermissionIds);
    
    toast({
      title: "สำเร็จ",
      description: `กำหนดสิทธิ์ให้กับบทบาท "${roleName}" เรียบร้อยแล้ว`,
    });
    
    onOpenChange(false);
  };
  
  const filteredPermissions = modules.flatMap(module => 
    module.permissions.filter(permission => 
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-white">
        <DialogHeader>
          <DialogTitle>กำหนดสิทธิ์</DialogTitle>
          <DialogDescription>
            {roleName ? `กำหนดสิทธิ์สำหรับบทบาท: ${roleName}` : 'ค้นหาสิทธิ์ทั้งหมด'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 py-2">
          <Input 
            placeholder="ค้นหาทั้งหมด" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="default" onClick={handleSearch}>
            <Search className="size-4 mr-1" /> ค้นหา
          </Button>
          <Button variant="outline" onClick={handleClear}>ล้าง</Button>
        </div>
        <div className="overflow-y-auto max-h-[400px] border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>ชื่อสิทธิ์</TableHead>
                <TableHead>รหัสสิทธิ์</TableHead>
                <TableHead>คำอธิบาย</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.map(permission => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <Checkbox 
                      id={`permission-${permission.id}`}
                      checked={!!selectedPermissions[permission.id]}
                      onCheckedChange={() => handleTogglePermission(permission.id)}
                    />
                  </TableCell>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.id}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                </TableRow>
              ))}
              {filteredPermissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    ไม่พบข้อมูล
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">ยกเลิก</Button>
          </DialogClose>
          <Button variant="default" className="bg-primary" onClick={handleSave}>
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignPermissionDialog;
