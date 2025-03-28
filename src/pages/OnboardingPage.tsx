
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CreditCard, ShieldCheck, LineChart, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OnboardingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      title: "Welcome to PayGrow",
      description: "Your all-in-one solution for payments and investments",
      icon: <CreditCard size={80} className="text-app-blue mb-6" />,
      image: "/assets/onboarding-1.png",
    },
    {
      title: "Send & Receive Money Instantly",
      description: "Transfer money to anyone, anywhere with just a few taps",
      icon: <ShieldCheck size={80} className="text-app-teal mb-6" />,
      image: "/assets/onboarding-2.png",
    },
    {
      title: "Grow Your Wealth",
      description: "Invest in mutual funds and watch your money grow over time",
      icon: <LineChart size={80} className="text-app-orange mb-6" />,
      image: "/assets/onboarding-3.png",
    },
    {
      title: "Ready to Get Started?",
      description: "Create an account or log in to begin your financial journey",
      icon: <CheckCircle2 size={80} className="text-app-green mb-6" />,
      image: "/assets/onboarding-4.png",
    }
  ];
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth');
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const skipToEnd = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex justify-end p-4">
        {currentSlide < slides.length - 1 && (
          <button 
            onClick={skipToEnd} 
            className="text-app-blue font-medium px-4 py-2"
          >
            Skip
          </button>
        )}
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full onboarding-slide">
                {slide.icon}
                <h1 className="text-2xl font-bold text-center mb-3">{slide.title}</h1>
                <p className="text-center text-gray-600 mb-8 max-w-xs">{slide.description}</p>
                {slide.image && (
                  <div className="mt-6 max-w-xs">
                    <img src={slide.image} alt={slide.title} className="w-full h-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-8">
          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-app-blue' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex space-x-4">
            {currentSlide > 0 && (
              <Button 
                variant="outline" 
                className="flex-1 py-6"
                onClick={prevSlide}
              >
                <ChevronLeft size={20} className="mr-2" />
                Back
              </Button>
            )}
            
            <Button 
              className="flex-1 bg-app-blue hover:bg-app-dark-blue py-6"
              onClick={nextSlide}
            >
              {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
              {currentSlide < slides.length - 1 && <ChevronRight size={20} className="ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
