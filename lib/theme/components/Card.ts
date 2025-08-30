import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: defineStyle({
    backgroundColor: 'var(--card-bg)',
    borderRadius: 'xl',
    borderWidth: '1px',
    borderColor: 'var(--card-border)',
    boxShadow: 'sm',
    transition: 'all 0.2s',
    _hover: {
      transform: 'translateY(-4px)',
      boxShadow: 'xl',
    },
  }),
  header: defineStyle({
    pb: 2,
  }),
  body: defineStyle({
    py: 2,
  }),
  footer: defineStyle({
    pt: 2,
  }),
});

const variants = {
  elevated: definePartsStyle({
    container: defineStyle({
      boxShadow: 'md',
      _hover: {
        boxShadow: '2xl',
      },
    }),
  }),
  outline: definePartsStyle({
    container: defineStyle({
      borderWidth: '2px',
      boxShadow: 'none',
      _hover: {
        boxShadow: 'md',
      },
    }),
  }),
  filled: definePartsStyle({
    container: defineStyle({
      backgroundColor: 'var(--card-filled-bg)',
      borderWidth: 0,
    }),
  }),
  gradient: definePartsStyle({
    container: defineStyle({
      bgGradient: 'linear(135deg, var(--card-gradient-from), var(--card-gradient-to))',
      borderWidth: 0,
      color: 'white',
      _hover: {
        transform: 'translateY(-6px)',
        boxShadow: 'brand-lg',
      },
    }),
  }),
};

const sizes = {
  sm: definePartsStyle({
    container: defineStyle({
      p: 3,
    }),
  }),
  md: definePartsStyle({
    container: defineStyle({
      p: 5,
    }),
  }),
  lg: definePartsStyle({
    container: defineStyle({
      p: 6,
    }),
  }),
};

export const Card = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'elevated',
    size: 'md',
  },
});