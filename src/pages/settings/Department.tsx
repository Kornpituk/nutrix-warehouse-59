
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogFooter, DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { Plus, Search, Edit, Trash, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DepartmentSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [departments, setDepartments] = useState([
    { id: 'DEPT-001', name: 'Warehouse Operations', manager: 'John Smith', staffCount: 15, status: 'Active' },
    { id: 'DEPT-002', name: 'Inventory Management', manager: 'Sarah Johnson', staffCount: 8, status: 'Active' },
    { id: 'DEPT-003', name: 'Shipping & Receiving', manager: 'Mike Davis', staffCount: 12, status: 'Active' },
    { id: 'DEPT-004', name: 'Quality Control', manager: 'Anna Lee', staffCount: 5, status: 'Active' },
    { id: 'DEPT-005', name: 'Maintenance', manager: 'Robert Brown', staffCount: 4, status: 'Active' },
  ]);

  const [staff, setStaff] = useState([
    { id: 'STAFF-101', name: 'John Smith', department: 'Warehouse Operations', position: 'Department Manager', status: 'Active' },
    { id: 'STAFF-102', name: 'Maria Garcia', department: 'Warehouse Operations', position: 'Team Leader', status: 'Active' },
    { id: 'STAFF-103', name: 'David Chen', department: 'Warehouse Operations', position: 'Warehouse Associate', status: 'Active' },
    { id: 'STAFF-104', name: 'Sarah Johnson', department: 'Inventory Management', position: 'Department Manager', status: 'Active' },
    { id: 'STAFF-105', name: 'James Wilson', department: 'Inventory Management', position: 'Inventory Specialist', status: 'Active' },
    { id: 'STAFF-106', name: 'Mike Davis', department: 'Shipping & Receiving', position: 'Department Manager', status: 'Active' },
    { id: 'STAFF-107', name: 'Lisa Rodriguez', department: 'Shipping & Receiving', position: 'Logistics Coordinator', status: 'Active' },
    { id: 'STAFF-108', name: 'Anna Lee', department: 'Quality Control', position: 'Department Manager', status: 'Active' },
    { id: 'STAFF-109', name: 'Robert Brown', department: 'Maintenance', position: 'Department Manager', status: 'Active' },
    { id: 'STAFF-110', name: 'Jessica Taylor', department: 'Warehouse Operations', position: 'Warehouse Associate', status: 'On Leave' },
  ]);

  // State for department filters
  const [showDeptFilter, setShowDeptFilter] = useState(false);
  const [deptSearchTerm, setDeptSearchTerm] = useState('');
  
  // State for staff filters
  const [showStaffFilter, setShowStaffFilter] = useState(false);
  const [staffSearchTerm, setStaffSearchTerm] = useState('');
  
  // State for department dialog
  const [isDeptDialogOpen, setIsDeptDialogOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<any>(null);
  const [deptFormData, setDeptFormData] = useState({
    name: '',
    manager: '',
    status: 'Active'
  });

  // State for staff dialog
  const [isStaffDialogOpen, setIsStaffDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [staffFormData, setStaffFormData] = useState({
    name: '',
    department: '',
    position: '',
    status: 'Active'
  });

  // State for detail dialogs
  const [isDeptDetailOpen, setIsDeptDetailOpen] = useState(false);
  const [isStaffDetailOpen, setIsStaffDetailOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<any>(null);

  // State for delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: 'department' | 'staff', item: any} | null>(null);

  // Handle department input changes
  const handleDeptInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeptFormData({ ...deptFormData, [name]: value });
  };

  // Handle staff input changes
  const handleStaffInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStaffFormData({ ...staffFormData, [name]: value });
  };

  // Filter departments based on search term
  const filteredDepartments = departments.filter(dept => 
    dept.id.toLowerCase().includes(deptSearchTerm.toLowerCase()) ||
    dept.name.toLowerCase().includes(deptSearchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(deptSearchTerm.toLowerCase())
  );

  // Filter staff based on search term
  const filteredStaff = staff.filter(s => 
    s.id.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
    s.name.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(staffSearchTerm.toLowerCase()) ||
    s.position.toLowerCase().includes(staffSearchTerm.toLowerCase())
  );

  // Add new department
  const handleAddDepartment = () => {
    if (!deptFormData.name || !deptFormData.manager) {
      toast({
        title: t('ui.error'),
        description: t('ui.fillRequiredFields'),
        variant: "destructive"
      });
      return;
    }

    const newDept = {
      id: `DEPT-${(departments.length + 1).toString().padStart(3, '0')}`,
      name: deptFormData.name,
      manager: deptFormData.manager,
      staffCount: 0,
      status: deptFormData.status
    };

    setDepartments([...departments, newDept]);
    setIsDeptDialogOpen(false);
    setDeptFormData({ name: '', manager: '', status: 'Active' });
    
    toast({
      title: t('ui.success'),
      description: t('ui.departmentAdded')
    });
  };

  // Edit department
  const handleEditDepartment = () => {
    if (!deptFormData.name || !deptFormData.manager) {
      toast({
        title: t('ui.error'),
        description: t('ui.fillRequiredFields'),
        variant: "destructive"
      });
      return;
    }

    const updatedDepartments = departments.map(dept => {
      if (dept.id === selectedDept.id) {
        return {
          ...dept,
          name: deptFormData.name,
          manager: deptFormData.manager,
          status: deptFormData.status
        };
      }
      return dept;
    });

    setDepartments(updatedDepartments);
    setIsDeptDialogOpen(false);
    setSelectedDept(null);
    
    toast({
      title: t('ui.success'),
      description: t('ui.departmentUpdated')
    });
  };

  // Add new staff member
  const handleAddStaff = () => {
    if (!staffFormData.name || !staffFormData.department || !staffFormData.position) {
      toast({
        title: t('ui.error'),
        description: t('ui.fillRequiredFields'),
        variant: "destructive"
      });
      return;
    }

    const newStaff = {
      id: `STAFF-${(staff.length + 111).toString()}`,
      name: staffFormData.name,
      department: staffFormData.department,
      position: staffFormData.position,
      status: staffFormData.status
    };

    setStaff([...staff, newStaff]);
    setIsStaffDialogOpen(false);
    setStaffFormData({ name: '', department: '', position: '', status: 'Active' });
    
    // Update the staff count for the department
    const updatedDepartments = departments.map(dept => {
      if (dept.name === staffFormData.department) {
        return {
          ...dept,
          staffCount: dept.staffCount + 1
        };
      }
      return dept;
    });
    
    setDepartments(updatedDepartments);
    
    toast({
      title: t('ui.success'),
      description: t('ui.staffAdded')
    });
  };

  // Edit staff member
  const handleEditStaff = () => {
    if (!staffFormData.name || !staffFormData.department || !staffFormData.position) {
      toast({
        title: t('ui.error'),
        description: t('ui.fillRequiredFields'),
        variant: "destructive"
      });
      return;
    }

    // Check if department changed for staff count update
    const oldDepartment = staff.find(s => s.id === selectedStaff.id)?.department;
    const departmentChanged = oldDepartment !== staffFormData.department;

    const updatedStaff = staff.map(s => {
      if (s.id === selectedStaff.id) {
        return {
          ...s,
          name: staffFormData.name,
          department: staffFormData.department,
          position: staffFormData.position,
          status: staffFormData.status
        };
      }
      return s;
    });

    setStaff(updatedStaff);
    setIsStaffDialogOpen(false);
    setSelectedStaff(null);
    
    // If department changed, update staff counts
    if (departmentChanged) {
      const updatedDepartments = departments.map(dept => {
        if (dept.name === oldDepartment) {
          return {
            ...dept,
            staffCount: dept.staffCount - 1
          };
        } else if (dept.name === staffFormData.department) {
          return {
            ...dept,
            staffCount: dept.staffCount + 1
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
    }
    
    toast({
      title: t('ui.success'),
      description: t('ui.staffUpdated')
    });
  };

  // Delete confirmation handler
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'department') {
      // Check if department has staff members
      const hasStaff = staff.some(s => s.department === itemToDelete.item.name);
      if (hasStaff) {
        toast({
          title: t('ui.error'),
          description: t('ui.cannotDeleteDeptWithStaff'),
          variant: "destructive"
        });
        setDeleteConfirmOpen(false);
        setItemToDelete(null);
        return;
      }
      
      const updatedDepartments = departments.filter(dept => dept.id !== itemToDelete.item.id);
      setDepartments(updatedDepartments);
      toast({
        title: t('ui.success'),
        description: t('ui.departmentDeleted')
      });
    } else {
      const updatedStaff = staff.filter(s => s.id !== itemToDelete.item.id);
      setStaff(updatedStaff);
      
      // Update department staff count
      const departmentName = itemToDelete.item.department;
      const updatedDepartments = departments.map(dept => {
        if (dept.name === departmentName) {
          return {
            ...dept,
            staffCount: dept.staffCount - 1
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      toast({
        title: t('ui.success'),
        description: t('ui.staffDeleted')
      });
    }
    
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  // Open dialog for adding a department
  const openAddDeptDialog = () => {
    setSelectedDept(null);
    setDeptFormData({ name: '', manager: '', status: 'Active' });
    setIsDeptDialogOpen(true);
  };

  // Open dialog for editing a department
  const openEditDeptDialog = (dept: any) => {
    setSelectedDept(dept);
    setDeptFormData({
      name: dept.name,
      manager: dept.manager,
      status: dept.status
    });
    setIsDeptDialogOpen(true);
  };

  // Open dialog for adding a staff member
  const openAddStaffDialog = () => {
    setSelectedStaff(null);
    setStaffFormData({ name: '', department: '', position: '', status: 'Active' });
    setIsStaffDialogOpen(true);
  };

  // Open dialog for editing a staff member
  const openEditStaffDialog = (staffMember: any) => {
    setSelectedStaff(staffMember);
    setStaffFormData({
      name: staffMember.name,
      department: staffMember.department,
      position: staffMember.position,
      status: staffMember.status
    });
    setIsStaffDialogOpen(true);
  };

  // Show department details
  const showDeptDetails = (dept: any) => {
    setDetailItem(dept);
    setIsDeptDetailOpen(true);
  };

  // Show staff details
  const showStaffDetails = (staffMember: any) => {
    setDetailItem(staffMember);
    setIsStaffDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.department')}</h1>
        <p className="text-muted-foreground">
          {t('ui.manageDepartments')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('ui.departments')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('ui.totalStaff')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{staff.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('ui.activeStaff')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {staff.filter(s => s.status === 'Active').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>{t('ui.departments')}</CardTitle>
            <CardDescription>
              {t('ui.manageDepartments')}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowDeptFilter(!showDeptFilter)}>
              <Search className="mr-2 h-4 w-4" />
              {t('ui.filter')}
            </Button>
            <Button size="sm" onClick={openAddDeptDialog}>
              <Plus className="mr-2 h-4 w-4" />
              {t('ui.add')}
            </Button>
          </div>
        </CardHeader>
        
        {showDeptFilter && (
          <div className="px-6 py-2">
            <Input
              placeholder={t('ui.searchDepartments')}
              value={deptSearchTerm}
              onChange={(e) => setDeptSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        )}
        
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 bg-muted/50 p-3">
              <div className="font-medium">{t('ui.departmentID')}</div>
              <div className="font-medium">{t('ui.name')}</div>
              <div className="font-medium">{t('ui.manager')}</div>
              <div className="font-medium">{t('ui.staffCount')}</div>
              <div className="text-right font-medium">{t('ui.actions')}</div>
            </div>
            <div className="divide-y">
              {filteredDepartments.map((dept) => (
                <div key={dept.id} className="grid grid-cols-5 items-center p-3">
                  <div className="font-medium">{dept.id}</div>
                  <div>{dept.name}</div>
                  <div>{dept.manager}</div>
                  <div>{dept.staffCount}</div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => showDeptDetails(dept)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openEditDeptDialog(dept)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-destructive"
                      onClick={() => {
                        setItemToDelete({ type: 'department', item: dept });
                        setDeleteConfirmOpen(true);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>{t('ui.staffList')}</CardTitle>
            <CardDescription>
              {t('ui.manageStaff')}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowStaffFilter(!showStaffFilter)}>
              <Search className="mr-2 h-4 w-4" />
              {t('ui.filter')}
            </Button>
            <Button size="sm" onClick={openAddStaffDialog}>
              <Plus className="mr-2 h-4 w-4" />
              {t('ui.add')}
            </Button>
          </div>
        </CardHeader>
        
        {showStaffFilter && (
          <div className="px-6 py-2">
            <Input
              placeholder={t('ui.searchStaff')}
              value={staffSearchTerm}
              onChange={(e) => setStaffSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        )}
        
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 bg-muted/50 p-3">
              <div className="font-medium">{t('ui.staffID')}</div>
              <div className="font-medium">{t('ui.name')}</div>
              <div className="font-medium">{t('ui.department')}</div>
              <div className="font-medium">{t('ui.position')}</div>
              <div className="text-right font-medium">{t('ui.actions')}</div>
            </div>
            <div className="divide-y">
              {filteredStaff.map((member) => (
                <div key={member.id} className="grid grid-cols-5 items-center p-3">
                  <div className="font-medium">{member.id}</div>
                  <div>{member.name}</div>
                  <div>{member.department}</div>
                  <div>{member.position}</div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => showStaffDetails(member)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openEditStaffDialog(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-destructive"
                      onClick={() => {
                        setItemToDelete({ type: 'staff', item: member });
                        setDeleteConfirmOpen(true);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Dialog (Add/Edit) */}
      <Dialog open={isDeptDialogOpen} onOpenChange={setIsDeptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDept ? t('ui.editDepartment') : t('ui.addDepartment')}
            </DialogTitle>
            <DialogDescription>
              {selectedDept ? t('ui.updateDepartmentDetails') : t('ui.fillDepartmentDetails')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t('ui.departmentName')}</Label>
              <Input 
                id="name" 
                name="name" 
                value={deptFormData.name} 
                onChange={handleDeptInputChange} 
                placeholder={t('ui.enterDepartmentName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manager">{t('ui.managerName')}</Label>
              <Input 
                id="manager" 
                name="manager" 
                value={deptFormData.manager} 
                onChange={handleDeptInputChange} 
                placeholder={t('ui.enterManagerName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">{t('ui.status')}</Label>
              <Input 
                id="status" 
                name="status" 
                value={deptFormData.status} 
                onChange={handleDeptInputChange} 
                placeholder={t('ui.enterStatus')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeptDialogOpen(false)}>{t('ui.cancel')}</Button>
            <Button onClick={selectedDept ? handleEditDepartment : handleAddDepartment}>
              {selectedDept ? t('ui.update') : t('ui.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Staff Dialog (Add/Edit) */}
      <Dialog open={isStaffDialogOpen} onOpenChange={setIsStaffDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedStaff ? t('ui.editStaff') : t('ui.addStaff')}
            </DialogTitle>
            <DialogDescription>
              {selectedStaff ? t('ui.updateStaffDetails') : t('ui.fillStaffDetails')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t('ui.staffName')}</Label>
              <Input 
                id="name" 
                name="name" 
                value={staffFormData.name} 
                onChange={handleStaffInputChange} 
                placeholder={t('ui.enterStaffName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">{t('ui.department')}</Label>
              <Input 
                id="department" 
                name="department" 
                value={staffFormData.department} 
                onChange={handleStaffInputChange} 
                placeholder={t('ui.enterDepartment')}
                list="departments"
              />
              <datalist id="departments">
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name} />
                ))}
              </datalist>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">{t('ui.position')}</Label>
              <Input 
                id="position" 
                name="position" 
                value={staffFormData.position} 
                onChange={handleStaffInputChange} 
                placeholder={t('ui.enterPosition')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">{t('ui.status')}</Label>
              <Input 
                id="status" 
                name="status" 
                value={staffFormData.status} 
                onChange={handleStaffInputChange} 
                placeholder={t('ui.enterStatus')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStaffDialogOpen(false)}>{t('ui.cancel')}</Button>
            <Button onClick={selectedStaff ? handleEditStaff : handleAddStaff}>
              {selectedStaff ? t('ui.update') : t('ui.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Department Detail Dialog */}
      <Dialog open={isDeptDetailOpen} onOpenChange={setIsDeptDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('ui.departmentDetails')}</DialogTitle>
          </DialogHeader>
          {detailItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.departmentID')}</p>
                  <p>{detailItem.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.name')}</p>
                  <p>{detailItem.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.manager')}</p>
                  <p>{detailItem.manager}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.staffCount')}</p>
                  <p>{detailItem.staffCount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.status')}</p>
                  <p>{detailItem.status}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">{t('ui.departmentStaff')}</h3>
                <div className="mt-2 max-h-40 overflow-auto rounded-md border">
                  {staff.filter(s => s.department === detailItem.name).length > 0 ? (
                    staff.filter(s => s.department === detailItem.name).map(s => (
                      <div key={s.id} className="border-b p-2 last:border-0">
                        <p className="font-medium">{s.name}</p>
                        <p className="text-sm text-muted-foreground">{s.position}</p>
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-sm text-muted-foreground">{t('ui.noStaffInDepartment')}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDeptDetailOpen(false)}>{t('ui.close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Staff Detail Dialog */}
      <Dialog open={isStaffDetailOpen} onOpenChange={setIsStaffDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('ui.staffDetails')}</DialogTitle>
          </DialogHeader>
          {detailItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.staffID')}</p>
                  <p>{detailItem.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.name')}</p>
                  <p>{detailItem.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.department')}</p>
                  <p>{detailItem.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.position')}</p>
                  <p>{detailItem.position}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('ui.status')}</p>
                  <p>{detailItem.status}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">{t('ui.departmentInfo')}</h3>
                {departments.find(d => d.name === detailItem.department) ? (
                  <div className="mt-2 rounded-md border p-2">
                    <p>
                      <span className="font-medium">{t('ui.manager')}:</span> {departments.find(d => d.name === detailItem.department)?.manager}
                    </p>
                    <p>
                      <span className="font-medium">{t('ui.totalStaff')}:</span> {departments.find(d => d.name === detailItem.department)?.staffCount}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{t('ui.departmentNotFound')}</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsStaffDetailOpen(false)}>{t('ui.close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('ui.confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete?.type === 'department' 
                ? t('ui.confirmDeleteDepartment') 
                : t('ui.confirmDeleteStaff')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('ui.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground"
              onClick={handleDeleteConfirm}
            >
              {t('ui.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DepartmentSettings;
