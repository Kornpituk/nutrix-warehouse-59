
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loading } from "@/components/ui/custom/loading";
import { fetchProductSummary, fetchProductExpireSummary, fetchStockMaxMinSummary } from '@/utils/dashboardApi';

// Dashboard components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FiltersPanel from '@/components/dashboard/FiltersPanel';
import OverviewTab from '@/components/dashboard/tabs/OverviewTab';
import InventoryTab from '@/components/dashboard/tabs/InventoryTab';
import ShipmentsTab from '@/components/dashboard/tabs/ShipmentsTab';
import AlertsTab from '@/components/dashboard/tabs/AlertsTab';
import MovementTab from '@/components/dashboard/tabs/MovementTab';

// Mock data for notifications
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
  
  const [apiDataLoading, setApiDataLoading] = useState(true);
  const [apiDataError, setApiDataError] = useState<string | null>(null);
  const [productSummary, setProductSummary] = useState({ categorys: 0, products: 0 });
  const [productExpireSummary, setProductExpireSummary] = useState({ categorys: 0, products: 0 });
  const [stockMaxMinSummary, setStockMaxMinSummary] = useState({
    stockMax: { categorys: 0, products: 0 },
    stockMin: { categorys: 0, products: 0 }
  });
  
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
    
    const fetchDashboardData = async () => {
      try {
        setApiDataLoading(true);
        setApiDataError(null);
        
        const [productData, expireData, stockData] = await Promise.all([
          fetchProductSummary(),
          fetchProductExpireSummary(),
          fetchStockMaxMinSummary()
        ]);
        
        setProductSummary(productData);
        setProductExpireSummary(expireData);
        setStockMaxMinSummary(stockData);
        
        setApiDataLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setApiDataError('Failed to fetch dashboard data. Please try again.');
        setApiDataLoading(false);
        toast({
          title: "Error Loading Data",
          description: "We couldn't load the latest dashboard data. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    fetchDashboardData();
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
      <DashboardHeader 
        showFilters={showFilters} 
        toggleFilters={toggleFilters} 
        notificationsData={notificationsData}
      />

      {showFilters && <FiltersPanel />}

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="movement">Movement</TabsTrigger>
        </TabsList>

        {apiDataLoading ? (
          <div className="flex justify-center p-8">
            <Loading text="Loading data from API..." />
          </div>
        ) : apiDataError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <div className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              <p>{apiDataError}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <TabsContent value="overview">
              <OverviewTab 
                productSummary={productSummary}
                productExpireSummary={productExpireSummary}
                stockMaxMinSummary={stockMaxMinSummary}
              />
            </TabsContent>

            <TabsContent value="inventory">
              <InventoryTab />
            </TabsContent>

            <TabsContent value="shipments">
              <ShipmentsTab />
            </TabsContent>

            <TabsContent value="alerts">
              <AlertsTab />
            </TabsContent>

            <TabsContent value="movement">
              <MovementTab />
            </TabsContent>
          </>
        )}
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;
