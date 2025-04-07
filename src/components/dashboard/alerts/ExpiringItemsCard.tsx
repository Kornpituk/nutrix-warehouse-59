
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface ExpiringItem {
  id: number;
  name: string;
  category: string;
  expiresIn: number;
}

interface ExpiringItemsCardProps {
  items: ExpiringItem[];
}

const ExpiringItemsCard = ({ items }: ExpiringItemsCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader>
          <CardTitle>Expiring Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
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
  );
};

export default ExpiringItemsCard;
