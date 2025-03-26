
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  BarChart, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Truck, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Bell,
  Eye,
  EyeOff,
  Filter,
  MapPin,
  BarChart2,
  MoveHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

// Mock data for charts
const inventoryData = [
  { name: 'Jan', value: 3500 },
  { name: 'Feb', value: 4200 },
  { name: 'Mar', value: 3800 },
  { name: 'Apr', value: 4000 },
  { name: 'May', value: 4500 },
  { name: 'Jun', value: 4800 },
  { name: 'Jul', value: 5200 },
];

const categoryData = [
  { name: 'Dog Food', value: 35 },
  { name: 'Cat Food', value: 30 },
  { name: 'Bird Food', value: 15 },
  { name: 'Fish Food', value: 10 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#AB0006', '#FF6B6B', '#FFD166', '#06D6A0', '#118AB2'];

const shipmentsData = [
  { name: 'Mon', outbound: 65, inbound: 45 },
  { name: 'Tue', outbound: 59, inbound: 40 },
  { name: 'Wed', outbound: 80, inbound: 55 },
  { name: 'Thu', outbound: 81, inbound: 60 },
  { name: 'Fri', outbound: 56, inbound: 50 },
  { name: 'Sat', outbound: 40, inbound: 30 },
  { name: 'Sun', outbound: 35, inbound: 25 },
];

// New data for warehouse movement
const warehouseMovementData = [
  { x: 10, y: 30, z: 200, name: 'Dog Food Pallet A' },
  { x: 40, y: 50, z: 150, name: 'Cat Food Pallet B' },
  { x: 70, y: 20, z: 300, name: 'Bird Food Box C' },
  { x: 30, y: 80, z: 100, name: 'Fish Food Package D' },
  { x: 50, y: 50, z: 250, name: 'Premium Pet Food E' },
  { x: 80, y: 10, z: 180, name: 'Special Diet Mix F' },
];

// New data for warehouse space utilization
const warehouseSpaceData = [
  { name: 'Zone A', used: 85, available: 15 },
  { name: 'Zone B', used: 65, available: 35 },
  { name: 'Zone C', used: 90, available: 10 },
  { name: 'Zone D', used: 45, available: 55 },
];

// New data for warehouse staff productivity
const staffProductivityData = [
  { name: 'Week 1', picking: 42, packing: 28, shipping: 18 },
  { name: 'Week 2', picking: 38, packing: 30, shipping: 20 },
  { name: 'Week 3', picking: 45, packing: 32, shipping: 25 },
  { name: 'Week 4', picking: 50, packing: 35, shipping: 30 },
];

// Mock inventory movement data
const inventoryMovementData = [
  { id: 1, product: 'Premium Dog Food', from: 'Receiving', to: 'Zone A', quantity: 120, time: '10:30 AM', status: 'Completed' },
  { id: 2, product: 'Cat Treats', from: 'Zone B', to: 'Packing', quantity: 75, time: '11:45 AM', status: 'In Progress' },
  { id: 3, product: 'Bird Seed Mix', from: 'Zone C', to: 'Zone D', quantity: 50, time: '01:15 PM', status: 'Pending' },
  { id: 4, product: 'Fish Food Flakes', from: 'Receiving', to: 'Zone B', quantity: 30, time: '02:30 PM', status: 'Scheduled' },
  { id: 5, product: 'Small Animal Bedding', from: 'Zone A', to: 'Shipping', quantity: 45, time: '03:45 PM', status: 'Completed' },
];

const lowStockItems = [
  { id: 1, name: 'Premium Dog Food', category: 'Dog Food', stock: 23, threshold: 50 },
  { id: 2, name: 'Senior Cat Formula', category: 'Cat Food', stock: 18, threshold: 30 },
  { id: 3, name: 'Grain-Free Puppy Mix', category: 'Dog Food', stock: 12, threshold: 40 },
  { id: 4, name: 'Tropical Fish Flakes', category: 'Fish Food', stock: 8, threshold: 15 },
];

const expiringItems = [
  { id: 1, name: 'Organic Cat Treats', category: 'Cat Food', expiresIn: 5 },
  { id: 2, name: 'Fresh Meat Rolls', category: 'Dog Food', expiresIn: 7 },
  { id: 3, name: 'Premium Wet Food', category: 'Cat Food', expiresIn: 10 },
  { id: 4, name: 'Special Diet Mix', category: 'Bird Food', expiresIn: 12 },
];

// New notifications data
const notificationsData = [
  { id: 1, title: 'Low Stock Alert', message: 'Premium Dog Food is below threshold', time: '30 minutes ago', read: false, type: 'warning' },
  { id: 2, title: 'Expiring Products', message: 'Organic Cat Treats expire in 5 days', time: '1 hour ago', read: false, type: 'danger' },
  { id: 3, title: 'Shipment Completed', message: 'Order #12456 has been delivered', time: '3 hours ago', read: true, type: 'success' },
  { id: 4, title: 'New Order', message: 'Order #12457 has been received', time: '5 hours ago', read: true, type: 'info' },
  { id: 5, title: 'System Update', message: 'System will be updated tonight', time: '1 day ago', read: true, type: 'info' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(
    notificationsData.filter(n => !n.read).length
  );
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Check if warehouse is selected
    const selectedWarehouse = localStorage.getItem('selectedWarehouse');
    if (!selectedWarehouse) {
      navigate('/select-warehouse');
      return;
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const markAllAsRead = () => {
    setUnreadNotifications(0);
    toast({
      title: "Notifications Marked as Read",
      description: "All notifications have been marked as read.",
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Animation variants
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
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-lg font-medium text-gray-600">Loading dashboard...</p>
        </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back to your pet food warehouse management system</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-md border border-gray-200 bg-white p-2 shadow-lg z-50">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="font-medium">Notifications</h3>
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                </div>
                <div className="max-h-96 overflow-y-auto py-2">
                  {notificationsData.length === 0 ? (
                    <p className="py-2 text-center text-sm text-gray-500">No notifications</p>
                  ) : (
                    notificationsData.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`mb-2 rounded-md p-2 ${!notification.read ? 'bg-gray-50' : ''}`}
                      >
                        <div className="flex items-start">
                          <div className={`mt-0.5 mr-2 h-2 w-2 rounded-full ${
                            notification.type === 'warning' ? 'bg-amber-500' :
                            notification.type === 'danger' ? 'bg-red-500' :
                            notification.type === 'success' ? 'bg-green-500' :
                            'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-gray-600">{notification.message}</p>
                            <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleFilters}
          >
            {showFilters ? <EyeOff size={20} /> : <Filter size={20} />}
          </Button>
        </div>
      </motion.div>

      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dateRange">Date Range</Label>
                    <Switch id="dateFilter" />
                  </div>
                  <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                    <option>Today</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>This month</option>
                    <option>Custom range</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="warehouseFilter">Warehouse</Label>
                    <Switch id="warehouseFilter" />
                  </div>
                  <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                    <option>All Warehouses</option>
                    <option>Bangkok Warehouse</option>
                    <option>Chiang Mai Warehouse</option>
                    <option>Phuket Warehouse</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="categoryFilter">Category</Label>
                    <Switch id="categoryFilter" />
                  </div>
                  <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                    <option>All Categories</option>
                    <option>Dog Food</option>
                    <option>Cat Food</option>
                    <option>Bird Food</option>
                    <option>Fish Food</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">Reset</Button>
                <Button variant="default" size="sm" className="bg-primary">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="movement">Movement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Summary Cards */}
          <motion.div variants={containerVariants} className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Inventory</p>
                      <h3 className="mt-1 text-2xl font-bold text-gray-900">5,843</h3>
                      <p className="mt-1 flex items-center text-xs font-medium text-green-600">
                        <TrendingUp size={14} className="mr-1" />
                        <span>7.2% from last month</span>
                      </p>
                    </div>
                    <div className="rounded-full bg-primary-50 p-3">
                      <Package size={20} className="text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Shipments</p>
                      <h3 className="mt-1 text-2xl font-bold text-gray-900">28</h3>
                      <p className="mt-1 flex items-center text-xs font-medium text-green-600">
                        <TrendingDown size={14} className="mr-1" />
                        <span>3.1% from last week</span>
                      </p>
                    </div>
                    <div className="rounded-full bg-primary-50 p-3">
                      <Truck size={20} className="text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Inbound Today</p>
                      <h3 className="mt-1 text-2xl font-bold text-gray-900">432</h3>
                      <p className="mt-1 flex items-center text-xs font-medium text-green-600">
                        <ArrowUpCircle size={14} className="mr-1" />
                        <span>12.5% from yesterday</span>
                      </p>
                    </div>
                    <div className="rounded-full bg-green-50 p-3">
                      <ArrowUpCircle size={20} className="text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Outbound Today</p>
                      <h3 className="mt-1 text-2xl font-bold text-gray-900">568</h3>
                      <p className="mt-1 flex items-center text-xs font-medium text-red-600">
                        <ArrowDownCircle size={14} className="mr-1" />
                        <span>8.7% from yesterday</span>
                      </p>
                    </div>
                    <div className="rounded-full bg-red-50 p-3">
                      <ArrowDownCircle size={20} className="text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Main Charts */}
          <motion.div variants={containerVariants} className="mb-6 grid gap-6 lg:grid-cols-2">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={inventoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#AB0006" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#AB0006" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#AB0006" fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* New chart - Warehouse Space Utilization */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Warehouse Space Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={warehouseSpaceData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Space']} />
                      <Legend />
                      <Bar dataKey="used" stackId="a" fill="#AB0006" name="Used Space (%)" />
                      <Bar dataKey="available" stackId="a" fill="#06D6A0" name="Available Space (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Alerts Section */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-amber-50 p-4">
                    <div className="flex items-start">
                      <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                      <div>
                        <h4 className="font-medium text-amber-800">Low Stock Alert</h4>
                        <p className="text-sm text-amber-700">4 items are below their minimum stock threshold</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-red-50 p-4">
                    <div className="flex items-start">
                      <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                      <div>
                        <h4 className="font-medium text-red-800">Expiring Products</h4>
                        <p className="text-sm text-red-700">4 products will expire within 14 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="inventory">
          <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-2">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Dog Food', value: 2350 },
                        { name: 'Cat Food', value: 1987 },
                        { name: 'Bird Food', value: 876 },
                        { name: 'Fish Food', value: 432 },
                        { name: 'Small Animal', value: 198 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#AB0006" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Premium Dog Kibble', value: 432, growth: 5.2 },
                      { name: 'Organic Cat Formula', value: 387, growth: 3.8 },
                      { name: 'Senior Pet Mix', value: 298, growth: -1.2 },
                      { name: 'Puppy Starter Pack', value: 254, growth: 7.5 },
                      { name: 'Grain-Free Diet', value: 213, growth: 2.3 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-4 h-2 w-2 rounded-full bg-primary"></div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">{item.value} units</span>
                          <span className={`flex items-center text-xs ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {item.growth >= 0 ? (
                              <TrendingUp size={12} className="mr-1" />
                            ) : (
                              <TrendingDown size={12} className="mr-1" />
                            )}
                            {Math.abs(item.growth)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Turnover</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: 'Week 1', turnover: 2.1 },
                        { name: 'Week 2', turnover: 2.3 },
                        { name: 'Week 3', turnover: 2.2 },
                        { name: 'Week 4', turnover: 2.5 },
                        { name: 'Week 5', turnover: 2.4 },
                        { name: 'Week 6', turnover: 2.7 },
                        { name: 'Week 7', turnover: 2.9 },
                        { name: 'Week 8', turnover: 3.0 },
                      ]}>
                        <defs>
                          <linearGradient id="colorTurnover" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06D6A0" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#06D6A0" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="turnover" stroke="#06D6A0" fillOpacity={1} fill="url(#colorTurnover)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* New Chart - Staff Productivity */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Staff Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={staffProductivityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="picking" stroke="#AB0006" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="packing" stroke="#FFD166" />
                        <Line type="monotone" dataKey="shipping" stroke="#06D6A0" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="shipments">
          <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-2">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Inbound vs Outbound</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={shipmentsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="inbound" fill="#06D6A0" />
                        <Bar dataKey="outbound" fill="#AB0006" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Shipments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 'SH-1234', destination: 'Bangkok Pet Store', date: 'Today, 2:30 PM', items: 156 },
                      { id: 'SH-1235', destination: 'Chiang Mai Distributor', date: 'Tomorrow, 9:00 AM', items: 243 },
                      { id: 'SH-1236', destination: 'Phuket Retailer', date: 'May 15, 11:30 AM', items: 189 },
                      { id: 'SH-1237', destination: 'Online Fulfillment', date: 'May 16, 3:00 PM', items: 321 },
                    ].map((shipment, index) => (
                      <div key={index} className="rounded-lg border border-gray-200 p-4">
                        <div className="flex justify-between">
                          <span className="font-medium text-primary">{shipment.id}</span>
                          <span className="text-sm text-gray-500">{shipment.date}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">{shipment.destination}</div>
                        <div className="mt-1 text-xs text-gray-500">{shipment.items} items</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <div className="text-3xl font-bold text-primary">98.3%</div>
                      <div className="mt-1 text-sm text-gray-600">On-Time Delivery</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <div className="text-3xl font-bold text-primary">99.7%</div>
                      <div className="mt-1 text-sm text-gray-600">Order Accuracy</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <div className="text-3xl font-bold text-primary">0.5%</div>
                      <div className="mt-1 text-sm text-gray-600">Return Rate</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <div className="text-3xl font-bold text-primary">4.2h</div>
                      <div className="mt-1 text-sm text-gray-600">Avg. Processing</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="alerts">
          <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-2">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockItems.map((item) => (
                      <div key={item.id} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-amber-700">
                              {item.stock} / {item.threshold}
                            </div>
                            <div className="text-xs text-amber-600">
                              {Math.round((item.stock / item.threshold) * 100)}% of threshold
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-amber-200">
                          <div 
                            className="h-full rounded-full bg-amber-500"
                            style={{ width: `${Math.round((item.stock / item.threshold) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Expiring Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expiringItems.map((item) => (
                      <div key={item.id} className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.category}</p>
                          </div>
                          <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                            Expires in {item.expiresIn} days
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>System Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { message: 'Inventory adjustment required for SKU-2345', time: '2 hours ago', type: 'warning' },
                      { message: 'Order #12456 successfully processed', time: '4 hours ago', type: 'success' },
                      { message: 'Batch #789 quality check completed', time: '1 day ago', type: 'info' },
                      { message: 'System maintenance scheduled for May 20, 02:00 AM', time: '2 days ago', type: 'info' },
                    ].map((notification, index) => (
                      <div 
                        key={index} 
                        className={`rounded-lg p-4 ${
                          notification.type === 'warning' ? 'bg-amber-50 border border-amber-200' :
                          notification.type === 'success' ? 'bg-green-50 border border-green-200' :
                          'bg-blue-50 border border-blue-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="text-sm">
                            <p className={`font-medium ${
                              notification.type === 'warning' ? 'text-amber-800' :
                              notification.type === 'success' ? 'text-green-800' :
                              'text-blue-800'
                            }`}>
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* New Movement Tab */}
        <TabsContent value="movement">
          <motion.div variants={containerVariants} className="grid gap-6">
            {/* Warehouse Movement Visualization */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Warehouse Item Movement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="Warehouse X-Coordinate" unit="m" />
                        <YAxis type="number" dataKey="y" name="Warehouse Y-Coordinate" unit="m" />
                        <ZAxis type="number" dataKey="z" range={[100, 500]} name="Volume" unit="units" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name, props) => {
                          if (name === 'Warehouse X-Coordinate' || name === 'Warehouse Y-Coordinate') {
                            return [`${value} m`, name];
                          }
                          if (name === 'Volume') {
                            return [`${value} units`, name];
                          }
                          return [value, name];
                        }} />
                        <Legend />
                        <Scatter name="Products" data={warehouseMovementData} fill="#AB0006" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Movement table */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Inventory Movements</CardTitle>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Live Updates</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inventoryMovementData.map((movement) => (
                          <TableRow key={movement.id}>
                            <TableCell className="font-medium">{movement.product}</TableCell>
                            <TableCell>{movement.from}</TableCell>
                            <TableCell>{movement.to}</TableCell>
                            <TableCell className="text-right">{movement.quantity}</TableCell>
                            <TableCell>{movement.time}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={
                                movement.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                movement.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                movement.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                'bg-gray-100 text-gray-800'
                              }>
                                {movement.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Movement stats */}
            <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary-50 p-3">
                        <MoveHorizontal size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Today's Movements</p>
                        <h3 className="text-2xl font-bold text-gray-900">187</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-amber-50 p-3">
                        <BarChart2 size={20} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Avg. Processing Time</p>
                        <h3 className="text-2xl font-bold text-gray-900">14.3 min</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-green-50 p-3">
                        <TrendingUp size={20} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Efficiency Rate</p>
                        <h3 className="text-2xl font-bold text-gray-900">94.7%</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-blue-50 p-3">
                        <Truck size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Active Transporters</p>
                        <h3 className="text-2xl font-bold text-gray-900">12</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;
