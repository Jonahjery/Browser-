import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Shield, Zap, Globe, Check, ArrowRight } from 'lucide-react';

interface WelcomeSlidesProps {
  onComplete: () => void;
}

export const WelcomeSlides: React.FC<WelcomeSlidesProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 'welcome',
      title: 'Welcome to Atom Browser',
      subtitle: 'Fast, secure, and modern web browsing',
      description: 'Experience the web like never before with our cutting-edge browser designed for speed, privacy, and simplicity.',
      icon: Globe,
      gradient: 'from-blue-500 via-purple-500 to-indigo-600',
      bgPattern: 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950 dark:via-purple-950 dark:to-indigo-950'
    },
    {
      id: 'privacy',
      title: 'Your Privacy Matters',
      subtitle: 'Browse with confidence and security',
      description: 'Advanced privacy protection, secure browsing, and private mode ensure your data stays safe while you explore the web.',
      icon: Shield,
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      bgPattern: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950'
    },
    {
      id: 'performance',
      title: 'Lightning Fast Performance',
      subtitle: 'Speed that keeps up with your thoughts',
      description: 'Optimized for performance with instant page loads, smooth scrolling, and efficient resource management.',
      icon: Zap,
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      bgPattern: 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950 dark:via-red-950 dark:to-pink-950'
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
      setIsAnimating(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
      setIsAnimating(false);
    }, 150);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 150);
  };

  const handleGetStarted = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className={`fixed inset-0 z-50 ${currentSlideData.bgPattern} transition-all duration-700 ease-in-out`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentSlideData.gradient} flex items-center justify-center`}>
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">Atom</span>
          </div>
          
          <button
            onClick={handleGetStarted}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Slide Content */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 pb-20">
          <div className={`transform transition-all duration-500 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            {/* Icon */}
            <div className="mb-8 relative">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${currentSlideData.gradient} flex items-center justify-center mx-auto shadow-2xl`}>
                <IconComponent className="w-12 h-12 text-white" />
              </div>
              <div className={`absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r ${currentSlideData.gradient} opacity-30 animate-ping mx-auto`}></div>
            </div>

            {/* Text Content */}
            <div className="text-center max-w-md mx-auto space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {currentSlideData.title}
              </h1>
              
              <h2 className={`text-lg font-semibold bg-gradient-to-r ${currentSlideData.gradient} bg-clip-text text-transparent`}>
                {currentSlideData.subtitle}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {currentSlideData.description}
              </p>
            </div>

            {/* Features List (only on relevant slides) */}
            {currentSlide === 1 && (
              <div className="mt-8 space-y-3 max-w-sm mx-auto">
                {[
                  'Private browsing mode',
                  'Advanced tracking protection',
                  'Secure data encryption'
                ].map((feature, index) => (
                  <div 
                    key={feature}
                    className="flex items-center space-x-3 animate-fadeInUp"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {currentSlide === 2 && (
              <div className="mt-8 space-y-3 max-w-sm mx-auto">
                {[
                  'Instant page loading',
                  'Optimized memory usage',
                  'Smooth animations'
                ].map((feature, index) => (
                  <div 
                    key={feature}
                    className="flex items-center space-x-3 animate-fadeInUp"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="p-8">
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? `bg-gradient-to-r ${currentSlideData.gradient} w-8` 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentSlide === 0 
                  ? 'opacity-40 cursor-not-allowed' 
                  : 'hover:bg-white/20 dark:hover:bg-black/20'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Back</span>
            </button>

            {currentSlide === slides.length - 1 ? (
              <button
                onClick={handleGetStarted}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r ${currentSlideData.gradient} text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={nextSlide}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r ${currentSlideData.gradient} text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};