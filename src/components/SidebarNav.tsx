
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Settings,
  Menu,
  X,
  LogOut,
  Store,
  ChevronDown,
  Globe,
  DownloadCloud,
  FileHeart,
  Box
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCompany } from '@/contexts/CompanyContext';
import ThemeToggle from '@/components/ThemeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Location } from '@/utils/auth';

interface SidebarNavProps {
  children: React.ReactNode;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isWarehouseMenuOpen, setIsWarehouseMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();
  const { companyData, isLoading: isCompanyLoading } = useCompany();

  // State for selected warehouse
  const [selectedWarehouse, setSelectedWarehouse] = useState<Location | null>(null);

  // Load the selected warehouse from localStorage on component mount
  useEffect(() => {
    const storedWarehouse = localStorage.getItem('selectedWarehouse');
    if (storedWarehouse) {
      try {
        const parsedWarehouse = JSON.parse(storedWarehouse);
        setSelectedWarehouse(parsedWarehouse);
      } catch (error) {
        console.error('Error parsing stored warehouse:', error);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('selectedWarehouse');
    navigate('/login');
  };

  const mainMenuItems = [
    { path: '/dashboard', name: t('nav.dashboard'), icon: <LayoutDashboard size={20} /> },
    // { path: '/stock', name: t('nav.stock'), icon: <Package size={20} /> },
    // {
    //   path: '/stock',
    //   name: t('nav.stock'),
    //   subItems: [
    //     { path: '/stock/summary', name: t('Summary') },
    //     { path: '/stock/details', name: t('Details') },
    //   ]
    // },
    {
      id: 'stock',
      name: t('nav.stock'),
      icon: <Package size={20} />,
      hasSubmenu: true
    },
    { path: '/receiving', name: t('nav.receiving'), icon: <DownloadCloud size={20} /> },
    { path: '/request-picking', name: t('nav.requestForPicking'), icon: <FileHeart size={20} /> },
    { path: '/packing-ptw', name: t('nav.packingPTW'), icon: <Box size={20} /> },
  ];

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const settingsMenuItems = [
    // { path: '/settings/product', name: t('settings.product') },
    // { path: '/settings/location', name: t('settings.location') },
    // { path: '/settings/department', name: t('settings.department') },
    // { path: '/settings/customer', name: t('settings.customer') },
    // { path: '/settings/vendor', name: t('settings.vendor') },
    // { path: '/settings/transaction-model', name: t('settings.transactionModel') },
    // { path: '/settings/lot-model', name: t('settings.lotModel') },
    {
      path: '/settings/permission',
      name: t('settings.permission'),
      subItems: [
        { path: '/settings/permission/users', name: t('User') },
        { path: '/settings/permission/roles', name: t('Role') },
        { path: '/settings/permission/permissions', name: t('Permission') }
      ]
    },
  ];

  const changeWarehouse = () => {
    navigate('/select-warehouse');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  const [isStockMenuOpen, setIsStockMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
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

      <motion.div
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed z-40 flex h-full w-64 flex-col bg-white shadow-lg lg:static"
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center space-x-2">
            <img
              src={companyData?.logo || "/Nutrix.png"}
              alt="Company Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-lg font-bold text-primary">
              {companyData?.companyName || "Nutrix WMS"}
            </span>
          </div>
          <div className="flex items-center space-x-1">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe size={18} className="text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={toggleLanguage}>
                  {language === 'en' ? 'ภาษาไทย' : 'English'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  <div className="text-sm font-medium">{selectedWarehouse?.name || t('warehouse.select')}</div>
                  <div className="text-xs text-gray-500">{selectedWarehouse ? t('warehouse.current') : t('warehouse.none')}</div>
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
                    <div className="py-1 text-xs font-medium text-gray-500">{t('warehouse.manage')}</div>
                    <div className="space-y-1">
                      <button
                        onClick={changeWarehouse}
                        className="w-full rounded-md px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('warehouse.change')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {mainMenuItems.map((item) => (
            item.hasSubmenu ? (
              <div key={item.id}>
                <button
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${location.pathname.startsWith(`/${item.id}`) ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  onClick={() => setIsStockMenuOpen(!isStockMenuOpen)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`${location.pathname.startsWith(`/${item.id}`) ? 'text-white' : 'text-primary'}`}>
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isStockMenuOpen ? 'rotate-180' : ''} ${location.pathname.startsWith(`/${item.id}`) ? 'text-white' : 'text-gray-500'
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {isStockMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 space-y-1 pl-10 pr-2">
                        <NavLink
                          to="/stock/summary"
                          className={({ isActive }) => `
                    block rounded-md px-2 py-1.5 text-sm transition-colors
                    ${isActive ? 'bg-primary-50 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}
                  `}
                        >
                          {t('Summary')}
                        </NavLink>
                        <NavLink
                          to="/stock/details"
                          className={({ isActive }) => `
                    block rounded-md px-2 py-1.5 text-sm transition-colors
                    ${isActive ? 'bg-primary-50 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}
                  `}
                        >
                          {t('Details')}
                        </NavLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
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
            )
          ))}

          {/* Settings Menu with Submenu */}
          <div className="mt-2">
            <button
              className={`
                flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors
                ${location.pathname.startsWith('/settings') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}
              `}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <div className="flex items-center space-x-2">
                <Settings
                  size={20}
                  className={location.pathname.startsWith('/settings') ? 'text-white' : 'text-primary'}
                />
                <span>{t('nav.settings')}</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isSettingsOpen ? 'rotate-180' : ''} ${location.pathname.startsWith('/settings') ? 'text-white' : 'text-gray-500'
                  }`}
              />
            </button>

            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 space-y-1 pl-10 pr-2">
                    {settingsMenuItems.map((item) => (
                      <div key={item.path}>
                        {item.subItems ? (
                          <div className="mb-1">
                            <button
                              onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${location.pathname.startsWith(item.path)
                                ? 'bg-primary-50 text-primary font-medium'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                              <span>{item.name}</span>
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${isSubMenuOpen ? 'rotate-180' : ''
                                  }`}
                              />
                            </button>

                            <AnimatePresence>
                              {isSubMenuOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden pl-4"
                                >
                                  {item.subItems.map((subItem) => (
                                    <NavLink
                                      key={subItem.path}
                                      to={subItem.path}
                                      className={({ isActive }) => `
                    block rounded-md px-2 py-1.5 text-sm transition-colors
                    ${isActive ? 'bg-primary-50 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}
                  `}
                                    >
                                      {subItem.name}
                                    </NavLink>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <NavLink
                            to={item.path}
                            className={({ isActive }) => `
          block rounded-md px-2 py-1.5 text-sm transition-colors
          ${isActive ? 'bg-primary-50 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}
        `}
                          >
                            {item.name}
                          </NavLink>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
        <ThemeToggle />

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={20} className="text-primary" />
            <span>{t('action.signOut')}</span>
          </button>
        </div>
      </motion.div>

      <div className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gray-50 px-4 py-4 lg:px-8 lg:py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
