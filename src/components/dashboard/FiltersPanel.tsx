
import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FiltersPanel = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-6"
    >
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="dateRange">Date Range</Label>
                <Switch id="dateFilter" />
              </div>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                <option>Today</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This month</option>
                <option>Custom range</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="warehouseFilter">Warehouse</Label>
                <Switch id="warehouseFilter" />
              </div>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                <option>All Warehouses</option>
                <option>Bangkok Warehouse</option>
                <option>Chiang Mai Warehouse</option>
                <option>Phuket Warehouse</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="categoryFilter">Category</Label>
                <Switch id="categoryFilter" />
              </div>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2">
                <option>All Categories</option>
                <option>Dog Food</option>
                <option>Cat Food</option>
                <option>Bird Food</option>
                <option>Fish Food</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" size="sm">Reset</Button>
            <Button variant="default" size="sm" className="bg-primary">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FiltersPanel;
