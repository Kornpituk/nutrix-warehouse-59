
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  Store, 
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarNavProps {
  children: React.ReactNode;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isWarehouseMenuOpen, setIsWarehouseMenuOpen] = useState(false);
  
  const selectedWarehouse = localStorage.getItem('selectedWarehouse') || '1';
  const warehouseName = selectedWarehouse === '1' ? 'Bangkok Central' : 
                        selectedWarehouse === '2' ? 'Chiang Mai Distribution' : 
                        selectedWarehouse === '3' ? 'Phuket Storage' : 
                        'Pattaya Facility';

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('selectedWarehouse');
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/stock', name: 'Stock Update', icon: <Package size={20} /> },
    { path: '/shipment', name: 'Shipment Plan', icon: <Truck size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  const warehouses = [
    { id: '1', name: 'Bangkok Central' },
    { id: '2', name: 'Chiang Mai Distribution' },
    { id: '3', name: 'Phuket Storage' },
    { id: '4', name: 'Pattaya Facility' },
  ];

  const changeWarehouse = (warehouseId: string) => {
    localStorage.setItem('selectedWarehouse', warehouseId);
    window.location.reload(); // In a real app, you might use a more elegant state management solution
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar Toggle Button */}
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full border-gray-200 bg-white shadow-md hover:bg-gray-50"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed z-40 flex h-full w-64 flex-col bg-white shadow-lg lg:static"
      >
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center space-x-2">
            <img src="/Nutrix.png" alt="Nutrix Logo" className="h-8 w-auto object-contain" />
            <span className="text-lg font-bold text-primary">Nutrix</span>
          </div>
        </div>

        <div className="px-4 py-3">
          <div 
            className="relative mb-4 cursor-pointer rounded-lg border border-gray-200 p-3 shadow-sm transition-all hover:bg-gray-50"
            onClick={() => setIsWarehouseMenuOpen(!isWarehouseMenuOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Store size={18} className="text-primary" />
                <div>
                  <div className="text-sm font-medium">{warehouseName}</div>
                  <div className="text-xs text-gray-500">Current Warehouse</div>
                </div>
              </div>
              <ChevronDown 
                size={16} 
                className={`text-gray-500 transition-transform duration-200 ${isWarehouseMenuOpen ? 'rotate-180' : ''}`} 
              />
            </div>
            
            <AnimatePresence>
              {isWarehouseMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="border-t border-gray-200 pt-2">
                    <div className="py-1 text-xs font-medium text-gray-500">Select Warehouse</div>
                    <div className="space-y-1">
                      {warehouses.map((warehouse) => (
                        <button
                          key={warehouse.id}
                          onClick={() => changeWarehouse(warehouse.id)}
                          className={`w-full rounded-md px-2 py-1.5 text-left text-sm ${
                            selectedWarehouse === warehouse.id 
                              ? 'bg-primary-50 text-primary' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {warehouse.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors
                ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}
              `}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsOpen(false);
                }
              }}
            >
              <div className={`${location.pathname === item.path ? 'text-white' : 'text-primary'}`}>
                {item.icon}
              </div>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={20} className="text-primary" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gray-50 px-4 py-4 lg:px-8 lg:py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
