
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Package, User, MapPin, Check, Filter, Download, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Updated mock data for pick orders to include the new required fields
const mockPickOrders = [
  {
    id: 'PO-001',
    status: 'Pending',
    waitingToProcess: 'Yes',
    requestDate: '2023-08-15',
    warehouseFrom: 'Bangkok Central',
    referenceDoc: 'REF-11235',
    requestType: 'Regular',
    notes: 'Urgent delivery needed',
    customerId: 'CUST-001',
    deliveryDate: '2023-08-20',
    warehouseTo: 'Phuket Branch',
    requester: 'Dr. Somchai',
    customer: 'Bangkok Hospital',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 200, location: 'A-01-02' },
      { sku: 'MIN-005', name: 'Calcium + D3', quantity: 100, location: 'A-02-03' }
    ],
    priority: 'High',
    requiredDate: '2023-08-15'
  },
  {
    id: 'PO-002',
    status: 'Processing',
    waitingToProcess: 'No',
    requestDate: '2023-08-16',
    warehouseFrom: 'Bangkok Central',
    referenceDoc: 'REF-11236',
    requestType: 'Rush',
    notes: 'Call before delivery',
    customerId: 'CUST-002',
    deliveryDate: '2023-08-18',
    warehouseTo: 'Chiang Mai Branch',
    requester: 'Nurse Pornpan',
    customer: 'Chiang Mai Clinic',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 50, location: 'A-01-02' },
      { sku: 'VIT-003', name: 'Vitamin B Complex', quantity: 75, location: 'A-01-05' }
    ],
    priority: 'Medium',
    requiredDate: '2023-08-18'
  },
  {
    id: 'PO-003',
    status: 'Pending',
    waitingToProcess: 'Yes',
    requestDate: '2023-08-17',
    warehouseFrom: 'Bangkok Central',
    referenceDoc: 'REF-11237',
    requestType: 'Regular',
    notes: '',
    customerId: 'CUST-003',
    deliveryDate: '2023-08-22',
    warehouseTo: 'Phuket Branch',
    requester: 'Dr. Wichai',
    customer: 'Phuket Medical Center',
    items: [
      { sku: 'MIN-005', name: 'Calcium + D3', quantity: 150, location: 'A-02-03' },
      { sku: 'PRO-002', name: 'Whey Protein', quantity: 25, location: 'B-03-01' }
    ],
    priority: 'Low',
    requiredDate: '2023-08-20'
  },
  {
    id: 'PO-004',
    status: 'Pending',
    waitingToProcess: 'Yes',
    requestDate: '2023-08-18',
    warehouseFrom: 'Bangkok Central',
    referenceDoc: 'REF-11238',
    requestType: 'Regular',
    notes: 'Handle with care',
    customerId: 'CUST-001',
    deliveryDate: '2023-08-23',
    warehouseTo: 'Bangkok Branch',
    requester: 'Dr. Somchai',
    customer: 'Bangkok Hospital',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 100, location: 'A-01-02' },
      { sku: 'PRO-002', name: 'Whey Protein', quantity: 50, location: 'B-03-01' }
    ],
    priority: 'Medium',
    requiredDate: '2023-08-22'
  },
  {
    id: 'PO-005',
    status: 'Pending',
    waitingToProcess: 'Yes',
    requestDate: '2023-08-19',
    warehouseFrom: 'Bangkok Central',
    referenceDoc: 'REF-11239',
    requestType: 'Rush',
    notes: '',
    customerId: 'CUST-004',
    deliveryDate: '2023-08-24',
    warehouseTo: 'Pattaya Branch',
    requester: 'Nurse Thana',
    customer: 'Pattaya Clinic',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 75, location: 'A-01-02' },
      { sku: 'VIT-003', name: 'Vitamin B Complex', quantity: 100, location: 'A-01-05' }
    ],
    priority: 'High',
    requiredDate: '2023-08-25'
  }
];

// Define the warehouses for dropdown
const warehouses = ['All Warehouses', 'Bangkok Central', 'Chiang Mai Distribution', 'Phuket Storage', 'Pattaya Facility'];
const zones = ['All Zones', 'Zone A', 'Zone B', 'Zone C', 'Zone D'];
const areas = ['All Areas', 'Dry Food', 'Wet Food', 'Premium Section', 'Specialty', 'Health', 'Small Pets', 'Aquatics'];
const categories = ['All Categories', 'Dog Food', 'Cat Food', 'Bird Food', 'Fish Food', 'Small Animal'];

