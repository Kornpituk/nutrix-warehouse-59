
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock warehouse data
const warehouses = [
  { id: 1, name: 'Bangkok Central', location: 'Bangkok, Thailand', items: 5843 },
  { id: 2, name: 'Chiang Mai Distribution', location: 'Chiang Mai, Thailand', items: 3267 },
  { id: 3, name: 'Phuket Storage', location: 'Phuket, Thailand', items: 2189 },
  { id: 4, name: 'Pattaya Facility', location: 'Pattaya, Thailand', items: 1876 },
];

const SelectWarehouse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const handleWarehouseSelection = () => {
    if (!selectedWarehouse) {
      toast({
        title: "No warehouse selected",
        description: "Please select a warehouse to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Store selected warehouse
      localStorage.setItem('selectedWarehouse', selectedWarehouse);
      
      toast({
        title: "Warehouse selected",
        description: `You've selected ${warehouses.find(w => w.id.toString() === selectedWarehouse)?.name}.`,
      });
      
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl"
      >
        <div className="mb-10 text-center">
          <motion.h1 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Select Warehouse
          </motion.h1>
          <motion.p
            className="mt-2 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Choose your warehouse location to continue
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full"
        >
          <RadioGroup
            value={selectedWarehouse}
            onValueChange={setSelectedWarehouse}
            className="grid gap-4 md:grid-cols-2"
          >
            {warehouses.map((warehouse, index) => (
              <motion.div
                key={warehouse.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <Label
                  htmlFor={`warehouse-${warehouse.id}`}
                  className="cursor-pointer"
                >
                  <Card className={`overflow-hidden transition-all duration-200 ${
                    selectedWarehouse === warehouse.id.toString() 
                      ? 'border-primary-300 bg-primary-50 shadow-md' 
                      : 'hover:border-gray-300 hover:shadow-sm'
                  }`}>
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4 p-6">
                        <RadioGroupItem
                          value={warehouse.id.toString()}
                          id={`warehouse-${warehouse.id}`}
                          className="mt-1"
                        />
                        <div>
                          <div className="mb-1 font-medium text-gray-900">
                            {warehouse.name}
                          </div>
                          <div className="mb-2 text-sm text-gray-500">
                            {warehouse.location}
                          </div>
                          <div className="text-xs font-medium text-primary">
                            {warehouse.items} items in inventory
                          </div>
                        </div>
                      </div>
                      <div
                        className={`h-1 w-full ${
                          selectedWarehouse === warehouse.id.toString()
                            ? 'bg-primary'
                            : 'bg-gray-100'
                        }`}
                      ></div>
                    </CardContent>
                  </Card>
                </Label>
              </motion.div>
            ))}
          </RadioGroup>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <Button
              onClick={handleWarehouseSelection}
              className="bg-primary px-8 py-2 hover:bg-primary-600"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              ) : (
                'Continue'
              )}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                navigate('/login');
              }}
              className="text-sm text-gray-500 hover:text-primary"
            >
              Sign out and select different account
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SelectWarehouse;
