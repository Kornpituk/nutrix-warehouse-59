
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Key, 
  Database, 
  Save, 
  RotateCcw,
  Store,
  Users,
  Truck,
  Boxes,
  Languages,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+66 98 765 4321');
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('asia_bangkok');
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    sms: false,
    stockAlerts: true,
    shipmentUpdates: true,
    systemUpdates: true,
  });
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Check if warehouse is selected
    const selectedWarehouse = localStorage.getItem('selectedWarehouse');
    if (!selectedWarehouse) {
      navigate('/select-warehouse');
      return;
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handleSavePassword = () => {
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-lg font-medium text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your profile and application preferences</p>
      </motion.div>

      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell size={16} />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Key size={16} />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <SettingsIcon size={16} />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-12">
            <motion.div variants={itemVariants} className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Image</CardTitle>
                  <CardDescription>Update your profile picture</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="text-3xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="mt-6 flex flex-col items-center">
                    <Label
                      htmlFor="picture"
                      className="mb-2 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
                    >
                      Upload Image
                    </Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Supports JPG, PNG, GIF up to 2MB
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input 
                        id="position" 
                        defaultValue="Warehouse Manager"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="thai">Thai</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia_bangkok">Asia/Bangkok (GMT+7)</SelectItem>
                          <SelectItem value="asia_singapore">Asia/Singapore (GMT+8)</SelectItem>
                          <SelectItem value="asia_tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                          <SelectItem value="america_la">America/Los_Angeles (GMT-7)</SelectItem>
                          <SelectItem value="america_ny">America/New_York (GMT-4)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      <RotateCcw className="mr-1 h-4 w-4" />
                      Reset
                    </Button>
                    <Button onClick={handleSaveProfile} className="bg-primary">
                      <Save className="mr-1 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div variants={containerVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={itemVariants}>
                  <h3 className="mb-4 text-lg font-medium">Delivery Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={notifications.email}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, email: checked})
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="browser-notifications">Browser Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                      </div>
                      <Switch 
                        id="browser-notifications" 
                        checked={notifications.browser}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, browser: checked})
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive critical alerts via SMS</p>
                      </div>
                      <Switch 
                        id="sms-notifications" 
                        checked={notifications.sms}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, sms: checked})
                        }
                      />
                    </div>
                  </div>
                </motion.div>

                <Separator />

                <motion.div variants={itemVariants}>
                  <h3 className="mb-4 text-lg font-medium">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="stock-alerts">Stock Alerts</Label>
                        <p className="text-sm text-gray-500">Low stock and inventory alerts</p>
                      </div>
                      <Switch 
                        id="stock-alerts" 
                        checked={notifications.stockAlerts}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, stockAlerts: checked})
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="shipment-updates">Shipment Updates</Label>
                        <p className="text-sm text-gray-500">Updates on shipment status changes</p>
                      </div>
                      <Switch 
                        id="shipment-updates" 
                        checked={notifications.shipmentUpdates}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, shipmentUpdates: checked})
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="system-updates">System Updates</Label>
                        <p className="text-sm text-gray-500">Updates and maintenance notifications</p>
                      </div>
                      <Switch 
                        id="system-updates" 
                        checked={notifications.systemUpdates}
                        onCheckedChange={(checked) => 
                          setNotifications({...notifications, systemUpdates: checked})
                        }
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <RotateCcw className="mr-1 h-4 w-4" />
                    Reset
                  </Button>
                  <Button onClick={handleSaveNotifications} className="bg-primary">
                    <Save className="mr-1 h-4 w-4" />
                    Save Changes
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div variants={containerVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your password and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div variants={itemVariants}>
                  <h3 className="mb-4 text-lg font-medium">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </motion.div>

                <Separator />

                <motion.div variants={itemVariants}>
                  <h3 className="mb-4 text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                </motion.div>

                <Separator />

                <motion.div variants={itemVariants}>
                  <h3 className="mb-4 text-lg font-medium">Session Management</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-500">Bangkok, Thailand • Chrome on Windows</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Sign Out of All Other Sessions
                    </Button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <RotateCcw className="mr-1 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSavePassword} className="bg-primary">
                    <Save className="mr-1 h-4 w-4" />
                    Update Password
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Warehouse Configuration</CardTitle>
                  <CardDescription>Manage warehouse settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Store className="h-5 w-5 text-gray-500" />
                      <Label htmlFor="default-warehouse">Default Warehouse</Label>
                    </div>
                    <Select defaultValue="1">
                      <SelectTrigger id="default-warehouse">
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Bangkok Central</SelectItem>
                        <SelectItem value="2">Chiang Mai Distribution</SelectItem>
                        <SelectItem value="3">Phuket Storage</SelectItem>
                        <SelectItem value="4">Pattaya Facility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Boxes className="h-5 w-5 text-gray-500" />
                      <Label>Inventory Settings</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-reorder">Auto Reorder</Label>
                        <p className="text-sm text-gray-500">Automatically create purchase orders for low stock items</p>
                      </div>
                      <Switch id="auto-reorder" defaultChecked={true} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="low-stock">Low Stock Threshold (%)</Label>
                        <Input id="low-stock" type="number" defaultValue={15} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry-alert">Expiry Alert Days</Label>
                        <Input id="expiry-alert" type="number" defaultValue={30} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                  <CardDescription>General system settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Languages className="h-5 w-5 text-gray-500" />
                      <Label htmlFor="system-language">System Language</Label>
                    </div>
                    <Select defaultValue="en">
                      <SelectTrigger id="system-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="th">Thai</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-gray-500" />
                      <Label>Shipping Settings</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="default-carrier">Default Carrier</Label>
                        <Select defaultValue="thai_post">
                          <SelectTrigger id="default-carrier">
                            <SelectValue placeholder="Select carrier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="thai_post">Thai Post</SelectItem>
                            <SelectItem value="kerry">Kerry Express</SelectItem>
                            <SelectItem value="flash">Flash Express</SelectItem>
                            <SelectItem value="dhl">DHL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="label-format">Label Format</Label>
                        <Select defaultValue="a4">
                          <SelectTrigger id="label-format">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a4">A4</SelectItem>
                            <SelectItem value="letter">Letter</SelectItem>
                            <SelectItem value="thermal">Thermal</SelectItem>
                            <SelectItem value="label">Label</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <Label>User Management</Label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-logout">Auto Logout</Label>
                        <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                      </div>
                      <Switch id="auto-logout" defaultChecked={true} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input id="session-timeout" type="number" defaultValue={30} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                  <CardDescription>Current system status and details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 flex items-center space-x-2">
                        <Database className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">Database Status</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500"></span>
                        <span>Connected</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">Last synced: 10 minutes ago</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 flex items-center space-x-2">
                        <SettingsIcon className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">System Version</span>
                      </div>
                      <p>PetFeed WMS v1.2.5</p>
                      <p className="mt-2 text-xs text-gray-500">Released: May 10, 2023</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 flex items-center space-x-2">
                        <HelpCircle className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">Support</span>
                      </div>
                      <p className="text-primary">support@petfeedwms.com</p>
                      <p className="mt-2 text-xs text-gray-500">Available 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-2 flex justify-end">
              <Button onClick={() => {
                toast({
                  title: "Settings saved",
                  description: "Your system settings have been updated successfully.",
                });
              }} className="bg-primary">
                <Save className="mr-1 h-4 w-4" />
                Save All Settings
              </Button>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Settings;
