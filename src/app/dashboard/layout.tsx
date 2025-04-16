
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from '@/components/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const DashboardLayout: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock notification data
  const notificationsData = [
    {
      id: 1,
      title: 'Low stock alert',
      message: 'Inventory for Premium Cat Food is running low',
      time: '2 hours ago',
      read: false,
      type: 'warning' as const
    },
    {
      id: 2,
      title: 'New shipment received',
      message: 'Shipment #12345 has been successfully received',
      time: '3 hours ago',
      read: true,
      type: 'success' as const
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader 
        showFilters={showFilters} 
        toggleFilters={() => setShowFilters(!showFilters)} 
        notificationsData={notificationsData} 
      />
      <div className="flex flex-1">
        <SidebarNav>
          <Outlet />
        </SidebarNav>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
