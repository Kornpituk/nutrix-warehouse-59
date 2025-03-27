
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, ChevronDown, ChevronUp, Filter } from 'lucide-react';

const Receiving = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);

  // Mock data for receipts
  const [receipts, setReceipts] = useState([
    { id: 'RCV-001', supplier: 'Bangkok Suppliers', items: 24, date: '2023-06-10', status: 'Completed' },
    { id: 'RCV-002', supplier: 'Pet Foods Co', items: 18, date: '2023-06-11', status: 'Waiting for Approval' },
    { id: 'RCV-003', supplier: 'Animal Care Ltd', items: 32, date: '2023-06-12', status: 'In Progress' },
    { id: 'RCV-004', supplier: 'Pet Accessories Inc', items: 12, date: '2023-06-13', status: 'Waiting for Approval' },
    { id: 'RCV-005', supplier: 'Bangkok Suppliers', items: 45, date: '2023-06-14', status: 'Completed' },
    { id: 'RCV-006', supplier: 'Quality Feeds', items: 28, date: '2023-06-15', status: 'Waiting for Approval' },
    { id: 'RCV-007', supplier: 'Pet Care Solutions', items: 15, date: '2023-06-16', status: 'In Progress' },
  ]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSelectReceipt = (id: string) => {
    if (selectedReceipts.includes(id)) {
      setSelectedReceipts(selectedReceipts.filter(receiptId => receiptId !== id));
    } else {
      setSelectedReceipts([...selectedReceipts, id]);
    }
  };

  const handleApprove = () => {
    if (selectedReceipts.length === 0) {
      toast({
        title: "No receipts selected",
        description: "Please select at least one receipt to approve",
        variant: "destructive",
      });
      return;
    }

    // Update the status of selected receipts to "Completed"
    const updatedReceipts = receipts.map(receipt => {
      if (selectedReceipts.includes(receipt.id)) {
        return { ...receipt, status: 'Completed' };
      }
      return receipt;
    });

    setReceipts(updatedReceipts);
    setSelectedReceipts([]);
    
    toast({
      title: "Receipts approved",
      description: `${selectedReceipts.length} receipt(s) have been approved`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Waiting for Approval':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50">{status}</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">{status}</Badge>;
      case 'Completed':
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter receipts based on search term
  const filteredReceipts = receipts.filter(receipt => 
    receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.receiving')}</h1>
        <p className="text-muted-foreground">
          Manage goods reception and inventory intake.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Receipts</CardTitle>
            <CardDescription>
              Upcoming and scheduled deliveries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 deliveries expected today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>In Progress</CardTitle>
            <CardDescription>
              Currently being processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              2 deliveries from Bangkok Suppliers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Receipts</CardTitle>
            <CardDescription>
              Completed in the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +15% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Receipts Management</CardTitle>
            <CardDescription>
              Manage and process incoming shipments
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={toggleFilter} className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
              {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            <Button onClick={handleApprove}>Approve Selected</Button>
          </div>
        </CardHeader>
        
        {isFilterOpen && (
          <CardContent className="pt-0 pb-3 border-b">
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, supplier, or status..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        )}
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Select</TableHead>
                <TableHead>Receipt ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell>
                    <Checkbox 
                      disabled={receipt.status !== 'Waiting for Approval'} 
                      checked={selectedReceipts.includes(receipt.id)}
                      onCheckedChange={() => receipt.status === 'Waiting for Approval' && handleSelectReceipt(receipt.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{receipt.id}</TableCell>
                  <TableCell>{receipt.supplier}</TableCell>
                  <TableCell>{receipt.items}</TableCell>
                  <TableCell>{new Date(receipt.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Recent receiving operations and status updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">Receipt #{20230 + item}</div>
                  <div className="text-sm text-muted-foreground">
                    {item % 2 === 0 ? 'Completed' : 'Processing'} • Supplier ID: SUPP-{1000 + item}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{item * 12} items</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(2023, 5, 10 + item).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Receiving;
