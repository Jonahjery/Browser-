import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface WelcomeSlidesProps {
  onComplete: () => void;
}

export const WelcomeSlides: React.FC<WelcomeSlidesProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'welcome',
      title: 'Welcome to Atom Browser',
      subtitle: 'Fast, secure, and modern web browsing',
      description: 'Experience the web like never before with our cutting-edge browser designed for speed, privacy, and simplicity.',
      icon: 'globe',
      colors: ['#3B82F6', '#8B5CF6', '#6366F1'],
    },
    {
      id: 'privacy',
      title: 'Your Privacy Matters',
      subtitle: 'Browse with confidence and security',
      description: 'Advanced privacy protection, secure browsing, and private mode ensure your data stays safe while you explore the web.',
      icon: 'shield-checkmark',
      colors: ['#10B981', '#059669', '#047857'],
    },
    {
      id: 'performance',
      title: 'Lightning Fast Performance',
      subtitle: 'Speed that keeps up with your thoughts',
      description: 'Optimized for performance with instant page loads, smooth scrolling, and efficient resource management.',
      icon: 'flash',
      colors: ['#F59E0B', '#EF4444', '#EC4899'],
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <LinearGradient
      colors={currentSlideData.colors}
      style={styles.container}
    >
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="globe" size={24} color="#FFFFFF" />
          <Text style={styles.logoText}>Atom</Text>
        </View>
        
        <TouchableOpacity onPress={onComplete} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name={currentSlideData.icon as any} size={48} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>{currentSlideData.title}</Text>
        <Text style={styles.subtitle}>{currentSlideData.subtitle}</Text>
        <Text style={styles.description}>{currentSlideData.description}</Text>

        {/* Features for specific slides */}
        {currentSlide === 1 && (
          <View style={styles.features}>
            {[
              'Private browsing mode',
              'Advanced tracking protection',
              'Secure data encryption'
            ].map((feature, index) => (
              <View key={index} style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}

        {currentSlide === 2 && (
          <View style={styles.features}>
            {[
              'Instant page loading',
              'Optimized memory usage',
              'Smooth animations'
            ].map((feature, index) => (
              <View key={index} style={styles.feature}>
                <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToSlide(index)}
              style={[
                styles.progressDot,
                index === currentSlide && styles.progressDotActive
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            onPress={prevSlide}
            disabled={currentSlide === 0}
            style={[styles.navButton, currentSlide === 0 && styles.navButtonDisabled]}
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>

          {currentSlide === slides.length - 1 ? (
            <TouchableOpacity onPress={onComplete} style={styles.getStartedButton}>
              <Text style={styles.getStartedText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={nextSlide} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 200,
  },
  circle1: {
    width: 320,
    height: 320,
    top: -160,
    right: -160,
  },
  circle2: {
    width: 320,
    height: 320,
    bottom: -160,
    left: -160,
  },
  circle3: {
    width: 240,
    height: 240,
    top: height / 2 - 120,
    left: width / 2 - 120,
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
    maxWidth: 320,
  },
  features: {
    marginTop: 32,
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  bottomNav: {
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  progressDotActive: {
    width: 32,
    backgroundColor: '#FFFFFF',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  getStartedText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});