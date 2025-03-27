
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const VendorSettings = () => {
  const { t } = useLanguage();

  const vendors = [
    { id: 'VEND-001', name: 'Premium Pet Foods Inc.', contact: 'John Miller', location: 'Bangkok', category: 'Food Supplies', status: 'Active', lastOrder: '2023-05-12' },
    { id: 'VEND-002', name: 'PetToys Thailand', contact: 'Somchai Jaidee', location: 'Bangkok', category: 'Pet Toys', status: 'Active', lastOrder: '2023-05-15' },
    { id: 'VEND-003', name: 'Animal Health Products', contact: 'Lisa Wang', location: 'Chiang Mai', category: 'Health & Medicine', status: 'Active', lastOrder: '2023-05-10' },
    { id: 'VEND-004', name: 'Global Pet Accessories', contact: 'David Chen', location: 'Phuket', category: 'Pet Accessories', status: 'Active', lastOrder: '2023-05-08' },
    { id: 'VEND-005', name: 'Eco-Pet Supplies', contact: 'Maria Garcia', location: 'Bangkok', category: 'Eco-Friendly Products', status: 'Active', lastOrder: '2023-05-18' },
    { id: 'VEND-006', name: 'Thai Pet Bedding Co.', contact: 'Suchada Thongchai', location: 'Pattaya', category: 'Bedding & Housing', status: 'Inactive', lastOrder: '2023-04-25' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.vendor')}</h1>
        <p className="text-muted-foreground">
          Manage your suppliers and vendor relationships.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{vendors.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {vendors.filter(v => v.status === 'Active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Set(vendors.map(v => v.category)).size}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
          <CardDescription>
            Manage your suppliers and vendor relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 bg-muted/50 p-3">
              <div className="font-medium">Vendor ID</div>
              <div className="font-medium">Name</div>
              <div className="font-medium">Contact</div>
              <div className="font-medium">Location</div>
              <div className="font-medium">Category</div>
              <div className="font-medium">Last Order</div>
              <div className="text-right font-medium">Actions</div>
            </div>
            <div className="divide-y">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="grid grid-cols-7 items-center p-3">
                  <div className="font-medium">{vendor.id}</div>
                  <div>{vendor.name}</div>
                  <div>{vendor.contact}</div>
                  <div>{vendor.location}</div>
                  <div>{vendor.category}</div>
                  <div>{new Date(vendor.lastOrder).toLocaleDateString()}</div>
                  <div className="flex justify-end space-x-2">
                    <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                      Edit
                    </button>
                    <button className="rounded bg-gray-200 px-2 py-1 text-xs">
                      View Orders
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorSettings;
