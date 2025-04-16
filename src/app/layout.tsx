
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeCustomizer } from "@/components/ui/theme-customizer";

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Outlet />
      <ThemeCustomizer />
      <Toaster />
      <Sonner />
    </div>
  );
};

export default RootLayout;
