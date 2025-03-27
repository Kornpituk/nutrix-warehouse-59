
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, ChevronDown, ChevronUp, Filter } from 'lucide-react';

const RequestPicking = () => {
  const { t } = useLanguage();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const requests = [
    { 
      id: 'REQ-7845', 
      items: 23, 
      priority: 'High', 
      department: 'Shipping', 
      status: 'Pending',
      requestedBy: 'John Doe',
      requestedDate: '2023-05-15',
      dueDate: '2023-05-17',
      products: [
        { id: 'PROD-001', name: 'Premium Dog Food', quantity: 15, location: 'A-101' },
        { id: 'PROD-003', name: 'Cat Toy Mouse', quantity: 8, location: 'B-205' }
      ]
    },
    { 
      id: 'REQ-7844', 
      items: 12, 
      priority: 'Medium', 
      department: 'Production', 
      status: 'Processing',
      requestedBy: 'Sarah Johnson',
      requestedDate: '2023-05-14',
      dueDate: '2023-05-16',
      products: [
        { id: 'PROD-002', name: 'Standard Dog Food', quantity: 10, location: 'A-102' },
        { id: 'PROD-004', name: 'Premium Cat Food', quantity: 2, location: 'A-203' }
      ]
    },
    { 
      id: 'REQ-7843', 
      items: 8, 
      priority: 'Low', 
      department: 'Returns', 
      status: 'Complete',
      requestedBy: 'Mike Brown',
      requestedDate: '2023-05-13',
      dueDate: '2023-05-15',
      products: [
        { id: 'PROD-005', name: 'Dog Bone Toy', quantity: 8, location: 'C-305' }
      ]
    },
    { 
      id: 'REQ-7842', 
      items: 15, 
      priority: 'High', 
      department: 'Shipping', 
      status: 'Pending',
      requestedBy: 'Lisa Green',
      requestedDate: '2023-05-12',
      dueDate: '2023-05-14',
      products: [
        { id: 'PROD-006', name: 'Cat Scratching Post', quantity: 5, location: 'D-401' },
        { id: 'PROD-007', name: 'Dog Collar - Large', quantity: 10, location: 'D-405' }
      ]
    },
    { 
      id: 'REQ-7841', 
      items: 5, 
      priority: 'Medium', 
      department: 'Sales', 
      status: 'Processing',
      requestedBy: 'Robert Taylor',
      requestedDate: '2023-05-11',
      dueDate: '2023-05-13',
      products: [
        { id: 'PROD-001', name: 'Premium Dog Food', quantity: 5, location: 'A-101' }
      ]
    },
    { 
      id: 'REQ-7840', 
      items: 18, 
      priority: 'High', 
      department: 'Production', 
      status: 'Pending',
      requestedBy: 'Emma Wilson',
      requestedDate: '2023-05-10',
      dueDate: '2023-05-12',
      products: [
        { id: 'PROD-003', name: 'Cat Toy Mouse', quantity: 8, location: 'B-205' },
        { id: 'PROD-005', name: 'Dog Bone Toy', quantity: 10, location: 'C-305' }
      ]
    },
    { 
      id: 'REQ-7839', 
      items: 10, 
      priority: 'Low', 
      department: 'Returns', 
      status: 'Complete',
      requestedBy: 'David Clark',
      requestedDate: '2023-05-09',
      dueDate: '2023-05-11',
      products: [
        { id: 'PROD-002', name: 'Standard Dog Food', quantity: 10, location: 'A-102' }
      ]
    },
  ];

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const showDetail = (request: any) => {
    setSelectedRequest(request);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50">Pending</Badge>;
      case 'Processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">Processing</Badge>;
      case 'Complete':
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">Complete</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-500">High</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  // Filter requests based on search term
  const filteredRequests = requests.filter(request => 
    request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.priority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.requestForPicking')}</h1>
        <p className="text-muted-foreground">
          Manage and process picking requests from various departments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>All Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.filter(r => r.status === 'Pending').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.filter(r => r.status === 'Processing').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.filter(r => r.status === 'Complete').length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Picking Requests</CardTitle>
            <CardDescription>
              Manage your active picking requests
            </CardDescription>
          </div>
          <Button variant="outline" onClick={toggleFilter} className="self-start flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
            {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        
        {isFilterOpen && (
          <CardContent className="pt-0 pb-3 border-b">
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, department, priority or status..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        )}
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{request.items} items</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => showDetail(request)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Request Details: {selectedRequest?.id}</DialogTitle>
            <DialogDescription>
              Detailed information about the picking request
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                  <p>{selectedRequest.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
                  <p>{getPriorityBadge(selectedRequest.priority)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <p>{getStatusBadge(selectedRequest.status)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Items</h3>
                  <p>{selectedRequest.items}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Requested By</h3>
                  <p>{selectedRequest.requestedBy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Requested Date</h3>
                  <p>{new Date(selectedRequest.requestedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                  <p>{new Date(selectedRequest.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Items to Pick</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedRequest.products.map((product: any) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                <Button>Process Request</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestPicking;
