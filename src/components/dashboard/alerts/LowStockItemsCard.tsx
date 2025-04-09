
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface LowStockItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  threshold: number;
}

interface LowStockItemsCardProps {
  items: LowStockItem[];
}

const LowStockItemsCard = ({ items }: LowStockItemsCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
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
  );
};

export default LowStockItemsCard;
