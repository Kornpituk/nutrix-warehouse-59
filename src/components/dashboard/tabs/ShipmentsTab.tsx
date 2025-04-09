
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import InboundOutbound from '../charts/InboundOutbound';

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

const ShipmentsTab = () => {
  return (
    <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-2">
      <InboundOutbound />

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'SH-1234', destination: 'Bangkok Pet Store', date: 'Today, 2:30 PM', items: 156 },
                { id: 'SH-1235', destination: 'Chiang Mai Distributor', date: 'Tomorrow, 9:00 AM', items: 243 },
                { id: 'SH-1236', destination: 'Phuket Retailer', date: 'May 15, 11:30 AM', items: 189 },
                { id: 'SH-1237', destination: 'Online Fulfillment', date: 'May 16, 3:00 PM', items: 321 },
              ].map((shipment, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-primary">{shipment.id}</span>
                    <span className="text-sm text-gray-500">{shipment.date}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">{shipment.destination}</div>
                  <div className="mt-1 text-xs text-gray-500">{shipment.items} items</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Shipment Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-3xl font-bold text-primary">98.3%</div>
                <div className="mt-1 text-sm text-gray-600">On-Time Delivery</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-3xl font-bold text-primary">99.7%</div>
                <div className="mt-1 text-sm text-gray-600">Order Accuracy</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-3xl font-bold text-primary">0.5%</div>
                <div className="mt-1 text-sm text-gray-600">Return Rate</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-3xl font-bold text-primary">4.2h</div>
                <div className="mt-1 text-sm text-gray-600">Avg. Processing</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ShipmentsTab;
