
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import UserProfileDialog from './UserProfileDialog';
import { User, LogOut, Globe, Settings } from 'lucide-react';

const UserMenu = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('selectedWarehouse');
    
    // Force page reload to redirect to login
    window.location.href = '/login';
  };

  const switchLanguage = () => {
    const newLanguage = language === 'en' ? 'th' : 'en';
    setLanguage(newLanguage);
    
    toast({
      title: language === 'en' ? "เปลี่ยนภาษาเป็นภาษาไทย" : "Language changed to English",
      description: language === 'en' ? "ระบบได้เปลี่ยนเป็นภาษาไทยแล้ว" : "The system has been switched to English",
    });
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={openProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>{t('profile.title')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={switchLanguage}>
              <Globe className="mr-2 h-4 w-4" />
              <span>{t('action.changeLanguage')}</span>
              <span className="ml-auto text-xs">{language === 'en' ? 'EN' : 'TH'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t('nav.settings')}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('action.signOut')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Profile Dialog */}
      <UserProfileDialog open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
};

export default UserMenu;
