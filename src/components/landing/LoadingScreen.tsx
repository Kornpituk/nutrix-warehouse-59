
import React from 'react';
import { motion } from 'framer-motion';
import { Loading } from "@/components/ui/custom/loading";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Loading text=" " />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xl font-medium text-primary"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;
