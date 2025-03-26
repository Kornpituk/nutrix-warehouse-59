
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Package, User, MapPin, Check, Filter, FileText, Clock, Building, Warehouse, FileBarChart, MessageSquare, Users, Truck } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockPickOrders = [
  {
    id: 'PO-001',
    no: '001',
    customer: 'Bangkok Hospital',
    customerCode: 'BKH-001',
    requester: 'Dr. Somchai',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 200, location: 'A-01-02' },
      { sku: 'MIN-005', name: 'Calcium + D3', quantity: 100, location: 'A-02-03' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-15',
    deliveryDate: '2023-08-18',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12345',
    requestType: 'Regular',
    notes: 'Urgent delivery needed',
    priority: 'High',
    destinationWarehouse: 'Bangkok Branch'
  },
  {
    id: 'PO-002',
    no: '002',
    customer: 'Chiang Mai Clinic',
    customerCode: 'CMC-002',
    requester: 'Nurse Pornpan',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 50, location: 'A-01-02' },
      { sku: 'VIT-003', name: 'Vitamin B Complex', quantity: 75, location: 'A-01-05' }
    ],
    status: 'Processing',
    pendingItems: 1,
    requestDate: '2023-08-16',
    deliveryDate: '2023-08-20',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12346',
    requestType: 'Expedited',
    notes: 'Call before delivery',
    priority: 'Medium',
    destinationWarehouse: 'Chiang Mai Branch'
  },
  {
    id: 'PO-003',
    no: '003',
    customer: 'Phuket Medical Center',
    customerCode: 'PMC-003',
    requester: 'Dr. Wichai',
    items: [
      { sku: 'MIN-005', name: 'Calcium + D3', quantity: 150, location: 'A-02-03' },
      { sku: 'PRO-002', name: 'Whey Protein', quantity: 25, location: 'B-03-01' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-17',
    deliveryDate: '2023-08-22',
    sourceWarehouse: 'Secondary Warehouse',
    referenceDoc: 'REF-12347',
    requestType: 'Regular',
    notes: '',
    priority: 'Low',
    destinationWarehouse: 'Phuket Branch'
  },
  {
    id: 'PO-004',
    no: '004',
    customer: 'Bangkok Hospital',
    customerCode: 'BKH-001',
    requester: 'Dr. Somchai',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 100, location: 'A-01-02' },
      { sku: 'PRO-002', name: 'Whey Protein', quantity: 50, location: 'B-03-01' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-18',
    deliveryDate: '2023-08-25',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12348',
    requestType: 'Regular',
    notes: 'Fragile items',
    priority: 'Medium',
    destinationWarehouse: 'Bangkok Branch'
  },
  {
    id: 'PO-005',
    no: '005',
    customer: 'Pattaya Clinic',
    customerCode: 'PTC-005',
    requester: 'Nurse Thana',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 75, location: 'A-01-02' },
      { sku: 'VIT-003', name: 'Vitamin B Complex', quantity: 100, location: 'A-01-05' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-19',
    deliveryDate: '2023-08-26',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12349',
    requestType: 'Expedited',
    notes: 'Weekend delivery required',
    priority: 'High',
    destinationWarehouse: 'Pattaya Branch'
  },
  {
    id: 'PO-006',
    no: '006',
    customer: 'Khon Kaen Hospital',
    customerCode: 'KKH-006',
    requester: 'Dr. Pimchanok',
    items: [
      { sku: 'MIN-005', name: 'Calcium + D3', quantity: 120, location: 'A-02-03' },
      { sku: 'VIT-004', name: 'Vitamin D3 5000IU', quantity: 60, location: 'A-01-06' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-20',
    deliveryDate: '2023-08-27',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12350',
    requestType: 'Regular',
    notes: 'Deliver to Pharmacy department',
    priority: 'Medium',
    destinationWarehouse: 'Khon Kaen Branch'
  },
  {
    id: 'PO-007',
    no: '007',
    customer: 'Samui Medical',
    customerCode: 'SMM-007',
    requester: 'Nurse Ratana',
    items: [
      { sku: 'PRO-002', name: 'Whey Protein', quantity: 40, location: 'B-03-01' },
      { sku: 'PRO-003', name: 'Plant Protein', quantity: 35, location: 'B-03-02' }
    ],
    status: 'Processing',
    pendingItems: 1,
    requestDate: '2023-08-21',
    deliveryDate: '2023-08-28',
    sourceWarehouse: 'Secondary Warehouse',
    referenceDoc: 'REF-12351',
    requestType: 'Expedited',
    notes: 'Island delivery - use ferry service',
    priority: 'High',
    destinationWarehouse: 'Samui Branch'
  },
  {
    id: 'PO-008',
    no: '008',
    customer: 'Hua Hin Wellness',
    customerCode: 'HHW-008',
    requester: 'Dr. Chai',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 90, location: 'A-01-02' },
      { sku: 'VIT-005', name: 'Multivitamin Complex', quantity: 45, location: 'A-01-07' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-22',
    deliveryDate: '2023-08-29',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12352',
    requestType: 'Regular',
    notes: '',
    priority: 'Low',
    destinationWarehouse: 'Hua Hin Branch'
  },
  {
    id: 'PO-009',
    no: '009',
    customer: 'Chiang Rai Hospital',
    customerCode: 'CRH-009',
    requester: 'Dr. Sarawut',
    items: [
      { sku: 'MIN-006', name: 'Zinc Picolinate', quantity: 80, location: 'A-02-04' },
      { sku: 'MIN-007', name: 'Magnesium Glycinate', quantity: 70, location: 'A-02-05' }
    ],
    status: 'Completed',
    pendingItems: 0,
    requestDate: '2023-08-23',
    deliveryDate: '2023-08-30',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12353',
    requestType: 'Regular',
    notes: 'Signature required',
    priority: 'Medium',
    destinationWarehouse: 'Chiang Rai Branch'
  },
  {
    id: 'PO-010',
    no: '010',
    customer: 'Bangkok Hospital',
    customerCode: 'BKH-001',
    requester: 'Dr. Somchai',
    items: [
      { sku: 'VIT-003', name: 'Vitamin B Complex', quantity: 110, location: 'A-01-05' },
      { sku: 'VIT-005', name: 'Multivitamin Complex', quantity: 55, location: 'A-01-07' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-24',
    deliveryDate: '2023-08-31',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12354',
    requestType: 'Regular',
    notes: 'Monthly order',
    priority: 'Medium',
    destinationWarehouse: 'Bangkok Branch'
  },
  {
    id: 'PO-011',
    no: '011',
    customer: 'Pattaya Clinic',
    customerCode: 'PTC-005',
    requester: 'Nurse Thana',
    items: [
      { sku: 'PRO-002', name: 'Whey Protein', quantity: 30, location: 'B-03-01' },
      { sku: 'PRO-004', name: 'Collagen Peptides', quantity: 25, location: 'B-03-03' }
    ],
    status: 'Processing',
    pendingItems: 1,
    requestDate: '2023-08-25',
    deliveryDate: '2023-09-01',
    sourceWarehouse: 'Secondary Warehouse',
    referenceDoc: 'REF-12355',
    requestType: 'Expedited',
    notes: 'Customer pickup available',
    priority: 'High',
    destinationWarehouse: 'Pattaya Branch'
  },
  {
    id: 'PO-012',
    no: '012',
    customer: 'Udon Thani Medical',
    customerCode: 'UTM-012',
    requester: 'Dr. Prasert',
    items: [
      { sku: 'MIN-005', name: 'Calcium + D3', quantity: 95, location: 'A-02-03' },
      { sku: 'MIN-007', name: 'Magnesium Glycinate', quantity: 85, location: 'A-02-05' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-26',
    deliveryDate: '2023-09-02',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12356',
    requestType: 'Regular',
    notes: '',
    priority: 'Low',
    destinationWarehouse: 'Udon Thani Branch'
  },
  {
    id: 'PO-013',
    no: '013',
    customer: 'Chiang Mai Clinic',
    customerCode: 'CMC-002',
    requester: 'Nurse Pornpan',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 65, location: 'A-01-02' },
      { sku: 'VIT-004', name: 'Vitamin D3 5000IU', quantity: 40, location: 'A-01-06' }
    ],
    status: 'Completed',
    pendingItems: 0,
    requestDate: '2023-08-27',
    deliveryDate: '2023-09-03',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12357',
    requestType: 'Regular',
    notes: 'Followed up by phone',
    priority: 'Medium',
    destinationWarehouse: 'Chiang Mai Branch'
  },
  {
    id: 'PO-014',
    no: '014',
    customer: 'Phuket Medical Center',
    customerCode: 'PMC-003',
    requester: 'Dr. Wichai',
    items: [
      { sku: 'PRO-003', name: 'Plant Protein', quantity: 50, location: 'B-03-02' },
      { sku: 'PRO-004', name: 'Collagen Peptides', quantity: 45, location: 'B-03-03' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-28',
    deliveryDate: '2023-09-04',
    sourceWarehouse: 'Secondary Warehouse',
    referenceDoc: 'REF-12358',
    requestType: 'Expedited',
    notes: 'Rush order',
    priority: 'High',
    destinationWarehouse: 'Phuket Branch'
  },
  {
    id: 'PO-015',
    no: '015',
    customer: 'Khon Kaen Hospital',
    customerCode: 'KKH-006',
    requester: 'Dr. Pimchanok',
    items: [
      { sku: 'VIT-005', name: 'Multivitamin Complex', quantity: 60, location: 'A-01-07' },
      { sku: 'VIT-006', name: 'Vitamin E 400IU', quantity: 30, location: 'A-01-08' }
    ],
    status: 'Processing',
    pendingItems: 1,
    requestDate: '2023-08-29',
    deliveryDate: '2023-09-05',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12359',
    requestType: 'Regular',
    notes: 'Partial delivery accepted',
    priority: 'Medium',
    destinationWarehouse: 'Khon Kaen Branch'
  },
  {
    id: 'PO-016',
    no: '016',
    customer: 'Bangkok Hospital',
    customerCode: 'BKH-001',
    requester: 'Dr. Somchai',
    items: [
      { sku: 'MIN-006', name: 'Zinc Picolinate', quantity: 70, location: 'A-02-04' },
      { sku: 'MIN-008', name: 'Iron Bisglycinate', quantity: 60, location: 'A-02-06' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-08-30',
    deliveryDate: '2023-09-06',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12360',
    requestType: 'Regular',
    notes: 'Quarterly stock update',
    priority: 'Low',
    destinationWarehouse: 'Bangkok Branch'
  },
  {
    id: 'PO-017',
    no: '017',
    customer: 'Hua Hin Wellness',
    customerCode: 'HHW-008',
    requester: 'Dr. Chai',
    items: [
      { sku: 'PRO-002', name: 'Whey Protein', quantity: 55, location: 'B-03-01' },
      { sku: 'PRO-005', name: 'Protein Bars', quantity: 100, location: 'B-03-04' }
    ],
    status: 'Completed',
    pendingItems: 0,
    requestDate: '2023-08-31',
    deliveryDate: '2023-09-07',
    sourceWarehouse: 'Secondary Warehouse',
    referenceDoc: 'REF-12361',
    requestType: 'Expedited',
    notes: 'Prepaid order',
    priority: 'High',
    destinationWarehouse: 'Hua Hin Branch'
  },
  {
    id: 'PO-018',
    no: '018',
    customer: 'Samui Medical',
    customerCode: 'SMM-007',
    requester: 'Nurse Ratana',
    items: [
      { sku: 'VIT-001', name: 'Vitamin C 1000mg', quantity: 85, location: 'A-01-02' },
      { sku: 'VIT-007', name: 'Vitamin K2 MK-7', quantity: 40, location: 'A-01-09' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-09-01',
    deliveryDate: '2023-09-08',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12362',
    requestType: 'Regular',
    notes: 'Confirm delivery date beforehand',
    priority: 'Medium',
    destinationWarehouse: 'Samui Branch'
  },
  {
    id: 'PO-019',
    no: '019',
    customer: 'Chiang Rai Hospital',
    customerCode: 'CRH-009',
    requester: 'Dr. Sarawut',
    items: [
      { sku: 'PRO-003', name: 'Plant Protein', quantity: 45, location: 'B-03-02' },
      { sku: 'PRO-006', name: 'Protein Shake Ready-mix', quantity: 60, location: 'B-03-05' }
    ],
    status: 'Processing',
    pendingItems: 1,
    requestDate: '2023-09-02',
    deliveryDate: '2023-09-09',
    sourceWarehouse: 'Secondary Warehouse',
    referenceDoc: 'REF-12363',
    requestType: 'Expedited',
    notes: 'Special handling required',
    priority: 'High',
    destinationWarehouse: 'Chiang Rai Branch'
  },
  {
    id: 'PO-020',
    no: '020',
    customer: 'Udon Thani Medical',
    customerCode: 'UTM-012',
    requester: 'Dr. Prasert',
    items: [
      { sku: 'VIT-005', name: 'Multivitamin Complex', quantity: 75, location: 'A-01-07' },
      { sku: 'VIT-008', name: 'Vitamin A 10000IU', quantity: 35, location: 'A-01-10' }
    ],
    status: 'Pending',
    pendingItems: 2,
    requestDate: '2023-09-03',
    deliveryDate: '2023-09-10',
    sourceWarehouse: 'Main Warehouse',
    referenceDoc: 'REF-12364',
    requestType: 'Regular',
    notes: 'New branch delivery',
    priority: 'Medium',
    destinationWarehouse: 'Udon Thani Branch'
  }
];

const PickOrders = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [filterBySku, setFilterBySku] = useState('');
  const [filterByCustomer, setFilterByCustomer] = useState('');
  const [filterByRequester, setFilterByRequester] = useState('');
  const [filterByLocation, setFilterByLocation] = useState('');
  const [filterByDate, setFilterByDate] = useState<Date | undefined>(undefined);
  const [filteredOrders, setFilteredOrders] = useState(mockPickOrders);
  const [selectedPickOrders, setSelectedPickOrders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('sku');

  const uniqueCustomers = [...new Set(mockPickOrders.map(order => order.customer))];
  const uniqueRequesters = [...new Set(mockPickOrders.map(order => order.requester))];
  const uniqueLocations = [...new Set(mockPickOrders.flatMap(order => 
    order.items.map(item => item.location)
  ))];
  const uniqueSkus = [...new Set(mockPickOrders.flatMap(order => 
    order.items.map(item => item.sku)
  ))];

  const applyFilters = () => {
    let result = [...mockPickOrders];

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
      result = result.filter(order => order.requestDate === dateString);
    }

    setFilteredOrders(result);
  };

  const handleSelectPickOrder = (orderId: string) => {
    if (selectedPickOrders.includes(orderId)) {
      setSelectedPickOrders(selectedPickOrders.filter(id => id !== orderId));
    } else {
      setSelectedPickOrders([...selectedPickOrders, orderId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPickOrders.length === filteredOrders.length) {
      setSelectedPickOrders([]);
    } else {
      setSelectedPickOrders(filteredOrders.map(order => order.id));
    }
  };

  const resetFilters = () => {
    if (activeTab === 'sku') setFilterBySku('all');
    if (activeTab === 'customer') setFilterByCustomer('all');
    if (activeTab === 'requester') setFilterByRequester('all');
    if (activeTab === 'location') setFilterByLocation('all');
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
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter size={18} />
                Filter Pick Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="sku" className="flex items-center gap-1">
                    <Package size={16} />
                    <span>By SKU</span>
                  </TabsTrigger>
                  <TabsTrigger value="customer" className="flex items-center gap-1">
                    <User size={16} />
                    <span>By Customer</span>
                  </TabsTrigger>
                  <TabsTrigger value="requester" className="flex items-center gap-1">
                    <User size={16} />
                    <span>By Requester</span>
                  </TabsTrigger>
                  <TabsTrigger value="location" className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>By Location</span>
                  </TabsTrigger>
                  <TabsTrigger value="date" className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>By Date</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sku" className="mt-4">
                  <div className="flex gap-2">
                    <div className="w-full">
                      <Select 
                        value={filterBySku} 
                        onValueChange={setFilterBySku}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select SKU" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All SKUs</SelectItem>
                          {uniqueSkus.map(sku => (
                            <SelectItem key={sku} value={sku}>{sku}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={applyFilters}>Apply</Button>
                    <Button variant="outline" onClick={resetFilters}>Reset</Button>
                  </div>
                </TabsContent>

                <TabsContent value="customer" className="mt-4">
                  <div className="flex gap-2">
                    <div className="w-full">
                      <Select 
                        value={filterByCustomer} 
                        onValueChange={setFilterByCustomer}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Customer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Customers</SelectItem>
                          {uniqueCustomers.map(customer => (
                            <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={applyFilters}>Apply</Button>
                    <Button variant="outline" onClick={resetFilters}>Reset</Button>
                  </div>
                </TabsContent>

                <TabsContent value="requester" className="mt-4">
                  <div className="flex gap-2">
                    <div className="w-full">
                      <Select 
                        value={filterByRequester} 
                        onValueChange={setFilterByRequester}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Requester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Requesters</SelectItem>
                          {uniqueRequesters.map(requester => (
                            <SelectItem key={requester} value={requester}>{requester}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={applyFilters}>Apply</Button>
                    <Button variant="outline" onClick={resetFilters}>Reset</Button>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="mt-4">
                  <div className="flex gap-2">
                    <div className="w-full">
                      <Select 
                        value={filterByLocation} 
                        onValueChange={setFilterByLocation}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          {uniqueLocations.map(location => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={applyFilters}>Apply</Button>
                    <Button variant="outline" onClick={resetFilters}>Reset</Button>
                  </div>
                </TabsContent>

                <TabsContent value="date" className="mt-4">
                  <div className="flex gap-2">
                    <div className="w-full">
                      <DatePicker 
                        selected={filterByDate}
                        onSelect={setFilterByDate}
                        placeholder="Select required date"
                      />
                    </div>
                    <Button onClick={applyFilters}>Apply</Button>
                    <Button variant="outline" onClick={resetFilters}>Reset</Button>
                  </div>
                </TabsContent>
              </Tabs>
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
          <div className="rounded-md border overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left font-medium text-muted-foreground">
                  <th className="px-3 py-3 w-[50px]">Select</th>
                  <th className="px-3 py-3">No.</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">รอจัด</th>
                  <th className="px-3 py-3">วันที่ขอเบิก</th>
                  <th className="px-3 py-3">ขอเบิกจากคลัง</th>
                  <th className="px-3 py-3">เอกสารอ้างอิง</th>
                  <th className="px-3 py-3">ประเภทขอเบิก</th>
                  <th className="px-3 py-3">หมายเหตุ</th>
                  <th className="px-3 py-3">รหัสลูกค้า</th>
                  <th className="px-3 py-3">วันที่จัดส่งสินค้า</th>
                  <th className="px-3 py-3">คลังขอเบิก</th>
                  <th className="px-3 py-3">ขอเบิกโดยใคร</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-3 py-3">
                      <Checkbox 
                        checked={selectedPickOrders.includes(order.id)}
                        onCheckedChange={() => handleSelectPickOrder(order.id)}
                      />
                    </td>
                    <td className="px-3 py-3 font-medium">{order.no}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${order.status === 'Pending' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'Processing' ? 'bg-purple-100 text-purple-800' : 
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">{order.pendingItems}</td>
                    <td className="px-3 py-3">{order.requestDate}</td>
                    <td className="px-3 py-3">{order.sourceWarehouse}</td>
                    <td className="px-3 py-3">{order.referenceDoc}</td>
                    <td className="px-3 py-3">{order.requestType}</td>
                    <td className="px-3 py-3">{order.notes}</td>
                    <td className="px-3 py-3">{order.customerCode}</td>
                    <td className="px-3 py-3">{order.deliveryDate}</td>
                    <td className="px-3 py-3">{order.destinationWarehouse}</td>
                    <td className="px-3 py-3">{order.requester}</td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={13} className="px-3 py-8 text-center text-muted-foreground">
                      No pick orders found matching the filter criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PickOrders;
