
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCw, Pause } from 'lucide-react';

interface HeroProps {
  handleStart: () => void;
}

const Hero = ({ handleStart }: HeroProps) => {
  const [isRotating, setIsRotating] = React.useState(true);
  const cubeControls = useAnimation();

  React.useEffect(() => {
    if (isRotating) {
      cubeControls.start({
        rotateX: [0, 360],
        rotateY: [0, 360],
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }
      });
    } else {
      cubeControls.stop();
    }
  }, [isRotating, cubeControls]);

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className="mt-16 flex flex-col-reverse items-center lg:flex-row lg:items-start lg:justify-between">
      <motion.div 
        className="max-w-xl pt-10 text-center lg:text-left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="block">Modern Warehouse</span>
          <span className="block text-gradient">Management for Pet Food</span>
        </motion.h1>
        <motion.p 
          className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Streamline your pet food inventory with our intuitive warehouse management system. Track, manage, and optimize your pet food supply chain with ease.
        </motion.p>
        <motion.div 
          className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-primary hover:bg-primary-600 text-white"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary-50"
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="relative h-96 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="scene-container absolute inset-0 mx-auto">
          <motion.div 
            className="cube"
            animate={cubeControls}
          >
            <div className="cube__face cube__face--front">
              <motion.img 
                src="https://images.unsplash.com/photo-1583511655826-05700a52f8ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Dog with food" 
                className="w-full h-full object-cover rounded-lg opacity-90"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div className="cube__face cube__face--back">
              <motion.img 
                src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Cat with food" 
                className="w-full h-full object-cover rounded-lg opacity-90"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div className="cube__face cube__face--right">
              <motion.img 
                src="https://images.unsplash.com/photo-1616668983570-a971f65a82d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Pet food" 
                className="w-full h-full object-cover rounded-lg opacity-90"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div className="cube__face cube__face--left">
              <motion.img 
                src="https://images.unsplash.com/photo-1609166614178-32cf1d3efe5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Pet treats" 
                className="w-full h-full object-cover rounded-lg opacity-90"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div className="cube__face cube__face--top">
              <motion.img 
                src="https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Warehouse" 
                className="w-full h-full object-cover rounded-lg opacity-90"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div className="cube__face cube__face--bottom">
              <motion.img 
                src="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Pet supplies" 
                className="w-full h-full object-cover rounded-lg opacity-90"
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Cube rotation control button */}
        <motion.button
          onClick={toggleRotation}
          className="absolute top-0 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:bg-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {isRotating ? <Pause className="h-5 w-5 text-primary" /> : <RotateCw className="h-5 w-5 text-primary" />}
        </motion.button>

        <motion.div 
          className="pet-container absolute bottom-4 left-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg" 
            alt="Cat"
            className="pet w-24 h-24 rounded-full object-cover border-2 border-white shadow-lg"
          />
        </motion.div>

        <motion.div 
          className="pet-container absolute top-10 right-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Golden_Retriever_Hund_Dog.JPG" 
            alt="Dog"
            className="pet w-28 h-28 rounded-full object-cover border-2 border-white shadow-lg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
