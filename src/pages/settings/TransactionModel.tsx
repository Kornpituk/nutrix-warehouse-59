
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const TransactionModelSettings = () => {
  const { t } = useLanguage();

  const transactionTypes = [
    { id: 'TXN-PURCH', name: 'Purchase Order', prefix: 'PO', lastNumber: 1287, increment: 1, padding: 6, example: 'PO-001287' },
    { id: 'TXN-SALE', name: 'Sales Order', prefix: 'SO', lastNumber: 4536, increment: 1, padding: 6, example: 'SO-004536' },
    { id: 'TXN-RCV', name: 'Receiving', prefix: 'GRN', lastNumber: 834, increment: 1, padding: 6, example: 'GRN-000834' },
    { id: 'TXN-PICK', name: 'Pick Ticket', prefix: 'PICK', lastNumber: 2342, increment: 1, padding: 6, example: 'PICK-002342' },
    { id: 'TXN-SHIP', name: 'Shipment', prefix: 'SHIP', lastNumber: 1732, increment: 1, padding: 6, example: 'SHIP-001732' },
    { id: 'TXN-RET', name: 'Returns', prefix: 'RET', lastNumber: 345, increment: 1, padding: 6, example: 'RET-000345' },
    { id: 'TXN-TRFR', name: 'Transfer', prefix: 'TRF', lastNumber: 421, increment: 1, padding: 6, example: 'TRF-000421' },
  ];

  const transactionStatuses = [
    { type: 'Purchase Order', statuses: ['Draft', 'Submitted', 'Approved', 'Partially Received', 'Fully Received', 'Closed', 'Cancelled'] },
    { type: 'Sales Order', statuses: ['New', 'Processing', 'Picking', 'Packed', 'Shipped', 'Delivered', 'Returned', 'Cancelled'] },
    { type: 'Receiving', statuses: ['Pending', 'In Progress', 'Completed', 'Exception'] },
    { type: 'Pick Ticket', statuses: ['Open', 'In Progress', 'Completed', 'Exception'] },
    { type: 'Shipment', statuses: ['Planned', 'In Process', 'Shipped', 'Delivered', 'Exception'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.transactionModel')}</h1>
        <p className="text-muted-foreground">
          Configure your transaction numbering and workflow models.
        </p>
      </div>

      <Tabs defaultValue="numbering">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="numbering">Transaction Numbering</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="numbering" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Number Configuration</CardTitle>
              <CardDescription>
                Configure how transaction numbers are generated for different transaction types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted/50 p-3">
                  <div className="font-medium">Type</div>
                  <div className="font-medium">Name</div>
                  <div className="font-medium">Prefix</div>
                  <div className="font-medium">Last Number</div>
                  <div className="font-medium">Increment</div>
                  <div className="font-medium">Example</div>
                  <div className="text-right font-medium">Actions</div>
                </div>
                <div className="divide-y">
                  {transactionTypes.map((txnType) => (
                    <div key={txnType.id} className="grid grid-cols-7 items-center p-3">
                      <div className="font-medium">{txnType.id}</div>
                      <div>{txnType.name}</div>
                      <div>{txnType.prefix}</div>
                      <div>{txnType.lastNumber}</div>
                      <div>{txnType.increment}</div>
                      <div>{txnType.example}</div>
                      <div className="flex justify-end space-x-2">
                        <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Workflow Status</CardTitle>
              <CardDescription>
                Configure the status flow for different transaction types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {transactionStatuses.map((workflow) => (
                  <div key={workflow.type} className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-3">{workflow.type}</h3>
                    <div className="flex flex-wrap gap-2">
                      {workflow.statuses.map((status, index) => (
                        <React.Fragment key={status}>
                          <div className="border rounded px-3 py-1 bg-muted">
                            {status}
                          </div>
                          {index < workflow.statuses.length - 1 && (
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button className="rounded bg-primary px-3 py-2 text-sm text-white">
                  Edit Workflow Statuses
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionModelSettings;
