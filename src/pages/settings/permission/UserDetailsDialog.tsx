
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Module } from './types';

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: User | null;
  modules: Module[];
  onClose: () => void;
  onEdit: () => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  open,
  onOpenChange,
  selectedUser,
  modules,
  onClose,
  onEdit
}) => {
  const { t } = useLanguage();

  if (!selectedUser) return null;

  return (
    <Dialog 
      open={open} 
      onOpenChange={(open) => {
        if (!open) onClose();
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>{selectedUser.name}</DialogTitle>
          <DialogDescription>
            {selectedUser.email} • {selectedUser.position} • {selectedUser.department}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h3 className="mb-2 text-sm font-medium">{t('permission.status')}</h3>
            {selectedUser.isActive ? (
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
          
          <div>
            <h3 className="mb-2 text-sm font-medium">{t('permission.assignedPermissions')}</h3>
            {selectedUser.permissions.length === 0 ? (
              <p className="text-sm text-gray-500">{t('permission.noPermissions')}</p>
            ) : (
              <div className="space-y-3">
                {modules.map((module) => {
                  const modulePermissions = selectedUser.permissions.filter(
                    p => module.permissions.some(mp => mp.id === p.id)
                  ) || [];
                  
                  if (modulePermissions.length === 0) return null;
                  
                  return (
                    <div key={module.id} className="rounded-md border p-3">
                      <h4 className="mb-2 font-medium">{module.name}</h4>
                      <div className="space-y-2">
                        {modulePermissions.map((permission) => (
                          <div key={permission.id} className="flex items-start">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                            <div>
                              <p className="text-sm font-medium">{permission.name}</p>
                              <p className="text-xs text-gray-500">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('common.close')}
          </Button>
          <Button onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            {t('common.edit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
