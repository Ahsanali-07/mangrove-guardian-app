import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import mangroveHero from '@/assets/mangrove-hero.jpg';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow fade out animation to complete
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${mangroveHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo and App Name */}
      <div className="flex flex-col items-center mb-8 animate-fade-in">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-6 shadow-strong animate-pulse-soft">
          <Leaf className="h-12 w-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Mangrove Watch
        </h1>
        
        <div className="w-16 h-1 bg-gradient-hero rounded-full animate-pulse"></div>
      </div>

      {/* Tagline */}
      <div className="absolute bottom-16 left-0 right-0 text-center animate-fade-in">
        <p className="text-white/90 text-lg font-medium px-8">
          Protecting Our Mangroves Together
        </p>
        
        {/* Loading indicator */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};