
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  handleStart: () => void;
}

const CTASection = ({ handleStart }: CTASectionProps) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="rounded-2xl bg-gradient-to-r from-primary to-primary-700 p-12 text-center shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-3xl font-bold text-white">Ready to optimize your pet food warehouse?</h2>
          <p className="mb-8 text-xl text-white/90">Get started today and see the difference our system can make.</p>
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-white text-primary hover:bg-gray-100"
          >
            Start Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
