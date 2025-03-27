
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const LocationSettings = () => {
  const { t } = useLanguage();

  const locations = [
    { id: 'LOC-A1', zone: 'A', rack: '01', shelf: '01', type: 'Picking', status: 'Active', capacity: '100%' },
    { id: 'LOC-A2', zone: 'A', rack: '01', shelf: '02', type: 'Picking', status: 'Active', capacity: '75%' },
    { id: 'LOC-B1', zone: 'B', rack: '01', shelf: '01', type: 'Storage', status: 'Active', capacity: '90%' },
    { id: 'LOC-B2', zone: 'B', rack: '01', shelf: '02', type: 'Storage', status: 'Active', capacity: '60%' },
    { id: 'LOC-C1', zone: 'C', rack: '01', shelf: '01', type: 'Bulk', status: 'Active', capacity: '85%' },
    { id: 'LOC-C2', zone: 'C', rack: '01', shelf: '02', type: 'Bulk', status: 'Maintenance', capacity: '0%' },
    { id: 'LOC-D1', zone: 'D', rack: '01', shelf: '01', type: 'Overflow', status: 'Active', capacity: '30%' },
    { id: 'LOC-D2', zone: 'D', rack: '01', shelf: '02', type: 'Overflow', status: 'Active', capacity: '45%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.location')}</h1>
        <p className="text-muted-foreground">
          Manage warehouse locations, zones, and storage areas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{locations.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Set(locations.map(l => l.zone)).size}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {locations.filter(l => l.status === 'Active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {locations.filter(l => l.status === 'Maintenance').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Warehouse Locations</CardTitle>
          <CardDescription>
            Manage your storage locations and zones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 bg-muted/50 p-3">
              <div className="font-medium">Location ID</div>
              <div className="font-medium">Zone</div>
              <div className="font-medium">Rack</div>
              <div className="font-medium">Shelf</div>
              <div className="font-medium">Type</div>
              <div className="font-medium">Capacity</div>
              <div className="text-right font-medium">Actions</div>
            </div>
            <div className="divide-y">
              {locations.map((location) => (
                <div key={location.id} className="grid grid-cols-7 items-center p-3">
                  <div className="font-medium">{location.id}</div>
                  <div>{location.zone}</div>
                  <div>{location.rack}</div>
                  <div>{location.shelf}</div>
                  <div>{location.type}</div>
                  <div className="flex items-center">
                    <div className="h-2 w-24 rounded-full bg-gray-200">
                      <div 
                        className={`h-2 rounded-full ${
                          parseInt(location.capacity) > 80 
                            ? 'bg-red-500' 
                            : parseInt(location.capacity) > 50 
                            ? 'bg-amber-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: location.capacity }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{location.capacity}</span>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                      Edit
                    </button>
                    <button className="rounded bg-gray-200 px-2 py-1 text-xs">
                      View
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

export default LocationSettings;
