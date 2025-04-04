
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Warehouse } from "lucide-react";
import { Location, fetchLocations, logout } from "@/utils/auth";

const SelectWarehouse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true);
        const fetchedLocations = await fetchLocations();
        // Filter out the "All" option if needed
        const filteredLocations = fetchedLocations.filter(loc => loc.id !== "");
        setLocations(filteredLocations);
        setError(null);
      } catch (err) {
        console.error("Error loading locations:", err);
        setError("Failed to load warehouse locations. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load warehouse locations",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, [toast]);

  const handleSelectWarehouse = (location: Location) => {
    // Store the selected warehouse in localStorage
    localStorage.setItem('selectedWarehouse', JSON.stringify(location));
    
    toast({
      title: "Warehouse Selected",
      description: `You have selected ${location.name}`,
    });
    
    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Select Warehouse</h1>
          <p className="mt-2 text-gray-600">
            Choose the warehouse you want to work with
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-red-800">
            <p>{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {loading ? (
            // Skeleton loaders
            Array.from({ length: 9 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="bg-gray-50 p-4">
                    <Skeleton className="h-9 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Actual warehouse cards
            locations.map((location) => (
              <Card
                key={location.id}
                className="overflow-hidden transition-all hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="mb-4 flex items-center">
                      <div className="mr-3 rounded-full bg-primary/10 p-2">
                        <Warehouse className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">
                        {location.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      ID: {location.id}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <Button
                      className="w-full"
                      onClick={() => handleSelectWarehouse(location)}
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectWarehouse;
