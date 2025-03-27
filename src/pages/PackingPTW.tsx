
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, ChevronDown, ChevronUp, Filter, Box, Users } from 'lucide-react';

const PackingPTW = () => {
  const { t } = useLanguage();
  const [isPackingFilterOpen, setIsPackingFilterOpen] = useState(false);
  const [isPtwFilterOpen, setIsPtwFilterOpen] = useState(false);
  const [packingSearchTerm, setPackingSearchTerm] = useState('');
  const [ptwSearchTerm, setPtwSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailType, setDetailType] = useState<'packing' | 'ptw'>('packing');

  const packingJobs = [
    { 
      id: 'PACK-2345', 
      orderRef: 'ORD-9876', 
      items: 12, 
      status: 'Ready', 
      priority: 'Normal', 
      customer: 'ABC Corp',
      assignedTo: 'John Smith',
      createdAt: '2023-05-15',
      dueDate: '2023-05-16',
      products: [
        { id: 'PROD-001', name: 'Premium Dog Food', quantity: 5, bin: 'A-101', packed: false },
        { id: 'PROD-003', name: 'Cat Toy Mouse', quantity: 7, bin: 'B-205', packed: false }
      ]
    },
    { 
      id: 'PACK-2344', 
      orderRef: 'ORD-9875', 
      items: 8, 
      status: 'In Progress', 
      priority: 'Rush', 
      customer: 'XYZ Ltd',
      assignedTo: 'Sarah Johnson',
      createdAt: '2023-05-14',
      dueDate: '2023-05-15',
      products: [
        { id: 'PROD-002', name: 'Standard Dog Food', quantity: 3, bin: 'A-102', packed: true },
        { id: 'PROD-007', name: 'Dog Collar - Large', quantity: 5, bin: 'D-405', packed: false }
      ]
    },
    { 
      id: 'PACK-2343', 
      orderRef: 'ORD-9874', 
      items: 15, 
      status: 'Complete', 
      priority: 'Normal', 
      customer: 'Acme Inc',
      assignedTo: 'Mike Brown',
      createdAt: '2023-05-13',
      dueDate: '2023-05-14',
      products: [
        { id: 'PROD-001', name: 'Premium Dog Food', quantity: 10, bin: 'A-101', packed: true },
        { id: 'PROD-006', name: 'Cat Scratching Post', quantity: 5, bin: 'D-401', packed: true }
      ]
    },
    { 
      id: 'PACK-2342', 
      orderRef: 'ORD-9873', 
      items: 5, 
      status: 'Ready', 
      priority: 'Low', 
      customer: '123 Company',
      assignedTo: 'Lisa Green',
      createdAt: '2023-05-12',
      dueDate: '2023-05-17',
      products: [
        { id: 'PROD-004', name: 'Premium Cat Food', quantity: 5, bin: 'A-203', packed: false }
      ]
    },
    { 
      id: 'PACK-2341', 
      orderRef: 'ORD-9872', 
      items: 20, 
      status: 'In Progress', 
      priority: 'Rush', 
      customer: 'Big Store',
      assignedTo: 'David Clark',
      createdAt: '2023-05-11',
      dueDate: '2023-05-12',
      products: [
        { id: 'PROD-002', name: 'Standard Dog Food', quantity: 15, bin: 'A-102', packed: true },
        { id: 'PROD-003', name: 'Cat Toy Mouse', quantity: 5, bin: 'B-205', packed: false }
      ]
    },
  ];

  const ptwTasks = [
    { 
      id: 'PTW-1234', 
      target: 'Zone A', 
      items: 45, 
      status: 'Pending', 
      assignee: 'John D.',
      createdAt: '2023-05-15',
      dueDate: '2023-05-16',
      orders: ['ORD-9870', 'ORD-9871', 'ORD-9872'],
      products: [
        { id: 'PROD-001', name: 'Premium Dog Food', quantity: 20, bin: 'A-101' },
        { id: 'PROD-002', name: 'Standard Dog Food', quantity: 25, bin: 'A-102' }
      ]
    },
    { 
      id: 'PTW-1233', 
      target: 'Zone B', 
      items: 30, 
      status: 'In Progress', 
      assignee: 'Sarah M.',
      createdAt: '2023-05-14',
      dueDate: '2023-05-15',
      orders: ['ORD-9873', 'ORD-9874'],
      products: [
        { id: 'PROD-003', name: 'Cat Toy Mouse', quantity: 15, bin: 'B-205' },
        { id: 'PROD-004', name: 'Premium Cat Food', quantity: 15, bin: 'A-203' }
      ]
    },
    { 
      id: 'PTW-1232', 
      target: 'Zone C', 
      items: 25, 
      status: 'Complete', 
      assignee: 'Alex T.',
      createdAt: '2023-05-13',
      dueDate: '2023-05-14',
      orders: ['ORD-9875'],
      products: [
        { id: 'PROD-005', name: 'Dog Bone Toy', quantity: 25, bin: 'C-305' }
      ]
    },
    { 
      id: 'PTW-1231', 
      target: 'Zone A', 
      items: 15, 
      status: 'Pending', 
      assignee: 'Lisa R.',
      createdAt: '2023-05-12',
      dueDate: '2023-05-17',
      orders: ['ORD-9876'],
      products: [
        { id: 'PROD-006', name: 'Cat Scratching Post', quantity: 15, bin: 'D-401' }
      ]
    },
    { 
      id: 'PTW-1230', 
      target: 'Zone D', 
      items: 50, 
      status: 'In Progress', 
      assignee: 'Mike P.',
      createdAt: '2023-05-11',
      dueDate: '2023-05-12',
      orders: ['ORD-9877', 'ORD-9878', 'ORD-9879'],
      products: [
        { id: 'PROD-001', name: 'Premium Dog Food', quantity: 20, bin: 'A-101' },
        { id: 'PROD-005', name: 'Dog Bone Toy', quantity: 15, bin: 'C-305' },
        { id: 'PROD-007', name: 'Dog Collar - Large', quantity: 15, bin: 'D-405' }
      ]
    },
  ];

  const togglePackingFilter = () => {
    setIsPackingFilterOpen(!isPackingFilterOpen);
  };

  const togglePtwFilter = () => {
    setIsPtwFilterOpen(!isPtwFilterOpen);
  };

  const showPackingDetail = (job: any) => {
    setSelectedJob(job);
    setDetailType('packing');
    setIsDetailOpen(true);
  };

  const showPtwDetail = (task: any) => {
    setSelectedTask(task);
    setDetailType('ptw');
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ready':
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50">{status}</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">{status}</Badge>;
      case 'Complete':
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Rush':
        return <Badge className="bg-red-500">Rush</Badge>;
      case 'Normal':
        return <Badge className="bg-blue-500">Normal</Badge>;
      case 'Low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  // Filter packing jobs based on search term
  const filteredPackingJobs = packingJobs.filter(job => 
    job.id.toLowerCase().includes(packingSearchTerm.toLowerCase()) ||
    job.orderRef.toLowerCase().includes(packingSearchTerm.toLowerCase()) ||
    job.customer.toLowerCase().includes(packingSearchTerm.toLowerCase()) ||
    job.status.toLowerCase().includes(packingSearchTerm.toLowerCase()) ||
    job.priority.toLowerCase().includes(packingSearchTerm.toLowerCase())
  );

  // Filter PTW tasks based on search term
  const filteredPtwTasks = ptwTasks.filter(task => 
    task.id.toLowerCase().includes(ptwSearchTerm.toLowerCase()) ||
    task.target.toLowerCase().includes(ptwSearchTerm.toLowerCase()) ||
    task.assignee.toLowerCase().includes(ptwSearchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(ptwSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.packingPTW')}</h1>
        <p className="text-muted-foreground">
          Manage packing operations and put-to-wall processes.
        </p>
      </div>

      <Tabs defaultValue="packing">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="packing">Packing</TabsTrigger>
          <TabsTrigger value="ptw">Put-to-Wall (PTW)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="packing" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Ready to Pack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{packingJobs.filter(j => j.status === 'Ready').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{packingJobs.filter(j => j.status === 'In Progress').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Completed Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{packingJobs.filter(j => j.status === 'Complete').length}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Packing Jobs</CardTitle>
                <CardDescription>
                  Current packing assignments and their status
                </CardDescription>
              </div>
              <Button variant="outline" onClick={togglePackingFilter} className="self-start flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
                {isPackingFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardHeader>
            
            {isPackingFilterOpen && (
              <CardContent className="pt-0 pb-3 border-b">
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID, order reference, customer, status or priority..."
                      className="pl-8"
                      value={packingSearchTerm}
                      onChange={(e) => setPackingSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            )}
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Order Ref</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPackingJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.id}</TableCell>
                      <TableCell>{job.orderRef}</TableCell>
                      <TableCell>{job.customer}</TableCell>
                      <TableCell>{getPriorityBadge(job.priority)}</TableCell>
                      <TableCell>{job.items} items</TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => showPackingDetail(job)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ptw" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pending PTW</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ptwTasks.filter(t => t.status === 'Pending').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active PTW</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ptwTasks.filter(t => t.status === 'In Progress').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Completed PTW</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ptwTasks.filter(t => t.status === 'Complete').length}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>PTW Tasks</CardTitle>
                <CardDescription>
                  Put-to-wall operations and assignments
                </CardDescription>
              </div>
              <Button variant="outline" onClick={togglePtwFilter} className="self-start flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
                {isPtwFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardHeader>
            
            {isPtwFilterOpen && (
              <CardContent className="pt-0 pb-3 border-b">
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID, target zone, assignee or status..."
                      className="pl-8"
                      value={ptwSearchTerm}
                      onChange={(e) => setPtwSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            )}
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPtwTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.target}</TableCell>
                      <TableCell>{task.items} items</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => showPtwDetail(task)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {detailType === 'packing' ? 
                <>Packing Job: {selectedJob?.id}</> : 
                <>PTW Task: {selectedTask?.id}</>
              }
            </DialogTitle>
            <DialogDescription>
              {detailType === 'packing' ? 
                'Detailed information about the packing job' : 
                'Detailed information about the put-to-wall task'
              }
            </DialogDescription>
          </DialogHeader>
          
          {detailType === 'packing' && selectedJob && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Order Reference</h3>
                  <p>{selectedJob.orderRef}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
                  <p>{selectedJob.customer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
                  <p>{getPriorityBadge(selectedJob.priority)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <p>{getStatusBadge(selectedJob.status)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                  <p>{selectedJob.assignedTo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                  <p>{new Date(selectedJob.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Items to Pack</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Bin Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedJob.products.map((product: any) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.bin}</TableCell>
                        <TableCell>
                          {product.packed ? 
                            <Badge className="bg-green-500">Packed</Badge> :
                            <Badge className="bg-yellow-500">Pending</Badge>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                <Button>
                  <Box className="mr-2 h-4 w-4" />
                  {selectedJob.status === 'Complete' ? 'View Completion Report' : 'Start Packing'}
                </Button>
              </div>
            </div>
          )}

          {detailType === 'ptw' && selectedTask && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Target Zone</h3>
                  <p>{selectedTask.target}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Items</h3>
                  <p>{selectedTask.items}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Assignee</h3>
                  <p>{selectedTask.assignee}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <p>{getStatusBadge(selectedTask.status)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                  <p>{new Date(selectedTask.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                  <p>{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Orders Included</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.orders.map((order: string) => (
                    <Badge key={order} variant="outline">{order}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Products to Process</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Bin Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTask.products.map((product: any) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.bin}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  {selectedTask.status === 'Complete' ? 'View Completion Report' : 'Start PTW Task'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackingPTW;
