
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const CustomerSettings = () => {
  const { t } = useLanguage();

  const customers = [
    { id: 'CUST-001', name: 'Pet Smart', contact: 'Sarah Johnson', location: 'Bangkok', type: 'Retail', status: 'Active', orders: 156 },
    { id: 'CUST-002', name: 'Thai Pet Supplies', contact: 'Chai Somchai', location: 'Chiang Mai', type: 'Wholesale', status: 'Active', orders: 89 },
    { id: 'CUST-003', name: 'Pet City', contact: 'Piyawan Lee', location: 'Phuket', type: 'Retail', status: 'Active', orders: 104 },
    { id: 'CUST-004', name: 'PetVet Clinic', contact: 'Dr. Siriporn', location: 'Bangkok', type: 'Retail', status: 'Active', orders: 42 },
    { id: 'CUST-005', name: 'Global Pet Distributors', contact: 'Mark Wilson', location: 'Pattaya', type: 'Wholesale', status: 'Active', orders: 212 },
    { id: 'CUST-006', name: 'Happy Pets', contact: 'Natcha Brown', location: 'Bangkok', type: 'Retail', status: 'Inactive', orders: 35 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.customer')}</h1>
        <p className="text-muted-foreground">
          Manage your customer accounts and order preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {customers.filter(c => c.status === 'Active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Retail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {customers.filter(c => c.type === 'Retail').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Wholesale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {customers.filter(c => c.type === 'Wholesale').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            Manage your customers and their accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 bg-muted/50 p-3">
              <div className="font-medium">Customer ID</div>
              <div className="font-medium">Name</div>
              <div className="font-medium">Contact</div>
              <div className="font-medium">Location</div>
              <div className="font-medium">Type</div>
              <div className="font-medium">Orders</div>
              <div className="text-right font-medium">Actions</div>
            </div>
            <div className="divide-y">
              {customers.map((customer) => (
                <div key={customer.id} className="grid grid-cols-7 items-center p-3">
                  <div className="font-medium">{customer.id}</div>
                  <div>{customer.name}</div>
                  <div>{customer.contact}</div>
                  <div>{customer.location}</div>
                  <div>{customer.type}</div>
                  <div>{customer.orders}</div>
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

export default CustomerSettings;
