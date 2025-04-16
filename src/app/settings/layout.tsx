
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from '@/components/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const SettingsLayout: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock notification data
  const notificationsData = [
    {
      id: 1,
      title: 'System update',
      message: 'System will undergo maintenance tonight',
      time: '1 hour ago',
      read: false,
      type: 'info' as const
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

export default SettingsLayout;
