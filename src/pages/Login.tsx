
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Home } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Simple validation
      if (username.length > 0 && password.length > 0) {
        toast({
          title: "Login successful",
          description: "Welcome back to PetFeed WMS!",
        });
        // Store authentication status (in a real app, you would store a token)
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/select-warehouse');
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="absolute left-4 top-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBackToHome}
          className="gap-2 text-primary hover:bg-primary-50 hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="relative h-32 bg-primary">
          <motion.div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-2 shadow-lg">
              <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16C28 9.4 22.6 4 16 4ZM16 26C10.5 26 6 21.5 6 16C6 10.5 10.5 6 16 6C21.5 6 26 10.5 26 16C26 21.5 21.5 26 16 26Z" fill="#AB0006"/>
                <path d="M16 10C13.8 10 12 11.8 12 14C12 16.2 13.8 18 16 18C18.2 18 20 16.2 20 14C20 11.8 18.2 10 16 10Z" fill="#AB0006"/>
                <path d="M13 20C11 20 10 22 10 23C10 24 10.5 25 12 25C13.5 25 14.5 24 15 23C15.5 22 15 20 13 20Z" fill="#AB0006"/>
                <path d="M19 20C21 20 22 22 22 23C22 24 21.5 25 20 25C18.5 25 17.5 24 17 23C16.5 22 17 20 19 20Z" fill="#AB0006"/>
              </svg>
            </div>
          </motion.div>
        </div>

        <div className="px-6 pb-8 pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="mb-2 text-center text-2xl font-bold">Welcome Back</h1>
            <p className="mb-6 text-center text-gray-500">Sign in to your account</p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-600"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-primary hover:text-primary-700">
                  Sign up
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 flex justify-center space-x-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div 
              className="pet-container"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                alt="Cat"
                className="h-10 w-10 rounded-full object-cover shadow-sm border border-gray-200"
              />
            </motion.div>
            <motion.div 
              className="pet-container"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                alt="Dog"
                className="h-10 w-10 rounded-full object-cover shadow-sm border border-gray-200"
              />
            </motion.div>
            <motion.div 
              className="pet-container"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                alt="Bird"
                className="h-10 w-10 rounded-full object-cover shadow-sm border border-gray-200"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

