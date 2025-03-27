
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductSettings = () => {
  const { t } = useLanguage();
  
  const products = [
    { id: 'PROD-001', name: 'Premium Dog Food', sku: 'DF-PREM-25', category: 'Dog Food', stock: 125 },
    { id: 'PROD-002', name: 'Standard Dog Food', sku: 'DF-STD-25', category: 'Dog Food', stock: 324 },
    { id: 'PROD-003', name: 'Cat Toy Mouse', sku: 'CT-MOUSE-01', category: 'Cat Toys', stock: 76 },
    { id: 'PROD-004', name: 'Premium Cat Food', sku: 'CF-PREM-10', category: 'Cat Food', stock: 108 },
    { id: 'PROD-005', name: 'Dog Bone Toy', sku: 'DT-BONE-01', category: 'Dog Toys', stock: 54 },
    { id: 'PROD-006', name: 'Cat Scratching Post', sku: 'CS-POST-01', category: 'Cat Accessories', stock: 32 },
    { id: 'PROD-007', name: 'Dog Collar - Large', sku: 'DC-LRG-01', category: 'Dog Accessories', stock: 48 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.product')}</h1>
        <p className="text-muted-foreground">
          Manage your product catalog and inventory settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Set(products.map(p => p.category)).size}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>
            View and manage your product inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 bg-muted/50 p-3">
              <div className="font-medium">Product ID</div>
              <div className="font-medium">Name</div>
              <div className="font-medium">SKU</div>
              <div className="font-medium">Category</div>
              <div className="font-medium">Stock</div>
              <div className="text-right font-medium">Actions</div>
            </div>
            <div className="divide-y">
              {products.map((product) => (
                <div key={product.id} className="grid grid-cols-6 items-center p-3">
                  <div className="font-medium">{product.id}</div>
                  <div>{product.name}</div>
                  <div>{product.sku}</div>
                  <div>{product.category}</div>
                  <div>{product.stock}</div>
                  <div className="flex justify-end space-x-2">
                    <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                      Edit
                    </button>
                    <button className="rounded bg-gray-200 px-2 py-1 text-xs">
                      View
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

export default ProductSettings;
