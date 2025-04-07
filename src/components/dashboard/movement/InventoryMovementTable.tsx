
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface InventoryMovementItem {
  id: number;
  product: string;
  from: string;
  to: string;
  quantity: number;
  time: string;
  status: string;
}

interface InventoryMovementTableProps {
  movements: InventoryMovementItem[];
}

const InventoryMovementTable = ({ movements }: InventoryMovementTableProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Inventory Movements</CardTitle>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Live Updates</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell className="font-medium">{movement.product}</TableCell>
                    <TableCell>{movement.from}</TableCell>
                    <TableCell>{movement.to}</TableCell>
                    <TableCell className="text-right">{movement.quantity}</TableCell>
                    <TableCell>{movement.time}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        movement.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        movement.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        movement.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {movement.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InventoryMovementTable;
