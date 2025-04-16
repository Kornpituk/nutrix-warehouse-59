
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/features/auth/components/LoginForm';
import { useTheme } from '@/contexts/ThemeContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  
  // Redirect to dashboard if already authenticated
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="z-10 w-full max-w-md p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-card p-6 shadow-lg"
        >
          <div className="flex flex-col items-center space-y-2 mb-6">
            <img
              src="/Nutrix.png"
              alt="Nutrix Logo"
              className="h-12 w-auto"
            />
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account</p>
          </div>
          
          <LoginForm />
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button
              className="font-medium text-primary hover:underline"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default LoginPage;
