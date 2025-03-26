
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SidebarNav from "./components/SidebarNav";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SelectWarehouse from "./pages/SelectWarehouse";
import Dashboard from "./pages/Dashboard";
import StockUpdate from "./pages/StockUpdate";
import ShipmentPlan from "./pages/ShipmentPlan";
import PickOrders from "./pages/PickOrders";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const selectedWarehouse = localStorage.getItem('selectedWarehouse');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!selectedWarehouse) {
    return <Navigate to="/select-warehouse" replace />;
  }
  
  return (
    <SidebarNav>
      {children}
    </SidebarNav>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select-warehouse" element={<SelectWarehouse />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/stock" element={
            <ProtectedRoute>
              <StockUpdate />
            </ProtectedRoute>
          } />
          <Route path="/shipment" element={
            <ProtectedRoute>
              <ShipmentPlan />
            </ProtectedRoute>
          } />
          <Route path="/pick-orders" element={
            <ProtectedRoute>
              <PickOrders />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