const PickOrders = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('All Warehouses');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filterBySku, setFilterBySku] = useState('all');
  const [filterByCustomer, setFilterByCustomer] = useState('all');
  const [filterByRequester, setFilterByRequester] = useState('all');
  const [filterByLocation, setFilterByLocation] = useState('all');
  const [filterByDate, setFilterByDate] = useState<Date | undefined>(undefined);
  const [filteredOrders, setFilteredOrders] = useState(mockPickOrders);
  const [selectedPickOrders, setSelectedPickOrders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('sku');

  // Get unique values for dropdown filters
  const uniqueCustomers = [...new Set(mockPickOrders.map(order => order.customer))];
  const uniqueRequesters = [...new Set(mockPickOrders.map(order => order.requester))];
  const uniqueLocations = [...new Set(mockPickOrders.flatMap(order => 
    order.items.map(item => item.location)
  ))];
  const uniqueSkus = [...new Set(mockPickOrders.flatMap(order => 
    order.items.map(item => item.sku)
  ))];

  // Function to filter orders based on selected criteria
  const applyFilters = () => {
    let result = [...mockPickOrders];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term) ||
        order.requester.toLowerCase().includes(term) ||
        order.items.some(item => 
          item.sku.toLowerCase().includes(term) || 
          item.name.toLowerCase().includes(term)
        )
      );
    }

    // Apply warehouse filter
    if (selectedWarehouse !== 'All Warehouses') {
      result = result.filter(order => order.warehouseFrom === selectedWarehouse);
    }

    // Apply zone filter
    if (selectedZone !== 'All Zones') {
      result = result.filter(order => 
        order.items.some(item => item.location.startsWith(selectedZone.replace('Zone ', '')))
      );
    }

    // Apply area filter
    if (selectedArea !== 'All Areas') {
      result = result.filter(order => 
        order.items.some(item => item.location.includes(selectedArea))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      // This would require category data in the items, assuming it for now
      result = result.filter(order => 
        order.items.some(item => item.name.includes(selectedCategory))
      );
    }

    // Apply specific tab filters
    if (activeTab === 'sku' && filterBySku && filterBySku !== 'all') {
      result = result.filter(order => 
        order.items.some(item => item.sku.toLowerCase().includes(filterBySku.toLowerCase()))
      );
    }

    if (activeTab === 'customer' && filterByCustomer && filterByCustomer !== 'all') {
      result = result.filter(order => 
        order.customer.toLowerCase().includes(filterByCustomer.toLowerCase())
      );
    }

    if (activeTab === 'requester' && filterByRequester && filterByRequester !== 'all') {
      result = result.filter(order => 
        order.requester.toLowerCase().includes(filterByRequester.toLowerCase())
      );
    }

    if (activeTab === 'location' && filterByLocation && filterByLocation !== 'all') {
      result = result.filter(order => 
        order.items.some(item => item.location.toLowerCase().includes(filterByLocation.toLowerCase()))
      );
    }

    if (activeTab === 'date' && filterByDate) {
      const dateString = filterByDate.toISOString().split('T')[0];
      result = result.filter(order => order.requiredDate === dateString);
    }

    setFilteredOrders(result);
  };

  // Handle pick order selection
  const handleSelectPickOrder = (orderId: string) => {
    if (selectedPickOrders.includes(orderId)) {
      setSelectedPickOrders(selectedPickOrders.filter(id => id !== orderId));
    } else {
      setSelectedPickOrders([...selectedPickOrders, orderId]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedPickOrders.length === filteredOrders.length) {
      setSelectedPickOrders([]);
    } else {
      setSelectedPickOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleSearch = () => {
    applyFilters();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedWarehouse('All Warehouses');
    setSelectedZone('All Zones');
    setSelectedArea('All Areas');
    setSelectedCategory('All Categories');
    setFilterBySku('all');
    setFilterByCustomer('all');
    setFilterByRequester('all');
    setFilterByLocation('all');
    setFilterByDate(undefined);
    setFilteredOrders(mockPickOrders);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <motion.h1 
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Pick Orders Management
        </motion.h1>
        <div className="flex items-center gap-2">
          <Switch
            id="filter-toggle"
            checked={showFilters}
            onCheckedChange={setShowFilters}
          />
          <Label htmlFor="filter-toggle">Show Filters</Label>
        </div>
      </div>

      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Search by item code, name, or lot"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse} value={warehouse}>{warehouse}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {zones.map((zone) => (
                        <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-3 flex space-x-2">
                  <Button onClick={handleSearch} className="flex items-center gap-2 bg-red-700 hover:bg-red-800">
                    <Search size={18} />
                    Search
                  </Button>
                  <Button variant="outline" onClick={resetFilters} className="flex items-center gap-2">
                    <RefreshCcw size={18} />
                    Clear
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download size={18} />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Pick Orders</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSelectAll}
                className="flex items-center gap-1"
              >
                <Check size={16} />
                {selectedPickOrders.length === filteredOrders.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                disabled={selectedPickOrders.length === 0}
                className="flex items-center gap-1"
              >
                Process Selected ({selectedPickOrders.length})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead className="w-[50px]">No.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>รอจัด</TableHead>
                  <TableHead>วันที่ขอเบิก</TableHead>
                  <TableHead>ขอเบิกจากคลัง</TableHead>
                  <TableHead>เอกสารอ้างอิง</TableHead>
                  <TableHead>ประเภทขอเบิก</TableHead>
                  <TableHead>หมายเหตุ</TableHead>
                  <TableHead>รหัสลูกค้า</TableHead>
                  <TableHead>วันที่จัดส่งสินค้า</TableHead>
                  <TableHead>คลังขอเบิก</TableHead>
                  <TableHead>ขอเบิกโดยใคร</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={13} className="h-24 text-center">
                      No pick orders found matching the filter criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order, index) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedPickOrders.includes(order.id)}
                          onCheckedChange={() => handleSelectPickOrder(order.id)}
                        />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${order.status === 'Pending' ? 'bg-blue-100 text-blue-800' : 
                            order.status === 'Processing' ? 'bg-purple-100 text-purple-800' : 
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}
                        `}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.waitingToProcess}</TableCell>
                      <TableCell>{order.requestDate}</TableCell>
                      <TableCell>{order.warehouseFrom}</TableCell>
                      <TableCell>{order.referenceDoc}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${order.requestType === 'Rush' ? 'bg-red-100 text-red-800' : 
                            'bg-green-100 text-green-800'}
                        `}>
                          {order.requestType}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.notes || '-'}</TableCell>
                      <TableCell>{order.customerId}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>{order.warehouseTo}</TableCell>
                      <TableCell>{order.requester}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PickOrders;
