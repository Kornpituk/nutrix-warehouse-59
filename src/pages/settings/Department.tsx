
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const DepartmentSettings = () => {
  const { t } = useLanguage();

  const departments = [
    { id: 'DEPT-001', name: 'Warehouse Operations', manager: 'John Smith', staffCount: 15, status: 'Active' },
    { id: 'DEPT-002', name: 'Inventory Management', manager: 'Sarah Johnson', staffCount: 8, status: 'Active' },
    { id: 'DEPT-003', name: 'Shipping & Receiving', manager: 'Mike Davis', staffCount: 12, status: 'Active' },
    { id: 'DEPT-004', name: 'Quality Control', manager: 'Anna Lee', staffCount: 5, status: 'Active' },
    { id: 'DEPT-005', name: 'Maintenance', manager: 'Robert Brown', staffCount: 4, status: 'Active' },
  ];

  const staff = [
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
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.department')}</h1>
        <p className="text-muted-foreground">
          Manage your departments and staff members.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{staff.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {staff.filter(s => s.status === 'Active').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
          <CardDescription>
            Manage your warehouse departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 bg-muted/50 p-3">
              <div className="font-medium">Department ID</div>
              <div className="font-medium">Name</div>
              <div className="font-medium">Manager</div>
              <div className="font-medium">Staff Count</div>
              <div className="text-right font-medium">Actions</div>
            </div>
            <div className="divide-y">
              {departments.map((dept) => (
                <div key={dept.id} className="grid grid-cols-5 items-center p-3">
                  <div className="font-medium">{dept.id}</div>
                  <div>{dept.name}</div>
                  <div>{dept.manager}</div>
                  <div>{dept.staffCount}</div>
                  <div className="flex justify-end space-x-2">
                    <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                      Edit
                    </button>
                    <button className="rounded bg-gray-200 px-2 py-1 text-xs">
                      View Staff
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
          <CardDescription>
            Manage your warehouse staff
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 bg-muted/50 p-3">
              <div className="font-medium">Staff ID</div>
              <div className="font-medium">Name</div>
              <div className="font-medium">Department</div>
              <div className="font-medium">Position</div>
              <div className="text-right font-medium">Actions</div>
            </div>
            <div className="divide-y">
              {staff.map((member) => (
                <div key={member.id} className="grid grid-cols-5 items-center p-3">
                  <div className="font-medium">{member.id}</div>
                  <div>{member.name}</div>
                  <div>{member.department}</div>
                  <div>{member.position}</div>
                  <div className="flex justify-end space-x-2">
                    <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                      Edit
                    </button>
                    <button className="rounded bg-gray-200 px-2 py-1 text-xs">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentSettings;
