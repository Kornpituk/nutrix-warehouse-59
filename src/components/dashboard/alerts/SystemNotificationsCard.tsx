
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { NotificationType } from '@/types/dashboard';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface SystemNotification {
  message: string;
  time: string;
  type: NotificationType;
}

interface SystemNotificationsCardProps {
  notifications: ReadonlyArray<SystemNotification>;
}

const SystemNotificationsCard = ({ notifications }: SystemNotificationsCardProps) => {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>System Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-4 ${
                  notification.type === 'warning' ? 'bg-amber-50 border border-amber-200' :
                  notification.type === 'success' ? 'bg-green-50 border border-green-200' :
                  notification.type === 'danger' ? 'bg-red-50 border border-red-200' :
                  'bg-blue-50 border border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-sm">
                    <p className={`font-medium ${
                      notification.type === 'warning' ? 'text-amber-800' :
                      notification.type === 'success' ? 'text-green-800' :
                      notification.type === 'danger' ? 'text-red-800' :
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
  );
};

export default SystemNotificationsCard;
