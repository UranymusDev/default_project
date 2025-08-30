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

// Animation utilities hook
export function useGSAPAnimations() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'power2.out' },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'power2.out' },
  };

  const slideInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'power2.out' },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: 'back.out(1.7)' },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return {
    fadeInUp,
    slideInLeft,
    slideInRight,
    scaleIn,
    stagger,
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