
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Users, Shield, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PermissionNavProps {
  className?: string;
}

const PermissionNav: React.FC<PermissionNavProps> = ({ className }) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    { 
      path: '/settings/permission/users', 
      label: t('permission.users', 'Users'), 
      icon: <Users size={18} />
    },
    { 
      path: '/settings/permission/roles', 
      label: t('permission.roles', 'Roles'), 
      icon: <Shield size={18} />
    },
    { 
      path: '/settings/permission/permissions', 
      label: t('permission.permissions', 'Permissions'), 
      icon: <Lock size={18} />
    },
  ];
  
  return (
    <nav className={cn("flex flex-col space-y-1 border rounded-md p-2 bg-white", className)}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md gap-2",
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            )
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default PermissionNav;
