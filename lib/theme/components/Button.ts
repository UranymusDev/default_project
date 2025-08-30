import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  fontWeight: 'semibold',
  borderRadius: 'lg',
  transition: 'all 0.2s',
  _focus: {
    boxShadow: 'outline',
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
});

const sizes = {
  sm: defineStyle({
    h: 8,
    minW: 8,
    fontSize: 'sm',
    px: 3,
  }),
  md: defineStyle({
    h: 10,
    minW: 10,
    fontSize: 'md',
    px: 4,
  }),
  lg: defineStyle({
    h: 12,
    minW: 12,
    fontSize: 'lg',
    px: 6,
  }),
  xl: defineStyle({
    h: 14,
    minW: 14,
    fontSize: 'xl',
    px: 8,
  }),
};

const variants = {
  solid: defineStyle({
    bg: 'primary.500',
    color: 'white',
    _hover: {
      bg: 'primary.600',
      transform: 'translateY(-2px)',
      boxShadow: 'lg',
      _disabled: {
        bg: 'primary.500',
        transform: 'none',
        boxShadow: 'none',
      },
    },
    _active: {
      bg: 'primary.700',
      transform: 'translateY(0)',
    },
  }),
  outline: defineStyle({
    borderWidth: '2px',
    borderColor: 'primary.500',
    color: 'primary.500',
    _hover: {
      bg: 'primary.50',
      transform: 'translateY(-2px)',
      boxShadow: 'md',
      _disabled: {
        bg: 'transparent',
        transform: 'none',
        boxShadow: 'none',
      },
    },
    _active: {
      bg: 'primary.100',
      transform: 'translateY(0)',
    },
  }),
  ghost: defineStyle({
    color: 'primary.500',
    _hover: {
      bg: 'primary.50',
      transform: 'translateY(-1px)',
      _disabled: {
        bg: 'transparent',
        transform: 'none',
      },
    },
    _active: {
      bg: 'primary.100',
      transform: 'translateY(0)',
    },
  }),
  gradient: defineStyle({
    bgGradient: 'linear(45deg, primary.500, secondary.500)',
    color: 'white',
    _hover: {
      bgGradient: 'linear(45deg, primary.600, secondary.600)',
      transform: 'translateY(-2px)',
      boxShadow: 'brand-lg',
      _disabled: {
        bgGradient: 'linear(45deg, primary.500, secondary.500)',
        transform: 'none',
        boxShadow: 'none',
      },
    },
    _active: {
      bgGradient: 'linear(45deg, primary.700, secondary.700)',
      transform: 'translateY(0)',
    },
  }),
};

export const Button = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
});