
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PermissionNavProps {
  className?: string;
}

const PermissionNav: React.FC<PermissionNavProps> = ({ className }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/settings/permission/users', label: 'User' },
    { path: '/settings/permission/roles', label: 'Role' },
    { path: '/settings/permission/permissions', label: 'Permission' },
  ];
  
  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md",
              isActive
                ? "bg-red-50 text-red-600"
                : "text-gray-600 hover:bg-gray-100"
            )
          }
        >
          <li className="list-disc list-inside">
            {item.label}
          </li>
        </NavLink>
      ))}
    </nav>
  );
};

export default PermissionNav;
