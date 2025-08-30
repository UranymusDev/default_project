import { useColorMode, useTheme, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { colors, colorSchemes, type ColorScheme } from './colors';

// Theme switching hook
export function useThemeScheme() {
  const [currentScheme, setCurrentScheme] = useState<string>('ocean');
  const { colorMode, toggleColorMode } = useColorMode();

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme-scheme');
    if (saved && colorSchemes[saved]) {
      setCurrentScheme(saved);
      applyThemeScheme(saved);
    }
  }, []);

  const applyThemeScheme = (schemeName: string) => {
    if (!colorSchemes[schemeName]) return;

    const scheme = colorSchemes[schemeName];
    const root = document.documentElement;

    // Update CSS custom properties
    const primaryColors = colors[scheme.primary as keyof typeof colors];
    const secondaryColors = colors[scheme.secondary as keyof typeof colors];
    const accentColors = colors[scheme.accent as keyof typeof colors];

    if (primaryColors && secondaryColors && accentColors) {
      Object.entries(primaryColors).forEach(([shade, value]) => {
        root.style.setProperty(`--chakra-colors-primary-${shade}`, value);
      });
      
      Object.entries(secondaryColors).forEach(([shade, value]) => {
        root.style.setProperty(`--chakra-colors-secondary-${shade}`, value);
      });
      
      Object.entries(accentColors).forEach(([shade, value]) => {
        root.style.setProperty(`--chakra-colors-accent-${shade}`, value);
      });

      // Update current color variables
      root.style.setProperty('--current-primary', `var(--chakra-colors-primary-500)`);
      root.style.setProperty('--current-secondary', `var(--chakra-colors-secondary-500)`);
      root.style.setProperty('--current-accent', `var(--chakra-colors-accent-500)`);
    }
  };

  const changeThemeScheme = (schemeName: string) => {
    if (!colorSchemes[schemeName]) return;

    setCurrentScheme(schemeName);
    localStorage.setItem('theme-scheme', schemeName);
    applyThemeScheme(schemeName);
  };

  return {
    currentScheme,
    schemes: colorSchemes,
    colorMode,
    toggleColorMode,
    changeThemeScheme,
  };
}

// GSAP Animation hook
export function useGSAPAnimations() {
  const { useEffect, useRef } = require('react');
  const gsap = require('gsap');

  // Helper to create refs for elements
  const createAnimationRef = () => useRef<HTMLElement>(null);

  // Animation functions that work with refs
  const fadeInUp = (element: HTMLElement | null, delay: number = 0) => {
    if (!element) return;
    gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power2.out' }
    );
  };

  const slideInLeft = (element: HTMLElement | null, delay: number = 0) => {
    if (!element) return;
    gsap.fromTo(element,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power2.out' }
    );
  };

  const slideInRight = (element: HTMLElement | null, delay: number = 0) => {
    if (!element) return;
    gsap.fromTo(element,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power2.out' }
    );
  };

  const scaleIn = (element: HTMLElement | null, delay: number = 0) => {
    if (!element) return;
    gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, delay, ease: 'back.out(1.7)' }
    );
  };

  const staggerChildren = (elements: HTMLElement[], animation: 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' = 'fadeInUp') => {
    elements.forEach((el, index) => {
      const delay = index * 0.1;
      switch (animation) {
        case 'fadeInUp': fadeInUp(el, delay); break;
        case 'slideInLeft': slideInLeft(el, delay); break;
        case 'slideInRight': slideInRight(el, delay); break;
        case 'scaleIn': scaleIn(el, delay); break;
      }
    });
  };

  return {
    createAnimationRef,
    fadeInUp,
    slideInLeft,
    slideInRight,
    scaleIn,
    staggerChildren,
  };
}

// Responsive design hook
export function useResponsiveValue<T>(values: T[] | Record<string, T>) {
  const theme = useTheme();
  
  if (Array.isArray(values)) {
    return useColorModeValue(values, values);
  }
  
  return values;
}

// Dark mode utilities
export function useDarkModeColors() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const surfaceBg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subtleText = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const shadowColor = useColorModeValue('sm', 'dark-sm');

  return {
    bgColor,
    surfaceBg,
    textColor,
    subtleText,
    borderColor,
    shadowColor,
  };
}