
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, EyeOff, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'warning' | 'danger' | 'success' | 'info';
}

interface DashboardHeaderProps {
  showFilters: boolean;
  toggleFilters: () => void;
  notificationsData: NotificationItem[];
}

const DashboardHeader = ({ showFilters, toggleFilters, notificationsData }: DashboardHeaderProps) => {
  const { toast } = useToast();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [unreadNotifications, setUnreadNotifications] = React.useState(
    notificationsData.filter(n => !n.read).length
  );

  const markAllAsRead = () => {
    setUnreadNotifications(0);
    toast({
      title: "Notifications Marked as Read",
      description: "All notifications have been marked as read.",
    });
  };

  return (
    <motion.div
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      className="mb-6 flex justify-between items-center"
    >
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="">Welcome back to your pet food warehouse management system</p>
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
                      className={`mb-2 rounded-md p-2 ${!notification.read ? 'bg-background' : ''}`}
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
  );
};

export default DashboardHeader;
