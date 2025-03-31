
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Search, Filter, X, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loading } from '@/components/ui/custom/loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define interfaces
interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  permissions: Permission[];
  isActive: boolean;
}

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface Module {
  id: string;
  name: string;
  permissions: Permission[];
}

const PermissionSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  // Mock data for users
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Admin',
      department: 'IT',
      permissions: [
        { id: '1', name: 'Dashboard View', category: 'Dashboard', description: 'Can view dashboard' },
        { id: '2', name: 'Stock Management', category: 'Stock', description: 'Can manage stock levels' },
        { id: '3', name: 'User Management', category: 'Settings', description: 'Can manage users' }
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      position: 'Warehouse Staff',
      department: 'Operations',
      permissions: [
        { id: '1', name: 'Dashboard View', category: 'Dashboard', description: 'Can view dashboard' },
        { id: '4', name: 'Receiving Management', category: 'Receiving', description: 'Can manage receiving' }
      ],
      isActive: true
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      position: 'Picker',
      department: 'Warehouse',
      permissions: [
        { id: '1', name: 'Dashboard View', category: 'Dashboard', description: 'Can view dashboard' },
        { id: '5', name: 'Picking Operations', category: 'Picking', description: 'Can perform picking operations' }
      ],
      isActive: true
    },
    {
      id: '4',
      name: 'Sara Lee',
      email: 'sara.lee@example.com',
      position: 'Manager',
      department: 'Warehouse',
      permissions: [
        { id: '1', name: 'Dashboard View', category: 'Dashboard', description: 'Can view dashboard' },
        { id: '2', name: 'Stock Management', category: 'Stock', description: 'Can manage stock levels' },
        { id: '4', name: 'Receiving Management', category: 'Receiving', description: 'Can manage receiving' },
        { id: '5', name: 'Picking Operations', category: 'Picking', description: 'Can perform picking operations' }
      ],
      isActive: false
    }
  ]);
  
  // Mock data for all available modules and permissions
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      name: 'Dashboard',
      permissions: [
        { id: '1', name: 'Dashboard View', category: 'Dashboard', description: 'Can view dashboard' }
      ]
    },
    {
      id: '2',
      name: 'Stock',
      permissions: [
        { id: '2', name: 'Stock Management', category: 'Stock', description: 'Can manage stock levels' },
        { id: '7', name: 'Stock History View', category: 'Stock', description: 'Can view stock history' }
      ]
    },
    {
      id: '3',
      name: 'Receiving',
      permissions: [
        { id: '4', name: 'Receiving Management', category: 'Receiving', description: 'Can manage receiving' },
        { id: '8', name: 'Approve Receiving', category: 'Receiving', description: 'Can approve receiving orders' }
      ]
    },
    {
      id: '4',
      name: 'Picking',
      permissions: [
        { id: '5', name: 'Picking Operations', category: 'Picking', description: 'Can perform picking operations' },
        { id: '9', name: 'Request Picking', category: 'Picking', description: 'Can request picking tasks' }
      ]
    },
    {
      id: '5',
      name: 'Packing',
      permissions: [
        { id: '6', name: 'Packing Operations', category: 'Packing', description: 'Can perform packing operations' }
      ]
    },
    {
      id: '6',
      name: 'Settings',
      permissions: [
        { id: '3', name: 'User Management', category: 'Settings', description: 'Can manage users' },
        { id: '10', name: 'Permission Management', category: 'Settings', description: 'Can manage permissions' },
        { id: '11', name: 'Product Management', category: 'Settings', description: 'Can manage products' },
        { id: '12', name: 'Location Management', category: 'Settings', description: 'Can manage locations' },
        { id: '13', name: 'Department Management', category: 'Settings', description: 'Can manage departments' },
        { id: '14', name: 'Customer Management', category: 'Settings', description: 'Can manage customers' },
        { id: '15', name: 'Vendor Management', category: 'Settings', description: 'Can manage vendors' },
        { id: '16', name: 'Transaction Model Management', category: 'Settings', description: 'Can manage transaction models' },
        { id: '17', name: 'Lot Model Management', category: 'Settings', description: 'Can manage lot models' }
      ]
    }
  ]);
  
  // Form schema for adding/editing permissions
  const formSchema = z.object({
    name: z.string().min(2, { message: t('validation.nameRequired') }),
    email: z.string().email({ message: t('validation.emailValid') }),
    position: z.string().min(1, { message: t('validation.positionRequired') }),
    department: z.string().min(1, { message: t('validation.departmentRequired') }),
    isActive: z.boolean().default(true),
    permissions: z.array(z.string()).optional()
  });
  
  // Form for adding/editing user
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      position: '',
      department: '',
      isActive: true,
      permissions: []
    }
  });
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Populate form when editing a user
    if (selectedUser && isEditDialogOpen) {
      form.reset({
        name: selectedUser.name,
        email: selectedUser.email,
        position: selectedUser.position,
        department: selectedUser.department,
        isActive: selectedUser.isActive,
        permissions: selectedUser.permissions.map(p => p.id)
      });
    }
  }, [selectedUser, isEditDialogOpen, form]);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });
  
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
  };
  
  const handleAddUser = () => {
    form.reset({
      name: '',
      email: '',
      position: '',
      department: '',
      isActive: true,
      permissions: []
    });
    setIsAddDialogOpen(true);
  };
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteAlert(true);
  };
  
  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      toast({
        title: t('permission.userDeleted'),
        description: t('permission.userDeletedDesc'),
      });
    }
    setShowDeleteAlert(false);
    setUserToDelete(null);
  };
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const permissionObjects = modules
      .flatMap(m => m.permissions)
      .filter(p => data.permissions?.includes(p.id));
    
    if (isAddDialogOpen) {
      // Add new user
      const newUser: User = {
        id: (users.length + 1).toString(),
        name: data.name,
        email: data.email,
        position: data.position,
        department: data.department,
        permissions: permissionObjects,
        isActive: data.isActive
      };
      
      setUsers([...users, newUser]);
      toast({
        title: t('permission.userAdded'),
        description: t('permission.userAddedDesc'),
      });
      setIsAddDialogOpen(false);
    } else if (isEditDialogOpen && selectedUser) {
      // Update existing user
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            name: data.name,
            email: data.email,
            position: data.position,
            department: data.department,
            permissions: permissionObjects,
            isActive: data.isActive
          };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      toast({
        title: t('permission.userUpdated'),
        description: t('permission.userUpdatedDesc'),
      });
      setIsEditDialogOpen(false);
      setSelectedUser(null);
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
        <Loading text={t('common.loading')} />
      </div>
    );
  }
  
  // Check if current user is admin (this would be replaced with actual auth check)
  const isAdmin = true; // For demo, assuming user is admin
  
  if (!isAdmin) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('permission.accessDenied')}</CardTitle>
            <CardDescription>{t('permission.adminOnly')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('permission.contactAdmin')}</p>
          </CardContent>
        </Card>
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
        <h1 className="text-2xl font-bold text-gray-900">{t('settings.permission')}</h1>
        <p className="text-gray-600">{t('permission.managePermissions')}</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t('permission.userPermissions')}</CardTitle>
              <CardDescription>{t('permission.userPermissionsDesc')}</CardDescription>
            </div>
            <Button onClick={handleAddUser} className="bg-primary">
              <Plus className="mr-1 h-4 w-4" />
              {t('common.addNew')}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder={t('common.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Collapsible
                open={isFilterOpen}
                onOpenChange={setIsFilterOpen}
                className="ml-2"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Filter className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute right-0 mt-2 w-64 rounded-md border bg-white p-4 shadow-md">
                  <div className="flex justify-between">
                    <p className="font-medium">{t('common.filters')}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div>
                      <p className="mb-1 text-sm font-medium">{t('permission.position')}</p>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t('common.all')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t('common.all')}</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="staff">Warehouse Staff</SelectItem>
                          <SelectItem value="picker">Picker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium">{t('permission.department')}</p>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t('common.all')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t('common.all')}</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="warehouse">Warehouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium">{t('permission.status')}</p>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t('common.all')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t('common.all')}</SelectItem>
                          <SelectItem value="active">{t('permission.active')}</SelectItem>
                          <SelectItem value="inactive">{t('permission.inactive')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end pt-2">
                      <Button variant="outline" size="sm" className="mr-2">
                        {t('common.reset')}
                      </Button>
                      <Button size="sm" className="bg-primary">
                        {t('common.apply')}
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
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
                {filteredUsers.length === 0 ? (
                  <div className="p-3 text-center text-gray-500">
                    {t('common.noResults')}
                  </div>
                ) : (
                  filteredUsers.map((user) => (
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
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                              {t('common.viewDetails')}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {t('common.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user)}
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
          </CardContent>
        </Card>
      </motion.div>
      
      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={!!selectedUser && !isEditDialogOpen} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="sm:max-w-[600px]">
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
                      );
                      
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
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                {t('common.close')}
              </Button>
              <Button onClick={() => {
                setIsEditDialogOpen(true);
              }}>
                <Edit className="mr-2 h-4 w-4" />
                {t('common.edit')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('permission.addUser')}</DialogTitle>
            <DialogDescription>
              {t('permission.addUserDesc')}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('permission.name')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('permission.email')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('permission.position')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('permission.selectPosition')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Warehouse Staff">Warehouse Staff</SelectItem>
                          <SelectItem value="Picker">Picker</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('permission.department')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('permission.selectDepartment')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Warehouse">Warehouse</SelectItem>
                          <SelectItem value="Management">Management</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{t('permission.active')}</FormLabel>
                      <FormDescription>
                        {t('permission.activeDesc')}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <div>
                <h3 className="mb-2 text-sm font-medium">{t('permission.permissions')}</h3>
                <div className="max-h-60 space-y-3 overflow-y-auto rounded-md border p-4">
                  {modules.map((module) => (
                    <div key={module.id} className="rounded-md border p-3">
                      <h4 className="mb-2 font-medium">{module.name}</h4>
                      <div className="space-y-2">
                        {module.permissions.map((permission) => (
                          <FormField
                            key={permission.id}
                            control={form.control}
                            name="permissions"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(permission.id)}
                                    onCheckedChange={(checked) => {
                                      const currentValues = field.value || [];
                                      if (checked) {
                                        field.onChange([...currentValues, permission.id]);
                                      } else {
                                        field.onChange(
                                          currentValues.filter((value) => value !== permission.id)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-normal">
                                    {permission.name}
                                  </FormLabel>
                                  <FormDescription className="text-xs">
                                    {permission.description}
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit" className="bg-primary">
                  {t('common.save')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) setSelectedUser(null);
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('permission.editUser')}</DialogTitle>
            <DialogDescription>
              {t('permission.editUserDesc')}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('permission.name')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('permission.email')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('permission.position')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('permission.selectPosition')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Warehouse Staff">Warehouse Staff</SelectItem>
                          <SelectItem value="Picker">Picker</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('permission.department')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('permission.selectDepartment')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Warehouse">Warehouse</SelectItem>
                          <SelectItem value="Management">Management</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{t('permission.active')}</FormLabel>
                      <FormDescription>
                        {t('permission.activeDesc')}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <div>
                <h3 className="mb-2 text-sm font-medium">{t('permission.permissions')}</h3>
                <div className="max-h-60 space-y-3 overflow-y-auto rounded-md border p-4">
                  {modules.map((module) => (
                    <div key={module.id} className="rounded-md border p-3">
                      <h4 className="mb-2 font-medium">{module.name}</h4>
                      <div className="space-y-2">
                        {module.permissions.map((permission) => (
                          <FormField
                            key={permission.id}
                            control={form.control}
                            name="permissions"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(permission.id)}
                                    onCheckedChange={(checked) => {
                                      const currentValues = field.value || [];
                                      if (checked) {
                                        field.onChange([...currentValues, permission.id]);
                                      } else {
                                        field.onChange(
                                          currentValues.filter((value) => value !== permission.id)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-normal">
                                    {permission.name}
                                  </FormLabel>
                                  <FormDescription className="text-xs">
                                    {permission.description}
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedUser(null);
                }}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit" className="bg-primary">
                  {t('common.save')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('permission.confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('permission.deleteWarning')} <strong>{userToDelete?.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default PermissionSettings;
