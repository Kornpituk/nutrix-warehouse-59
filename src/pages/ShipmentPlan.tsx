import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Filter, 
  Search, 
  RefreshCcw, 
  Download, 
  Eye, 
  Plus,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

import { Loading } from "@/components/ui/custom/loading";

const shipmentPlans = [
  {
    id: "SP-2023-001",
    customer: "Bangkok Pet Store",
    date: "2023-05-20",
    status: "Scheduled",
    items: 156,
    weight: 750,
    destination: "Bangkok, Thailand",
    trucks: 1,
    notes: "Priority delivery",
  },
  {
    id: "SP-2023-002",
    customer: "Chiang Mai Pet Supplies",
    date: "2023-05-22",
    status: "In Progress",
    items: 243,
    weight: 1200,
    destination: "Chiang Mai, Thailand",
    trucks: 2,
    notes: "Include refrigerated items",
  },
  {
    id: "SP-2023-003",
    customer: "Phuket Animal Care",
    date: "2023-05-25",
    status: "Pending",
    items: 89,
    weight: 350,
    destination: "Phuket, Thailand",
    trucks: 1,
    notes: "",
  },
  {
    id: "SP-2023-004",
    customer: "Online Distributor Co.",
    date: "2023-05-28",
    status: "Scheduled",
    items: 321,
    weight: 1500,
    destination: "Nationwide",
    trucks: 3,
    notes: "Split shipment, multiple destinations",
  },
  {
    id: "SP-2023-005",
    customer: "Pet World Supplies",
    date: "2023-05-30",
    status: "Pending",
    items: 112,
    weight: 600,
    destination: "Pattaya, Thailand",
    trucks: 1,
    notes: "Customer requested morning delivery",
  },
  {
    id: "SP-2023-006",
    customer: "Royal Pets",
    date: "2023-06-02",
    status: "Scheduled",
    items: 76,
    weight: 420,
    destination: "Hua Hin, Thailand",
    trucks: 1,
    notes: "",
  },
  {
    id: "SP-2023-007",
    customer: "Veterinary Clinic Chain",
    date: "2023-06-05",
    status: "Pending",
    items: 54,
    weight: 280,
    destination: "Bangkok, Thailand",
    trucks: 1,
    notes: "Medical supplies included",
  },
];

const truckOrders = [
  {
    id: "TO-2023-001",
    shipmentId: "SP-2023-001",
    driver: "Somchai Jaidee",
    vehicle: "TH-789-BKK",
    departureTime: "08:00",
    status: "Scheduled",
    items: 156,
  },
  {
    id: "TO-2023-002A",
    shipmentId: "SP-2023-002",
    driver: "Vichai Suwat",
    vehicle: "TH-456-BKK",
    departureTime: "07:30",
    status: "Loading",
    items: 120,
  },
  {
    id: "TO-2023-002B",
    shipmentId: "SP-2023-002",
    driver: "Ananda Chai",
    vehicle: "TH-457-BKK",
    departureTime: "08:30",
    status: "Scheduled",
    items: 123,
  },
  {
    id: "TO-2023-004A",
    shipmentId: "SP-2023-004",
    driver: "Pornthep Kamnan",
    vehicle: "TH-555-BKK",
    departureTime: "06:00",
    status: "Scheduled",
    items: 105,
  },
  {
    id: "TO-2023-004B",
    shipmentId: "SP-2023-004",
    driver: "Sakda Monkol",
    vehicle: "TH-556-BKK",
    departureTime: "06:30",
    status: "Scheduled",
    items: 107,
  },
  {
    id: "TO-2023-004C",
    shipmentId: "SP-2023-004",
    driver: "Thaksin Wong",
    vehicle: "TH-557-BKK",
    departureTime: "07:00",
    status: "Scheduled",
    items: 109,
  },
  {
    id: "TO-2023-006",
    shipmentId: "SP-2023-006",
    driver: "Prasert Thawee",
    vehicle: "TH-999-BKK",
    departureTime: "09:00",
    status: "Scheduled",
    items: 76,
  },
];

