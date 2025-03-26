
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-white to-gray-100">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 10C32.4 10 10 32.4 10 60C10 87.6 32.4 110 60 110C87.6 110 110 87.6 110 60C110 32.4 87.6 10 60 10ZM60 100C37.9 100 20 82.1 20 60C20 37.9 37.9 20 60 20C82.1 20 100 37.9 100 60C100 82.1 82.1 100 60 100Z" fill="#AB0006"/>
              <path d="M60 30C48.95 30 40 38.95 40 50C40 61.05 48.95 70 60 70C71.05 70 80 61.05 80 50C80 38.95 71.05 30 60 30Z" fill="#AB0006"/>
              <motion.path 
                d="M45 80C35 80 30 90 30 95C30 100 32.5 105 40 105C47.5 105 52.5 100 55 95C57.5 90 55 80 45 80Z" 
                fill="#AB0006"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.path 
                d="M75 80C85 80 90 90 90 95C90 100 87.5 105 80 105C72.5 105 67.5 100 65 95C62.5 90 65 80 75 80Z" 
                fill="#AB0006"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </svg>
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
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4ZM16 26C10.5 26 6 21.5 6 16C6 10.5 10.5 6 16 6C21.5 6 26 10.5 26 16C26 21.5 21.5 26 16 26Z" fill="#AB0006"/>
                <path d="M16 10C13.8 10 12 11.8 12 14C12 16.2 13.8 18 16 18C18.2 18 20 16.2 20 14C20 11.8 18.2 10 16 10Z" fill="#AB0006"/>
                <motion.path 
                  d="M13 20C11 20 10 22 10 23C10 24 10.5 25 12 25C13.5 25 14.5 24 15 23C15.5 22 15 20 13 20Z" 
                  fill="#AB0006"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.path 
                  d="M19 20C21 20 22 22 22 23C22 24 21.5 25 20 25C18.5 25 17.5 24 17 23C16.5 22 17 20 19 20Z" 
                  fill="#AB0006"
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </svg>
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
                <div className="cube">
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
                </div>
              </div>

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

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Powerful Features</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to manage your pet food inventory</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Real-time Dashboard",
                description: "Get instant insights into your inventory and operations with our intuitive dashboard.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: "Stock Management",
                description: "Track inventory levels, set alerts, and manage stock with ease.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
              },
              {
                title: "Shipment Planning",
                description: "Plan and track shipments in real-time with comprehensive reports.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                ),
              },
              {
                title: "Multi-Warehouse Support",
                description: "Manage multiple warehouses and zones from one central dashboard.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: "Expiry Tracking",
                description: "Keep track of shelf life and expiry dates for all your pet food products.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Customizable Reports",
                description: "Generate detailed reports and export data in multiple formats.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4ZM16 26C10.5 26 6 21.5 6 16C6 10.5 10.5 6 16 6C21.5 6 26 10.5 26 16C26 21.5 21.5 26 16 26Z" fill="#AB0006"/>
                <path d="M16 10C13.8 10 12 11.8 12 14C12 16.2 13.8 18 16 18C18.2 18 20 16.2 20 14C20 11.8 18.2 10 16 10Z" fill="#AB0006"/>
                <path d="M13 20C11 20 10 22 10 23C10 24 10.5 25 12 25C13.5 25 14.5 24 15 23C15.5 22 15 20 13 20Z" fill="#AB0006"/>
                <path d="M19 20C21 20 22 22 22 23C22 24 21.5 25 20 25C18.5 25 17.5 24 17 23C16.5 22 17 20 19 20Z" fill="#AB0006"/>
              </svg>
              <span className="text-xl font-bold text-white">PetFeed WMS</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-center md:text-right">
              <p>© 2023 PetFeed WMS. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
