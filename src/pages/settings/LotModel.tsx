
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const LotModelSettings = () => {
  const { t } = useLanguage();

  const lotConfigurations = [
    { id: 'LOT-CFG-1', name: 'Standard Lot', prefix: 'LOT', dateFormat: 'YYMMDD', separator: '-', sequence: 3, example: 'LOT-230512-001' },
    { id: 'LOT-CFG-2', name: 'Bulk Products', prefix: 'BLK', dateFormat: 'YYMMDD', separator: '-', sequence: 3, example: 'BLK-230512-001' },
    { id: 'LOT-CFG-3', name: 'Pet Food', prefix: 'FOOD', dateFormat: 'YYMMDD', separator: '-', sequence: 3, example: 'FOOD-230512-001' },
    { id: 'LOT-CFG-4', name: 'Accessories', prefix: 'ACC', dateFormat: 'YYMMDD', separator: '-', sequence: 3, example: 'ACC-230512-001' },
  ];

  const recentLots = [
    { lotNumber: 'LOT-230518-042', product: 'Premium Dog Food', quantity: 500, received: '2023-05-18', expiry: '2024-05-18' },
    { lotNumber: 'LOT-230517-056', product: 'Cat Litter', quantity: 200, received: '2023-05-17', expiry: '2025-05-17' },
    { lotNumber: 'FOOD-230516-023', product: 'Organic Cat Food', quantity: 300, received: '2023-05-16', expiry: '2024-02-16' },
    { lotNumber: 'BLK-230515-012', product: 'Dog Treats', quantity: 1000, received: '2023-05-15', expiry: '2024-01-15' },
    { lotNumber: 'ACC-230514-005', product: 'Cat Collars', quantity: 150, received: '2023-05-14', expiry: 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.lotModel')}</h1>
        <p className="text-muted-foreground">
          Configure lot number generation and lot tracking settings.
        </p>
      </div>

      <Tabs defaultValue="configuration">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="configuration">Lot Configuration</TabsTrigger>
          <TabsTrigger value="tracking">Lot Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lot Number Configuration</CardTitle>
              <CardDescription>
                Configure how lot numbers are generated for different product types
              </CardDescription>
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
                  {lotConfigurations.map((config) => (
                    <div key={config.id} className="grid grid-cols-7 items-center p-3">
                      <div className="font-medium">{config.id}</div>
                      <div>{config.name}</div>
                      <div>{config.prefix}</div>
                      <div>{config.dateFormat}</div>
                      <div>{config.separator}</div>
                      <div>{config.example}</div>
                      <div className="flex justify-end space-x-2">
                        <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="rounded bg-primary px-3 py-2 text-sm text-white">
                  Add Configuration
                </button>
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
            <CardHeader>
              <CardTitle>Recent Lots</CardTitle>
              <CardDescription>
                Recently created or received lot numbers
              </CardDescription>
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
                  {recentLots.map((lot) => (
                    <div key={lot.lotNumber} className="grid grid-cols-6 items-center p-3">
                      <div className="font-medium">{lot.lotNumber}</div>
                      <div>{lot.product}</div>
                      <div>{lot.quantity}</div>
                      <div>{new Date(lot.received).toLocaleDateString()}</div>
                      <div>{lot.expiry === 'N/A' ? 'N/A' : new Date(lot.expiry).toLocaleDateString()}</div>
                      <div className="flex justify-end space-x-2">
                        <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
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
                  <button className="rounded bg-primary px-3 py-2 text-sm text-white">
                    Save Settings
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LotModelSettings;
