
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from './types';

interface UserListTableProps {
  users: User[];
  onViewUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const UserListTable: React.FC<UserListTableProps> = ({
  users,
  onViewUser,
  onEditUser,
  onDeleteUser
}) => {
  const { t } = useLanguage();

  return (
    
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="p-3 text-left font-medium whitespace-nowrap">{t('permission.name')}</th>
            <th className="p-3 text-left font-medium whitespace-nowrap">{t('permission.email')}</th>
            <th className="p-3 text-left font-medium whitespace-nowrap">{t('permission.position')}</th>
            <th className="p-3 text-left font-medium whitespace-nowrap">{t('permission.department')}</th>
            <th className="p-3 text-left font-medium whitespace-nowrap">{t('permission.permissions')}</th>
            <th className="p-3 text-left font-medium whitespace-nowrap">{t('permission.status')}</th>
            <th className="p-3 text-right font-medium whitespace-nowrap">{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-3 text-center text-gray-500">
                {t('common.noResults')}
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td className="p-3 font-medium truncate max-w-[200px]">{user.name}</td>
                <td className="p-3 truncate max-w-[200px]">{user.email}</td>
                <td className="p-3 truncate max-w-[150px]">{user.position}</td>
                <td className="p-3 truncate max-w-[150px]">{user.department}</td>
                <td className="p-3">{user.permissions.length}</td>
                <td className="p-3 whitespace-nowrap">
                  {user.isActive ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {t('permission.active')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      <XCircle className="mr-1 h-3 w-3" />
                      {t('permission.inactive')}
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {t('common.actions')}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem onClick={() => onViewUser(user)}>
                        {t('common.viewDetails')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditUser(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        {t('common.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDeleteUser(user)}
                        className="text-red-600 focus:bg-red-50 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t('common.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserListTable;
