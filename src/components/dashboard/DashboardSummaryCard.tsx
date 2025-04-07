
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardSummaryCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor?: string;
}

const DashboardSummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor,
  iconColor = "text-primary"
}: DashboardSummaryCardProps) => {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900">{value}</h3>
              {subtitle && (
                <p className="mt-1 text-xs font-medium text-gray-600">{subtitle}</p>
              )}
            </div>
            <div className={`rounded-full ${iconBgColor} p-3`}>
              {React.cloneElement(icon as React.ReactElement, { className: iconColor, size: 20 })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardSummaryCard;
