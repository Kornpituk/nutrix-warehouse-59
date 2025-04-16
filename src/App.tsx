import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CompanyProvider } from "./contexts/CompanyContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeCustomizer } from "./components/ui/theme-customizer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SelectWarehouse from "./pages/SelectWarehouse";
import Dashboard from "./pages/Dashboard";

import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";


import StockUpdate from "./pages/StockUpdate";
// Permission subpages
import SummaryStockUpdate from "./pages/stockUpdate/summary/SummaryStockUpdate";
import SummaryStockUpdateDetail from "./pages/stockUpdate/details/DetailsStockUpdate";
import StockUpdateDetailsLot from "./pages/stockUpdate/detailsByLot/DetailsStockUpdateLot";
import StockUpdateDetailsLotBatch from "./pages/stockUpdate/detailsByLotBatch/DetailsStockUpdateLotBatch";

// New pages
import Receiving from "./pages/Receiving";
import RequestPicking from "./pages/RequestPicking";
import PackingPTW from "./pages/PackingPTW";

// Settings subpages
import ProductSettings from "./pages/settings/Product";
import LocationSettings from "./pages/settings/Location";
import DepartmentSettings from "./pages/settings/Department";
import CustomerSettings from "./pages/settings/Customer";
import VendorSettings from "./pages/settings/Vendor";
import TransactionModelSettings from "./pages/settings/TransactionModel";
import LotModelSettings from "./pages/settings/LotModel";
import PermissionSettings from "./pages/settings/Permission";

// Permission subpages
import UsersPage from "./pages/settings/permission/user/UsersPage";
import RolesPage from "./pages/settings/permission/role/RolesPage";
import PermissionsPage from "./pages/settings/permission/permission/PermissionsPage";

// Role routes import
import RoleRoutes from "./pages/settings/permission/role/components/RoleRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CompanyProvider>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Routes>
              {/* <Route path="/" element={<Index />} /> */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/select-warehouse" element={<SelectWarehouse />} />
              
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
              <Route path="/stock/summary" element={
                <ProtectedRoute>
                  <SummaryStockUpdate />
                </ProtectedRoute>
              } />
              {/* <Route path="/stock/details" element={
                <ProtectedRoute>
                  <SummaryStockUpdateDetail />
                </ProtectedRoute>
              } /> */}
              <Route path="/stock/detailsByLot" element={
                <ProtectedRoute>
                  <StockUpdateDetailsLot />
                </ProtectedRoute>
              } />
              <Route path="/stock/detailsByLotBatch" element={
                <ProtectedRoute>
                  <StockUpdateDetailsLotBatch />
                </ProtectedRoute>
              } />
              
              <Route path="/receiving" element={
                <ProtectedRoute>
                  <Receiving />
                </ProtectedRoute>
              } />
              <Route path="/request-picking" element={
                <ProtectedRoute>
                  <RequestPicking />
                </ProtectedRoute>
              } />
              <Route path="/packing-ptw" element={
                <ProtectedRoute>
                  <PackingPTW />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/settings/product" element={
                <ProtectedRoute>
                  <ProductSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/location" element={
                <ProtectedRoute>
                  <LocationSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/department" element={
                <ProtectedRoute>
                  <DepartmentSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/customer" element={
                <ProtectedRoute>
                  <CustomerSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/vendor" element={
                <ProtectedRoute>
                  <VendorSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/transaction-model" element={
                <ProtectedRoute>
                  <TransactionModelSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/lot-model" element={
                <ProtectedRoute>
                  <LotModelSettings />
                </ProtectedRoute>
              } />
              
              <Route path="/settings/permission/*" element={
                <ProtectedRoute>
                  <PermissionSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/permission/users/*" element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              } />
              <Route path="/settings/permission/roles/*" element={
                <ProtectedRoute>
                  <RoleRoutes />
                </ProtectedRoute>
              } />
              <Route path="/settings/permission/permissions" element={
                <ProtectedRoute>
                  <PermissionsPage />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <ThemeCustomizer />
            <Toaster />
            <Sonner />
          </div>
        </CompanyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
