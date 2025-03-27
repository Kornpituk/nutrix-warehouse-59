
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';

interface HeaderProps {
  isLogoRotating: boolean;
  toggleLogoRotation: () => void;
  handleStart: () => void;
}

const Header = ({ isLogoRotating, toggleLogoRotation, handleStart }: HeaderProps) => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-20 sm:py-32">
        <Navbar 
          isLogoRotating={isLogoRotating} 
          toggleLogoRotation={toggleLogoRotation}
          handleStart={handleStart}
        />
        
        <Hero handleStart={handleStart} />
      </div>

      <motion.div 
        className="absolute -bottom-10 left-0 right-0"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-36">
          <path fill="#f3f4f6" fillOpacity="1" d="M0,224L48,224C96,224,192,224,288,208C384,192,480,160,576,165.3C672,171,768,213,864,213.3C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </motion.div>
    </header>
  );
};

export default Header;
