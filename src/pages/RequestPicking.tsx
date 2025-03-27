
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const RequestPicking = () => {
  const { t } = useLanguage();

  const requests = [
    { id: 'REQ-7845', items: 23, priority: 'High', department: 'Shipping', status: 'Pending' },
    { id: 'REQ-7844', items: 12, priority: 'Medium', department: 'Production', status: 'Processing' },
    { id: 'REQ-7843', items: 8, priority: 'Low', department: 'Returns', status: 'Complete' },
    { id: 'REQ-7842', items: 15, priority: 'High', department: 'Shipping', status: 'Pending' },
    { id: 'REQ-7841', items: 5, priority: 'Medium', department: 'Sales', status: 'Processing' },
    { id: 'REQ-7840', items: 18, priority: 'High', department: 'Production', status: 'Pending' },
    { id: 'REQ-7839', items: 10, priority: 'Low', department: 'Returns', status: 'Complete' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50">Pending</Badge>;
      case 'Processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">Processing</Badge>;
      case 'Complete':
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">Complete</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-500">High</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.requestForPicking')}</h1>
        <p className="text-muted-foreground">
          Manage and process picking requests from various departments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>All Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.filter(r => r.status === 'Pending').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.filter(r => r.status === 'Processing').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{requests.filter(r => r.status === 'Complete').length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Picking Requests</CardTitle>
          <CardDescription>
            Manage your active picking requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 bg-muted/50 p-3">
              <div className="font-medium">Request ID</div>
              <div className="font-medium">Priority</div>
              <div className="font-medium">Department</div>
              <div className="font-medium">Items</div>
              <div className="font-medium">Status</div>
              <div className="text-right font-medium">Actions</div>
            </div>
            <div className="divide-y">
              {requests.map((request) => (
                <div key={request.id} className="grid grid-cols-6 items-center p-3">
                  <div className="font-medium">{request.id}</div>
                  <div>{getPriorityBadge(request.priority)}</div>
                  <div>{request.department}</div>
                  <div>{request.items} items</div>
                  <div>{getStatusBadge(request.status)}</div>
                  <div className="flex justify-end space-x-2">
                    <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestPicking;
