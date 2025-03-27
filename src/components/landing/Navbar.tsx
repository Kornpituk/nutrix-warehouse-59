
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

interface NavbarProps {
  isLogoRotating: boolean;
  toggleLogoRotation: () => void;
  handleStart: () => void;
}

const Navbar = ({ isLogoRotating, toggleLogoRotation, handleStart }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-2">
        <Logo isRotating={isLogoRotating} toggleRotation={toggleLogoRotation} />
        <span className="text-xl font-bold text-primary">Nutrix Public Company Limited</span>
      </div>
      <div className="hidden space-x-8 md:flex">
        <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
        <a href="#about" className="text-gray-600 hover:text-primary-600 transition-colors">About</a>
        <a href="#contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a>
      </div>
      <Button
        onClick={handleStart}
        variant="ghost"
        className="hidden md:inline-flex"
      >
        Sign In
      </Button>
    </nav>
  );
};

export default Navbar;
