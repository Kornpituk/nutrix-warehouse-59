
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AlertsCardProps {
  lowStockCount: number;
  lowStockCategories: number;
  expiringCount: number;
  expiringCategories: number;
}

const AlertsCard = ({
  lowStockCount,
  lowStockCategories,
  expiringCount,
  expiringCategories
}: AlertsCardProps) => {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-4">
              <div className="flex items-start">
                <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                <div>
                  <h4 className="font-medium text-amber-800">Low Stock Alert</h4>
                  <p className="text-sm text-amber-700">{lowStockCount} items are below their minimum stock threshold</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-red-50 p-4">
              <div className="flex items-start">
                <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                <div>
                  <h4 className="font-medium text-red-800">Expiring Products</h4>
                  <p className="text-sm text-red-700">{expiringCount} products will expire soon</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AlertsCard;
