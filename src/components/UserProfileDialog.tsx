
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Mail, Phone, Building, Bell, Settings, Check } from 'lucide-react';

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ open, onOpenChange }) => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+66 123 456 789',
    department: 'Warehouse Management',
    role: 'Warehouse Manager',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemNotifications: true,
    stockAlerts: true,
    pickingAssignments: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const toggleNotification = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings],
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved",
    });
  };

  const switchLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
    toast({
      title: language === 'en' ? "เปลี่ยนภาษาเป็นภาษาไทย" : "Language changed to English",
      description: language === 'en' ? "ระบบได้เปลี่ยนเป็นภาษาไทยแล้ว" : "The system has been switched to English",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t('profile.title')}</DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="profile">{t('profile.editProfile')}</TabsTrigger>
            <TabsTrigger value="preferences">{t('profile.preferences')}</TabsTrigger>
            <TabsTrigger value="notifications">{t('profile.notifications')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      className="pl-8" 
                      value={userData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      className="pl-8" 
                      value={userData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      name="email" 
                      className="pl-8" 
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      name="phone" 
                      className="pl-8" 
                      value={userData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <Building className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="department" 
                      name="department" 
                      className="pl-8" 
                      value={userData.department}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="relative">
                    <Settings className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="role" 
                      name="role" 
                      className="pl-8" 
                      value={userData.role}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Language</CardTitle>
                <CardDescription>
                  Choose your preferred language for the application interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Current Language</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'English' : 'Thai (ภาษาไทย)'}
                    </p>
                  </div>
                  <Button onClick={switchLanguage}>
                    Switch to {language === 'en' ? 'Thai' : 'English'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose between light or dark mode
                    </p>
                  </div>
                  <Button variant="outline">
                    Light Mode
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Display more content on screen
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important events
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications} 
                    onCheckedChange={() => toggleNotification('emailNotifications')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-sm">System Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive in-app notifications
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.systemNotifications} 
                    onCheckedChange={() => toggleNotification('systemNotifications')}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
                <CardDescription>
                  Choose which alerts you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when stock levels are low
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.stockAlerts} 
                    onCheckedChange={() => toggleNotification('stockAlerts')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Picking Assignments</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you're assigned to a picking task
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.pickingAssignments} 
                    onCheckedChange={() => toggleNotification('pickingAssignments')}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  <Check className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
