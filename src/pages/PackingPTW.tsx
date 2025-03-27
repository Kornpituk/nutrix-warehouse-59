
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const PackingPTW = () => {
  const { t } = useLanguage();

  const packingJobs = [
    { id: 'PACK-2345', orderRef: 'ORD-9876', items: 12, status: 'Ready', priority: 'Normal', customer: 'ABC Corp' },
    { id: 'PACK-2344', orderRef: 'ORD-9875', items: 8, status: 'In Progress', priority: 'Rush', customer: 'XYZ Ltd' },
    { id: 'PACK-2343', orderRef: 'ORD-9874', items: 15, status: 'Complete', priority: 'Normal', customer: 'Acme Inc' },
    { id: 'PACK-2342', orderRef: 'ORD-9873', items: 5, status: 'Ready', priority: 'Low', customer: '123 Company' },
    { id: 'PACK-2341', orderRef: 'ORD-9872', items: 20, status: 'In Progress', priority: 'Rush', customer: 'Big Store' },
  ];

  const ptwTasks = [
    { id: 'PTW-1234', target: 'Zone A', items: 45, status: 'Pending', assignee: 'John D.' },
    { id: 'PTW-1233', target: 'Zone B', items: 30, status: 'In Progress', assignee: 'Sarah M.' },
    { id: 'PTW-1232', target: 'Zone C', items: 25, status: 'Complete', assignee: 'Alex T.' },
    { id: 'PTW-1231', target: 'Zone A', items: 15, status: 'Pending', assignee: 'Lisa R.' },
    { id: 'PTW-1230', target: 'Zone D', items: 50, status: 'In Progress', assignee: 'Mike P.' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ready':
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50">{status}</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">{status}</Badge>;
      case 'Complete':
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Rush':
        return <Badge className="bg-red-500">Rush</Badge>;
      case 'Normal':
        return <Badge className="bg-blue-500">Normal</Badge>;
      case 'Low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.packingPTW')}</h1>
        <p className="text-muted-foreground">
          Manage packing operations and put-to-wall processes.
        </p>
      </div>

      <Tabs defaultValue="packing">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="packing">Packing</TabsTrigger>
          <TabsTrigger value="ptw">Put-to-Wall (PTW)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="packing" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Ready to Pack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{packingJobs.filter(j => j.status === 'Ready').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{packingJobs.filter(j => j.status === 'In Progress').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Completed Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{packingJobs.filter(j => j.status === 'Complete').length}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Packing Jobs</CardTitle>
              <CardDescription>
                Current packing assignments and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-3">
                  <div className="font-medium">Job ID</div>
                  <div className="font-medium">Order Ref</div>
                  <div className="font-medium">Customer</div>
                  <div className="font-medium">Priority</div>
                  <div className="font-medium">Items</div>
                  <div className="font-medium">Status</div>
                  <div className="text-right font-medium">Actions</div>
                </div>
                <div className="divide-y">
                  {packingJobs.map((job) => (
                    <div key={job.id} className="grid grid-cols-7 items-center p-3">
                      <div className="font-medium">{job.id}</div>
                      <div>{job.orderRef}</div>
                      <div>{job.customer}</div>
                      <div>{getPriorityBadge(job.priority)}</div>
                      <div>{job.items} items</div>
                      <div>{getStatusBadge(job.status)}</div>
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
        </TabsContent>
        
        <TabsContent value="ptw" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Pending PTW</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ptwTasks.filter(t => t.status === 'Pending').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active PTW</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ptwTasks.filter(t => t.status === 'In Progress').length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Completed PTW</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ptwTasks.filter(t => t.status === 'Complete').length}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>PTW Tasks</CardTitle>
              <CardDescription>
                Put-to-wall operations and assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-3">
                  <div className="font-medium">Task ID</div>
                  <div className="font-medium">Target</div>
                  <div className="font-medium">Items</div>
                  <div className="font-medium">Assignee</div>
                  <div className="font-medium">Status</div>
                  <div className="text-right font-medium">Actions</div>
                </div>
                <div className="divide-y">
                  {ptwTasks.map((task) => (
                    <div key={task.id} className="grid grid-cols-6 items-center p-3">
                      <div className="font-medium">{task.id}</div>
                      <div>{task.target}</div>
                      <div>{task.items} items</div>
                      <div>{task.assignee}</div>
                      <div>{getStatusBadge(task.status)}</div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PackingPTW;
