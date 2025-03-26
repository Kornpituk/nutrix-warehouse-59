
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
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck, ArrowUpCircle, ArrowDownCircle, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

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

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
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
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back to your pet food warehouse management system</p>
      </motion.div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
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
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;
