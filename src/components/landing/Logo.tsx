
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { RotateCw, Pause } from 'lucide-react';

interface LogoProps {
  isRotating: boolean;
  toggleRotation: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ isRotating, toggleRotation, size = 'md' }: LogoProps) => {
  const logoControls = useAnimation();

  React.useEffect(() => {
    if (isRotating) {
      logoControls.start({
        rotate: [0, 360],
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }
      });
    } else {
      logoControls.stop();
    }
  }, [isRotating, logoControls]);

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  };

  return (
    <div className="relative cursor-pointer" onClick={toggleRotation}>
      <motion.svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        animate={logoControls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={sizeClasses[size]}
      >
        <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4ZM16 26C10.5 26 6 21.5 6 16C6 10.5 10.5 6 16 6C21.5 6 26 10.5 26 16C26 21.5 21.5 26 16 26Z" fill="#AB0006"/>
        <path d="M16 10C13.8 10 12 11.8 12 14C12 16.2 13.8 18 16 18C18.2 18 20 16.2 20 14C20 11.8 18.2 10 16 10Z" fill="#AB0006"/>
        <motion.path 
          d="M13 20C11 20 10 22 10 23C10 24 10.5 25 12 25C13.5 25 14.5 24 15 23C15.5 22 15 20 13 20Z" 
          fill="#AB0006"
          animate={{ rotate: isRotating ? [0, 5, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.path 
          d="M19 20C21 20 22 22 22 23C22 24 21.5 25 20 25C18.5 25 17.5 24 17 23C16.5 22 17 20 19 20Z" 
          fill="#AB0006"
          animate={{ rotate: isRotating ? [0, -5, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.svg>
      <motion.div
        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/80 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isRotating ? 
          <Pause className="h-2 w-2 text-primary" /> : 
          <RotateCw className="h-2 w-2 text-primary" />
        }
      </motion.div>
    </div>
  );
};

export default Logo;
