
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

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

const lowStockItems = [
  { id: 1, name: 'Premium Dog Food', category: 'Dog Food', stock: 23, threshold: 50 },
  { id: 2, name: 'Senior Cat Formula', category: 'Cat Food', stock: 18, threshold: 30 },
  { id: 3, name: 'Grain-Free Puppy Mix', category: 'Dog Food', stock: 12, threshold: 40 },
  { id: 4, name: 'Tropical Fish Flakes', category: 'Fish Food', stock: 8, threshold: 15 },
];

const expiringItems = [
  { id: 1, name: 'Organic Cat Treats', category: 'Cat Food', expiresIn: 5 },
  { id: 2, name: 'Fresh Meat Rolls', category: 'Dog Food', expiresIn: 7 },
  { id: 3, name: 'Premium Wet Food', category: 'Cat Food', expiresIn: 10 },
  { id: 4, name: 'Special Diet Mix', category: 'Bird Food', expiresIn: 12 },
];

const AlertsTab = () => {
  return (
    <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-2">
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-amber-700">
                        {item.stock} / {item.threshold}
                      </div>
                      <div className="text-xs text-amber-600">
                        {Math.round((item.stock / item.threshold) * 100)}% of threshold
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-amber-200">
                    <div 
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${Math.round((item.stock / item.threshold) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringItems.map((item) => (
                <div key={item.id} className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                      Expires in {item.expiresIn} days
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { message: 'Inventory adjustment required for SKU-2345', time: '2 hours ago', type: 'warning' },
                { message: 'Order #12456 successfully processed', time: '4 hours ago', type: 'success' },
                { message: 'Batch #789 quality check completed', time: '1 day ago', type: 'info' },
                { message: 'System maintenance scheduled for May 20, 02:00 AM', time: '2 days ago', type: 'info' },
              ].map((notification, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg p-4 ${
                    notification.type === 'warning' ? 'bg-amber-50 border border-amber-200' :
                    notification.type === 'success' ? 'bg-green-50 border border-green-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-sm">
                      <p className={`font-medium ${
                        notification.type === 'warning' ? 'text-amber-800' :
                        notification.type === 'success' ? 'text-green-800' :
                        'text-blue-800'
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AlertsTab;
