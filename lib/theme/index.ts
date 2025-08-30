import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { colors } from './colors';
import { components } from './components';
import { foundations } from './foundations';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  cssVarPrefix: 'chakra',
  disableTransitionOnChange: false,
};

const theme = extendTheme({
  config,
  colors,
  components,
  ...foundations,
  styles: {
    global: (props) => ({
      // CSS Custom Properties for Dynamic Theming
      ':root': {
        '--current-primary': 'var(--chakra-colors-primary-500)',
        '--current-secondary': 'var(--chakra-colors-secondary-500)',
        '--current-accent': 'var(--chakra-colors-accent-500)',
        '--card-bg': props.colorMode === 'dark' ? 'var(--chakra-colors-gray-800)' : 'white',
        '--card-border': props.colorMode === 'dark' ? 'var(--chakra-colors-gray-700)' : 'var(--chakra-colors-gray-200)',
        '--card-filled-bg': props.colorMode === 'dark' ? 'var(--chakra-colors-gray-900)' : 'var(--chakra-colors-primary-25)',
        '--card-gradient-from': 'var(--current-primary)',
        '--card-gradient-to': 'var(--current-secondary)',
      },
      
      // Global Styles
      'html, body': {
        fontFamily: 'body',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
        bg: props.colorMode === 'dark' ? 'gray.900' : 'var(--chakra-colors-primary-25, #f0f8ff)',
        lineHeight: 'base',
        scrollBehavior: 'smooth',
      },

      // Placeholder styles
      '*::placeholder': {
        color: props.colorMode === 'dark' ? 'gray.400' : 'gray.400',
      },

      // Border colors
      '*, *::before, &::after': {
        borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      },

      // Container borders
      '.chakra-container': {
        borderColor: 'transparent !important',
      },

      // Brand utilities
      '.brand-gradient': {
        background: 'linear-gradient(45deg, var(--current-primary), var(--current-secondary))',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
      },

      '.card-hover': {
        transition: 'all 0.2s',
        _hover: {
          transform: 'translateY(-4px)',
          boxShadow: 'xl',
        },
      },

      '.gsap-fade-in': {
        opacity: 0,
        transform: 'translateY(20px)',
      },

      '.gsap-slide-in-left': {
        opacity: 0,
        transform: 'translateX(-50px)',
      },

      '.gsap-slide-in-right': {
        opacity: 0,
        transform: 'translateX(50px)',
      },

      '.gsap-scale-in': {
        opacity: 0,
        transform: 'scale(0.8)',
      },

      // Theme transitions
      'body, .theme-transition': {
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },

      '*': {
        transition: 'border-color 0.2s ease',
      },

      // Custom scrollbar
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
        borderRadius: 'full',
      },
      '::-webkit-scrollbar-thumb': {
        bg: 'var(--current-primary)',
        borderRadius: 'full',
        _hover: {
          bg: props.colorMode === 'dark' ? 'gray.500' : 'gray.500',
        },
      },

      // Focus styles
      '.focus-visible': {
        outline: '2px solid var(--current-primary)',
        outlineOffset: '2px',
      },

      // Animation utilities
      '.animate-pulse': {
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      '@keyframes pulse': {
        '0%, 100%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0.5,
        },
      },

      '.animate-bounce': {
        animation: 'bounce 1s infinite',
      },

      '@keyframes bounce': {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        },
        '50%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        },
      },
    }),
  },
  semanticTokens: {
    colors: {
      'bg-surface': {
        default: 'white',
        _dark: 'gray.800',
      },
      'bg-subtle': {
        default: 'gray.50',
        _dark: 'gray.900',
      },
      'bg-muted': {
        default: 'gray.100',
        _dark: 'gray.700',
      },
      text: {
        default: 'gray.900',
        _dark: 'gray.100',
      },
      'text-subtle': {
        default: 'gray.600',
        _dark: 'gray.400',
      },
      'text-muted': {
        default: 'gray.500',
        _dark: 'gray.500',
      },
      border: {
        default: 'gray.200',
        _dark: 'gray.700',
      },
      'border-subtle': {
        default: 'gray.100',
        _dark: 'gray.800',
      },
    },
  },
});

export default theme;