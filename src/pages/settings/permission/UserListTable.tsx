
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
    <div className="rounded-md border">
      <div className="grid grid-cols-7 bg-muted/50 p-3">
        <div className="font-medium">{t('permission.name')}</div>
        <div className="font-medium">{t('permission.email')}</div>
        <div className="font-medium">{t('permission.position')}</div>
        <div className="font-medium">{t('permission.department')}</div>
        <div className="font-medium">{t('permission.permissions')}</div>
        <div className="font-medium">{t('permission.status')}</div>
        <div className="text-right font-medium">{t('common.actions')}</div>
      </div>
      <div className="divide-y">
        {users.length === 0 ? (
          <div className="p-3 text-center text-gray-500">
            {t('common.noResults')}
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="grid grid-cols-7 items-center p-3">
              <div className="font-medium">{user.name}</div>
              <div>{user.email}</div>
              <div>{user.position}</div>
              <div>{user.department}</div>
              <div>{user.permissions.length}</div>
              <div>
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
              </div>
              <div className="flex justify-end space-x-2">
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserListTable;
