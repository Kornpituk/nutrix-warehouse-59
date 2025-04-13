
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Edit } from 'lucide-react';
import { User } from '../types';

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onEditUser?: (user: User) => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  open,
  onOpenChange,
  user,
  onEditUser
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!user) return null;

  const handleEdit = () => {
    if (onEditUser) {
      onEditUser(user);
    } else {
      navigate(`/settings/permission/users/edit/${user.id}`);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex justify-between items-center w-full">
            <DialogTitle className="text-xl font-bold">{t('permission.userDetails')}</DialogTitle>
            <Button 
              onClick={handleEdit}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <Edit className="mr-2 h-4 w-4" /> Edit User
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 border-2 border-gray-200">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="text-2xl bg-gray-100 text-gray-600">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <div className="text-sm text-gray-500">First Name</div>
                <div className="font-medium">{user.firstName}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Last Name</div>
                <div className="font-medium">{user.lastName}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
              
              <div className="col-span-2 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-gray-500">Username</div>
                  <div className="font-medium">{user.userName}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Password</div>
                  <div className="font-medium">••••</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Role</div>
                <div className="font-medium">{user.role}</div>
              </div>
              
              <div className="col-span-2 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-gray-500">Department</div>
                  <div className="font-medium">{user.department}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Position</div>
                  <div className="font-medium">{user.position}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Created</div>
                <div className="font-medium text-sm">{user.created}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Last Update</div>
                <div className="font-medium text-sm">{user.updated}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
