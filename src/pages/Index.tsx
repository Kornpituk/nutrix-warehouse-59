
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/landing/LoadingScreen';
import Header from '@/components/landing/Header';
import Features from '@/components/landing/Features';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isLogoRotating, setIsLogoRotating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleLogoRotation = () => {
    setIsLogoRotating(!isLogoRotating);
  };

  const handleStart = () => {
    navigate('/login');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isLogoRotating={isLogoRotating}
        toggleLogoRotation={toggleLogoRotation}
        handleStart={handleStart}
      />
      
      <Features />
      
      <CTASection handleStart={handleStart} />
      
      <Footer />
    </div>
  );
};

export default Index;
