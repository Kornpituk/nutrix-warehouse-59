
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from './types';

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  open,
  onOpenChange,
  user
}) => {
  const { t } = useLanguage();

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>{t('permission.userDetails')}</DialogTitle>
          <DialogDescription>
            {t('permission.userDetailsDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">{t('permission.name')}</span>
            <span className="text-base">{user.name}</span>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">{t('permission.email')}</span>
            <span className="text-base">{user.email}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">{t('permission.position')}</span>
              <span className="text-base">{user.position}</span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-500">{t('permission.department')}</span>
              <span className="text-base">{user.department}</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">{t('permission.status')}</span>
            <Badge variant={user.isActive ? "default" : "destructive"} className="w-fit">
              {user.isActive ? t('permission.active') : t('permission.inactive')}
            </Badge>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">{t('permission.isAdmin')}</span>
            <Badge variant={user.isAdmin ? "default" : "outline"} className="w-fit">
              {user.isAdmin ? t('permission.yes') : t('permission.no')}
            </Badge>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">{t('permission.permissions')}</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.permissions.map(permission => (
                <Badge key={permission.id} variant="outline" className="bg-gray-100">
                  {permission.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
