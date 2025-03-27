
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
import { User, LogOut, Globe, Settings, Bell, UserCog } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const UserMenu = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // User profile form data
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    jobTitle: 'Warehouse Manager',
    phone: '+66 12-345-6789',
    department: 'Warehouse Operations'
  });
  
  // User preferences
  const [preferences, setPreferences] = useState({
    darkMode: false,
    compactMode: false,
    receiveEmails: true,
    language: language
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    stockAlerts: true,
    orderUpdates: true,
    shipmentNotifications: true,
    systemAlerts: true,
    dailyReports: false,
    weeklyReports: true
  });

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('selectedWarehouse');
    
    // Force page reload to redirect to login
    window.location.href = '/login';
  };

  const switchLanguage = () => {
    const newLanguage = language === 'en' ? 'th' : 'en';
    setLanguage(newLanguage);
    setPreferences({...preferences, language: newLanguage});
    
    toast({
      title: language === 'en' ? "เปลี่ยนภาษาเป็นภาษาไทย" : "Language changed to English",
      description: language === 'en' ? "ระบบได้เปลี่ยนเป็นภาษาไทยแล้ว" : "The system has been switched to English",
    });
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };
  
  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };
  
  const openNotifications = () => {
    setIsNotificationsOpen(true);
  };
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  
  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean | string) => {
    setPreferences({ ...preferences, [key]: value });
    
    if (key === 'language' && typeof value === 'string') {
      if (value === 'en' || value === 'th') {
        setLanguage(value);
      }
    }
  };
  
  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
  };
  
  const saveProfile = () => {
    // In a real app, you would save to the backend here
    toast({
      title: t('profile.profileUpdated'),
      description: t('profile.profileUpdateSuccess'),
    });
    setIsProfileOpen(false);
  };
  
  const savePreferences = () => {
    // In a real app, you would save to the backend here
    toast({
      title: t('profile.preferencesUpdated'),
      description: t('profile.preferencesUpdateSuccess'),
    });
    setIsPreferencesOpen(false);
  };
  
  const saveNotifications = () => {
    // In a real app, you would save to the backend here
    toast({
      title: t('profile.notificationsUpdated'),
      description: t('profile.notificationsUpdateSuccess'),
    });
    setIsNotificationsOpen(false);
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
              <p className="text-sm font-medium leading-none">{profileData.fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">{profileData.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={openProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>{t('profile.title')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openPreferences}>
              <UserCog className="mr-2 h-4 w-4" />
              <span>{t('profile.preferences')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openNotifications}>
              <Bell className="mr-2 h-4 w-4" />
              <span>{t('profile.notifications')}</span>
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

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('profile.editProfile')}</DialogTitle>
            <DialogDescription>
              {t('profile.updateProfileInfo')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="mx-auto mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">{t('profile.fullName')}</Label>
              <Input
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleProfileChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">{t('profile.email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jobTitle" className="text-right">{t('profile.jobTitle')}</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={profileData.jobTitle}
                onChange={handleProfileChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">{t('profile.phone')}</Label>
              <Input
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">{t('profile.department')}</Label>
              <Input
                id="department"
                name="department"
                value={profileData.department}
                onChange={handleProfileChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsProfileOpen(false)}>
              {t('ui.cancel')}
            </Button>
            <Button type="button" onClick={saveProfile}>
              {t('ui.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Preferences Dialog */}
      <Dialog open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('profile.preferences')}</DialogTitle>
            <DialogDescription>
              {t('profile.customizeExperience')}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Tabs defaultValue="appearance">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="appearance">{t('profile.appearance')}</TabsTrigger>
                <TabsTrigger value="account">{t('profile.account')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="appearance" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('profile.darkMode')}</p>
                    <p className="text-sm text-muted-foreground">{t('profile.darkModeDesc')}</p>
                  </div>
                  <Switch
                    checked={preferences.darkMode}
                    onCheckedChange={value => handlePreferenceChange('darkMode', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('profile.compactMode')}</p>
                    <p className="text-sm text-muted-foreground">{t('profile.compactModeDesc')}</p>
                  </div>
                  <Switch
                    checked={preferences.compactMode}
                    onCheckedChange={value => handlePreferenceChange('compactMode', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('profile.language')}</p>
                    <p className="text-sm text-muted-foreground">{t('profile.selectLanguage')}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={preferences.language === 'en' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handlePreferenceChange('language', 'en')}
                    >
                      EN
                    </Button>
                    <Button 
                      variant={preferences.language === 'th' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handlePreferenceChange('language', 'th')}
                    >
                      TH
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="account" className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('profile.receiveEmails')}</p>
                    <p className="text-sm text-muted-foreground">{t('profile.receiveEmailsDesc')}</p>
                  </div>
                  <Switch
                    checked={preferences.receiveEmails}
                    onCheckedChange={value => handlePreferenceChange('receiveEmails', value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsPreferencesOpen(false)}>
              {t('ui.cancel')}
            </Button>
            <Button type="button" onClick={savePreferences}>
              {t('ui.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Notifications Dialog */}
      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('profile.notifications')}</DialogTitle>
            <DialogDescription>
              {t('profile.manageNotifications')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('profile.stockAlerts')}</p>
                <p className="text-sm text-muted-foreground">{t('profile.stockAlertsDesc')}</p>
              </div>
              <Switch
                checked={notifications.stockAlerts}
                onCheckedChange={value => handleNotificationChange('stockAlerts', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('profile.orderUpdates')}</p>
                <p className="text-sm text-muted-foreground">{t('profile.orderUpdatesDesc')}</p>
              </div>
              <Switch
                checked={notifications.orderUpdates}
                onCheckedChange={value => handleNotificationChange('orderUpdates', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('profile.shipmentNotifications')}</p>
                <p className="text-sm text-muted-foreground">{t('profile.shipmentNotificationsDesc')}</p>
              </div>
              <Switch
                checked={notifications.shipmentNotifications}
                onCheckedChange={value => handleNotificationChange('shipmentNotifications', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('profile.systemAlerts')}</p>
                <p className="text-sm text-muted-foreground">{t('profile.systemAlertsDesc')}</p>
              </div>
              <Switch
                checked={notifications.systemAlerts}
                onCheckedChange={value => handleNotificationChange('systemAlerts', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('profile.dailyReports')}</p>
                <p className="text-sm text-muted-foreground">{t('profile.dailyReportsDesc')}</p>
              </div>
              <Switch
                checked={notifications.dailyReports}
                onCheckedChange={value => handleNotificationChange('dailyReports', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('profile.weeklyReports')}</p>
                <p className="text-sm text-muted-foreground">{t('profile.weeklyReportsDesc')}</p>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={value => handleNotificationChange('weeklyReports', value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsNotificationsOpen(false)}>
              {t('ui.cancel')}
            </Button>
            <Button type="button" onClick={saveNotifications}>
              {t('ui.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* This dialog is used by UserProfileDialog (internal component) */}
      <UserProfileDialog open={false} onOpenChange={setIsProfileOpen} />
    </>
  );
};

export default UserMenu;
