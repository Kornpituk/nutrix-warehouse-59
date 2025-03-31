
import React, { useState } from 'react';
import { Search, Filter, X, Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const LotModelSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('configuration');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [configToDelete, setConfigToDelete] = useState<any>(null);

  const [lotConfigurations, setLotConfigurations] = useState([
    { id: 'LOT-CFG-1', name: 'Standard Lot', prefix: 'LOT', dateFormat: 'YYMMDD', separator: '-', sequence: 3, example: 'LOT-230512-001' },
    { id: 'LOT-CFG-2', name: 'Bulk Products', prefix: 'BLK', dateFormat: 'YYMMDD', separator: '-', sequence: 3, example: 'BLK-230512-001' },
    { id: 'LOT-CFG-3', name: 'Pet Food', prefix: 'FOOD', dateFormat: 'YYMMDD', separator: '-', sequence: 3, example: 'FOOD-230512-001' },
    { id: 'LOT-CFG-4', name: 'Accessories', prefix: 'ACC', dateFormat: 'YYMMDD', separator: '-', sequence: 3, example: 'ACC-230512-001' },
  ]);

  const [recentLots, setRecentLots] = useState([
    { lotNumber: 'LOT-230518-042', product: 'Premium Dog Food', quantity: 500, received: '2023-05-18', expiry: '2024-05-18' },
    { lotNumber: 'LOT-230517-056', product: 'Cat Litter', quantity: 200, received: '2023-05-17', expiry: '2025-05-17' },
    { lotNumber: 'FOOD-230516-023', product: 'Organic Cat Food', quantity: 300, received: '2023-05-16', expiry: '2024-02-16' },
    { lotNumber: 'BLK-230515-012', product: 'Dog Treats', quantity: 1000, received: '2023-05-15', expiry: '2024-01-15' },
    { lotNumber: 'ACC-230514-005', product: 'Cat Collars', quantity: 150, received: '2023-05-14', expiry: 'N/A' },
  ]);

  // Schema for lot configuration form
  const lotConfigSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    prefix: z.string().min(1, { message: "Prefix is required." }).max(5, { message: "Prefix must be 5 characters or less." }),
    dateFormat: z.string().min(1, { message: "Date format is required." }),
    separator: z.string().min(1, { message: "Separator is required." }),
    sequence: z.coerce.number().min(1, { message: "Sequence length must be at least 1." }).max(10, { message: "Sequence length can't exceed 10." }),
  });

  // Set up form
  const form = useForm<z.infer<typeof lotConfigSchema>>({
    resolver: zodResolver(lotConfigSchema),
    defaultValues: {
      name: '',
      prefix: '',
      dateFormat: 'YYMMDD',
      separator: '-',
      sequence: 3,
    },
  });

  // Filter lot configurations based on search query
  const filteredConfigurations = lotConfigurations.filter(config => 
    config.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    config.prefix.toLowerCase().includes(searchQuery.toLowerCase()) ||
    config.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter recent lots based on search query
  const filteredLots = recentLots.filter(lot => 
    lot.lotNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lot.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddConfiguration = () => {
    form.reset({
      name: '',
      prefix: '',
      dateFormat: 'YYMMDD',
      separator: '-',
      sequence: 3,
    });
    setIsAddDialogOpen(true);
  };

  const handleEditConfiguration = (config: any) => {
    setSelectedConfig(config);
    form.reset({
      name: config.name,
      prefix: config.prefix,
      dateFormat: config.dateFormat,
      separator: config.separator,
      sequence: config.sequence,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteConfiguration = (config: any) => {
    setConfigToDelete(config);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (configToDelete) {
      setLotConfigurations(lotConfigurations.filter(config => config.id !== configToDelete.id));
      toast({
        title: "Configuration Deleted",
        description: `The lot configuration "${configToDelete.name}" has been deleted.`,
      });
    }
    setShowDeleteAlert(false);
    setConfigToDelete(null);
  };

  const onSubmit = (data: z.infer<typeof lotConfigSchema>) => {
    const example = `${data.prefix}${data.separator}${new Date().toISOString().slice(2, 8)}${data.separator}${'0'.repeat(data.sequence)}`.replace(/0+$/, '001');
    
    if (isAddDialogOpen) {
      // Create new configuration
      const newConfig = {
        id: `LOT-CFG-${lotConfigurations.length + 1}`,
        ...data,
        example
      };
      
      setLotConfigurations([...lotConfigurations, newConfig]);
      toast({
        title: "Configuration Added",
        description: "The new lot configuration has been added successfully.",
      });
      setIsAddDialogOpen(false);
    } else if (isEditDialogOpen && selectedConfig) {
      // Update existing configuration
      const updatedConfigurations = lotConfigurations.map(config => {
        if (config.id === selectedConfig.id) {
          return {
            ...config,
            ...data,
            example
          };
        }
        return config;
      });
      
      setLotConfigurations(updatedConfigurations);
      toast({
        title: "Configuration Updated",
        description: "The lot configuration has been updated successfully.",
      });
      setIsEditDialogOpen(false);
      setSelectedConfig(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.lotModel')}</h1>
        <p className="text-muted-foreground">
          Configure lot number generation and lot tracking settings.
        </p>
      </div>

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
          <CollapsibleContent className="absolute right-0 mt-2 w-64 rounded-md border bg-white p-4 shadow-md z-10">
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
                <p className="mb-1 text-sm font-medium">Prefix</p>
                <Input placeholder="Filter by prefix" />
              </div>
              <div>
                <p className="mb-1 text-sm font-medium">Date Format</p>
                <Input placeholder="Filter by date format" />
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

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="configuration">Lot Configuration</TabsTrigger>
          <TabsTrigger value="tracking">Lot Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lot Number Configuration</CardTitle>
                <CardDescription>
                  Configure how lot numbers are generated for different product types
                </CardDescription>
              </div>
              <Button onClick={handleAddConfiguration} className="bg-primary">
                <Plus className="mr-1 h-4 w-4" />
                Add Configuration
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-3">
                  <div className="font-medium">Config ID</div>
                  <div className="font-medium">Name</div>
                  <div className="font-medium">Prefix</div>
                  <div className="font-medium">Date Format</div>
                  <div className="font-medium">Separator</div>
                  <div className="font-medium">Example</div>
                  <div className="text-right font-medium">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredConfigurations.length === 0 ? (
                    <div className="p-3 text-center text-gray-500">
                      No configurations found matching your search.
                    </div>
                  ) : (
                    filteredConfigurations.map((config) => (
                      <div key={config.id} className="grid grid-cols-7 items-center p-3">
                        <div className="font-medium">{config.id}</div>
                        <div>{config.name}</div>
                        <div>{config.prefix}</div>
                        <div>{config.dateFormat}</div>
                        <div>{config.separator}</div>
                        <div>{config.example}</div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() => handleEditConfiguration(config)}
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleDeleteConfiguration(config)}
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active Lots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">127</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Expiring Within 30 Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">15</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Lots</CardTitle>
                <CardDescription>
                  Recently created or received lot numbers
                </CardDescription>
              </div>
              <Button className="bg-primary">
                <Plus className="mr-1 h-4 w-4" />
                Add Lot
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-3">
                  <div className="font-medium">Lot Number</div>
                  <div className="font-medium">Product</div>
                  <div className="font-medium">Quantity</div>
                  <div className="font-medium">Received Date</div>
                  <div className="font-medium">Expiry Date</div>
                  <div className="text-right font-medium">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredLots.length === 0 ? (
                    <div className="p-3 text-center text-gray-500">
                      No lots found matching your search.
                    </div>
                  ) : (
                    filteredLots.map((lot) => (
                      <div key={lot.lotNumber} className="grid grid-cols-6 items-center p-3">
                        <div className="font-medium">{lot.lotNumber}</div>
                        <div>{lot.product}</div>
                        <div>{lot.quantity}</div>
                        <div>{new Date(lot.received).toLocaleDateString()}</div>
                        <div>{lot.expiry === 'N/A' ? 'N/A' : new Date(lot.expiry).toLocaleDateString()}</div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs"
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-xs"
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lot Tracking Settings</CardTitle>
              <CardDescription>
                Configure general lot tracking settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Enable FIFO Picking</label>
                    <div className="mt-1 flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" checked={true} readOnly />
                      <span className="ml-2 text-sm">First In, First Out</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Enable FEMO Picking</label>
                    <div className="mt-1 flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" checked={true} readOnly />
                      <span className="ml-2 text-sm">First Expiry, First Out</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Expiry Date Required</label>
                    <div className="mt-1 flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" checked={true} readOnly />
                      <span className="ml-2 text-sm">For perishable items</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Lot Visibility in Picking</label>
                    <div className="mt-1 flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" checked={true} readOnly />
                      <span className="ml-2 text-sm">Show lot numbers to pickers</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button className="bg-primary">
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Configuration Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Lot Configuration</DialogTitle>
            <DialogDescription>
              Create a new lot numbering configuration for a product type.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Configuration Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Standard Products" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this configuration
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prefix</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., LOT" {...field} />
                    </FormControl>
                    <FormDescription>
                      Short prefix for lot numbers (1-5 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="dateFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Format</FormLabel>
                      <FormControl>
                        <Input placeholder="YYMMDD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="separator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Separator</FormLabel>
                      <FormControl>
                        <Input placeholder="-" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sequence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sequence Digits</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary">
                  Add Configuration
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Configuration Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Lot Configuration</DialogTitle>
            <DialogDescription>
              Modify the existing lot numbering configuration.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Configuration Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Standard Products" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this configuration
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prefix</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., LOT" {...field} />
                    </FormControl>
                    <FormDescription>
                      Short prefix for lot numbers (1-5 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="dateFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Format</FormLabel>
                      <FormControl>
                        <Input placeholder="YYMMDD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="separator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Separator</FormLabel>
                      <FormControl>
                        <Input placeholder="-" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sequence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sequence Digits</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedConfig(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{configToDelete?.name}" configuration? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LotModelSettings;