const ShipmentPlan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [filteredShipments, setFilteredShipments] = useState(shipmentPlans);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<typeof shipmentPlans[0] | null>(null);
  const [isCreateTruckOrderOpen, setIsCreateTruckOrderOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [selectedTruckOrder, setSelectedTruckOrder] = useState<typeof truckOrders[0] | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const selectedWarehouse = localStorage.getItem('selectedWarehouse');
    if (!selectedWarehouse) {
      navigate('/select-warehouse');
      return;
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    let filtered = shipmentPlans;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(shipment => 
        shipment.id.toLowerCase().includes(term) || 
        shipment.customer.toLowerCase().includes(term) ||
        shipment.destination.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== 'All') {
      filtered = filtered.filter(shipment => shipment.status === statusFilter);
    }
    
    if (dateFilter !== 'All') {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      const nextTwoWeeks = new Date();
      nextTwoWeeks.setDate(today.getDate() + 14);
      
      filtered = filtered.filter(shipment => {
        const shipmentDate = new Date(shipment.date);
        
        if (dateFilter === 'This Week') {
          return shipmentDate >= today && shipmentDate <= nextWeek;
        } else if (dateFilter === 'Next 2 Weeks') {
          return shipmentDate >= today && shipmentDate <= nextTwoWeeks;
        }
        return true;
      });
    }
    
    setFilteredShipments(filtered);
  }, [searchTerm, statusFilter, dateFilter]);

  const handleViewDetail = (shipment: typeof shipmentPlans[0]) => {
    setSelectedShipment(shipment);
    setIsDetailOpen(true);
  };

  const handleCreateTruckOrder = () => {
    if (selectedShipment) {
      setIsCreateTruckOrderOpen(true);
    }
  };

  const handlePrintTruckOrder = (truckOrder: typeof truckOrders[0]) => {
    setSelectedTruckOrder(truckOrder);
    setIsPrintDialogOpen(true);
  };

  const handleSearch = () => {
  };

  const handleClear = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setDateFilter('All');
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your shipment plans are being exported to Excel.",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Truck Order Printed",
      description: `Truck order ${selectedTruckOrder?.id} has been sent to the printer.`,
    });
    setIsPrintDialogOpen(false);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getShipmentTruckOrders = (shipmentId: string) => {
    return truckOrders.filter(order => order.shipmentId === shipmentId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
        <Loading text="Loading stock update..."  />
      </div>
      );
    }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipment Plan</h1>
          <p className="text-gray-600">Manage and track your shipment schedules</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="showFilters" className="text-sm">Show Filters</Label>
          <Switch id="showFilters" checked={showFilters} onCheckedChange={toggleFilters} />
        </div>
      </motion.div>

      {showFilters && (
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-2">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search by ID, customer, or destination"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Statuses</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Dates</SelectItem>
                      <SelectItem value="This Week">This Week</SelectItem>
                      <SelectItem value="Next 2 Weeks">Next 2 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2 lg:col-span-4">
                  <Button variant="default" onClick={handleSearch} className="flex-1 space-x-1 bg-primary">
                    <Search size={16} />
                    <span>Search</span>
                  </Button>
                  <Button variant="outline" onClick={handleClear} className="flex-1 space-x-1">
                    <RefreshCcw size={16} />
                    <span>Clear</span>
                  </Button>
                  <Button variant="outline" onClick={handleExport} className="flex-1 space-x-1">
                    <Download size={16} />
                    <span>Export</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead className="text-right">Weight (kg)</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead className="text-center">Trucks</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center">
                        No shipment plans found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredShipments.map((shipment, index) => (
                      <TableRow key={shipment.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            shipment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                            shipment.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                            shipment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            shipment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{shipment.id}</TableCell>
                        <TableCell>{shipment.customer}</TableCell>
                        <TableCell>{format(new Date(shipment.date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="text-right">{shipment.items}</TableCell>
                        <TableCell className="text-right">{shipment.weight}</TableCell>
                        <TableCell>{shipment.destination}</TableCell>
                        <TableCell className="text-center">{shipment.trucks}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetail(shipment)}
                          >
                            <Eye size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Shipment Plan Details</DialogTitle>
          </DialogHeader>
          
          {selectedShipment && (
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Shipment Details</TabsTrigger>
                <TabsTrigger value="trucks">Truck Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedShipment.id}</h3>
                      <p className="text-sm text-gray-500">{selectedShipment.customer}</p>
                    </div>
                    
                    <div className="rounded-lg bg-background p-4">
                      <div className="mb-3 flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                        <span className="font-medium">Shipment Date</span>
                      </div>
                      <p>{format(new Date(selectedShipment.date), 'MMMM dd, yyyy')}</p>
                    </div>
                    
                    <div className="rounded-lg bg-background p-4">
                      <div className="mb-3 flex items-center">
                        <Truck className="mr-2 h-5 w-5 text-gray-500" />
                        <span className="font-medium">Destination</span>
                      </div>
                      <p>{selectedShipment.destination}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg bg-background p-4">
                      <div className="mb-3 flex items-center">
                        <Badge variant="outline" className={
                          selectedShipment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          selectedShipment.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                          selectedShipment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          selectedShipment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {selectedShipment.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Items</p>
                          <p className="font-medium">{selectedShipment.items}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Weight</p>
                          <p className="font-medium">{selectedShipment.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Trucks</p>
                          <p className="font-medium">{selectedShipment.trucks}</p>
                        </div>
                      </div>
                    </div>
                    
                    {selectedShipment.notes && (
                      <div className="rounded-lg bg-background p-4">
                        <div className="mb-3 flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-gray-500" />
                          <span className="font-medium">Notes</span>
                        </div>
                        <p>{selectedShipment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg bg-background p-4 text-center">
                    <p className="text-sm text-gray-500">Created By</p>
                    <p className="font-medium">Admin User</p>
                  </div>
                  <div className="rounded-lg bg-background p-4 text-center">
                    <p className="text-sm text-gray-500">Created Date</p>
                    <p className="font-medium">May 10, 2023</p>
                  </div>
                  <div className="rounded-lg bg-background p-4 text-center">
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">May 15, 2023</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trucks">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Truck Orders</h3>
                    <Button
                      onClick={handleCreateTruckOrder}
                      size="sm"
                      className="bg-primary"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add Truck Order
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>No.</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Driver</TableHead>
                          <TableHead>Vehicle</TableHead>
                          <TableHead>Departure</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Items</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getShipmentTruckOrders(selectedShipment.id).length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                              No truck orders found for this shipment.
                            </TableCell>
                          </TableRow>
                        ) : (
                          getShipmentTruckOrders(selectedShipment.id).map((order, index) => (
                            <TableRow key={order.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.driver}</TableCell>
                              <TableCell>{order.vehicle}</TableCell>
                              <TableCell>{order.departureTime}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={
                                  order.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                  order.status === 'Loading' ? 'bg-amber-100 text-amber-800' :
                                  order.status === 'Departed' ? 'bg-green-100 text-green-800' :
                                  order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }>
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">{order.items}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handlePrintTruckOrder(order)}
                                  className="flex h-8 w-8 items-center justify-center p-0"
                                >
                                  <FileText size={14} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateTruckOrderOpen} onOpenChange={setIsCreateTruckOrderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Truck Order</DialogTitle>
            <DialogDescription>
              Add a new truck order for shipment {selectedShipment?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driver">Driver Name</Label>
                <Input id="driver" placeholder="Enter driver name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle ID</Label>
                <Input id="vehicle" placeholder="Enter vehicle ID" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departure">Departure Time</Label>
                <Input id="departure" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="items">Items Count</Label>
                <Input id="items" type="number" min="1" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Any additional information" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateTruckOrderOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Truck order created",
                  description: "The truck order has been successfully created.",
                });
                setIsCreateTruckOrderOpen(false);
              }}
              className="bg-primary"
            >
              Create Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Print Truck Order</DialogTitle>
          </DialogHeader>
          
          {selectedTruckOrder && (
            <div className="space-y-6 py-4">
              <div className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-xl font-bold">{selectedTruckOrder.id}</div>
                  <Badge variant="outline" className={
                    selectedTruckOrder.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    selectedTruckOrder.status === 'Loading' ? 'bg-amber-100 text-amber-800' :
                    selectedTruckOrder.status === 'Departed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {selectedTruckOrder.status}
                  </Badge>
                </div>
                
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Shipment ID</p>
                    <p className="font-medium">{selectedTruckOrder.shipmentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Driver</p>
                    <p className="font-medium">{selectedTruckOrder.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vehicle</p>
                    <p className="font-medium">{selectedTruckOrder.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure Time</p>
                    <p className="font-medium">{selectedTruckOrder.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Items</p>
                    <p className="font-medium">{selectedTruckOrder.items}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{shipmentPlans.find(s => s.id === selectedTruckOrder.shipmentId)?.customer}</p>
                  </div>
                </div>
                
                <div className="rounded-lg bg-background p-4">
                  <div className="mb-2 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="font-medium">Confirmation</span>
                  </div>
                  <p className="text-sm">All items have been verified and are ready for loading.</p>
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-500">
                This document will be printed with all shipment details and loading instructions.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrintDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePrint} className="bg-primary">
              <FileText className="mr-1 h-4 w-4" />
              Print Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ShipmentPlan;
