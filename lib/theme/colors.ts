export const colors = {
  // Brand Colors - Ocean Blue Theme
  brand: {
    50: '#e6f3ff',
    100: '#b3d9ff',
    200: '#80bfff',
    300: '#4da6ff',
    400: '#1a8cff',
    500: '#0073e6',
    600: '#005bb3',
    700: '#004280',
    800: '#002a4d',
    900: '#00111a',
  },
  
  // Primary Theme - Ocean Blue
  primary: {
    25: '#f0f8ff', // Very light background
    50: '#e6f3ff',
    100: '#b3d9ff',
    200: '#80bfff',
    300: '#4da6ff',
    400: '#1a8cff',
    500: '#0073e6',
    600: '#005bb3',
    700: '#004280',
    800: '#002a4d',
    900: '#00111a',
  },

  // Secondary Theme - Sunset Orange
  secondary: {
    25: '#fff8f0',
    50: '#fff3e6',
    100: '#ffd9b3',
    200: '#ffbf80',
    300: '#ffa64d',
    400: '#ff8c1a',
    500: '#e67300',
    600: '#b35b00',
    700: '#804200',
    800: '#4d2a00',
    900: '#1a1100',
  },

  // Accent Colors - Forest Green
  accent: {
    25: '#f0fff4',
    50: '#e6fffa',
    100: '#b3f5d1',
    200: '#81e6a8',
    300: '#51d88a',
    400: '#31c971',
    500: '#22bb5b',
    600: '#1a9447',
    700: '#166f36',
    800: '#0f4926',
    900: '#0a2817',
  },

  // Alternative Theme Colors for Multi-Theme Support
  royal: {
    25: '#f8f7ff',
    50: '#f1ecff',
    100: '#d4c7ff',
    200: '#b8a2ff',
    300: '#9b7dff',
    400: '#7e58ff',
    500: '#6133ff',
    600: '#4e26d9',
    700: '#3b1ab3',
    800: '#28108c',
    900: '#150866',
  },

  teal: {
    25: '#f0fffe',
    50: '#e6fffd',
    100: '#b3fff7',
    200: '#80fff1',
    300: '#4dffeb',
    400: '#1affe5',
    500: '#00e6cc',
    600: '#00b3a3',
    700: '#00807a',
    800: '#004d4a',
    900: '#001a1a',
  },

  cherry: {
    25: '#fff8f8',
    50: '#ffe6e6',
    100: '#ffb3cc',
    200: '#ff80b3',
    300: '#ff4d99',
    400: '#ff1a80',
    500: '#e60066',
    600: '#b3004d',
    700: '#800033',
    800: '#4d001a',
    900: '#1a0008',
  },

  // System Colors
  gray: {
    25: '#fcfcfd',
    50: '#f9fafb',
    100: '#f2f4f7',
    200: '#eaecf0',
    300: '#d0d5dd',
    400: '#98a2b3',
    500: '#667085',
    600: '#475467',
    700: '#344054',
    800: '#1d2939',
    900: '#101828',
  },

  // Status Colors
  success: {
    25: '#f6fef9',
    50: '#ecfdf3',
    100: '#d1fadf',
    200: '#a6f4c5',
    300: '#6ce9a6',
    400: '#32d583',
    500: '#12b76a',
    600: '#039855',
    700: '#027a48',
    800: '#05603a',
    900: '#054f31',
  },

  warning: {
    25: '#fffcf5',
    50: '#fffaeb',
    100: '#fef0c7',
    200: '#fedf89',
    300: '#fec84b',
    400: '#fdb022',
    500: '#f79009',
    600: '#dc6803',
    700: '#b54708',
    800: '#93370d',
    900: '#7a2e0e',
  },

  error: {
    25: '#fffbfa',
    50: '#fef3f2',
    100: '#fee4e2',
    200: '#fecdca',
    300: '#fda29b',
    400: '#f97066',
    500: '#f04438',
    600: '#d92d20',
    700: '#b42318',
    800: '#912018',
    900: '#7a271a',
  },

  info: {
    25: '#f5fbff',
    50: '#eff8ff',
    100: '#d1e9ff',
    200: '#b2ddff',
    300: '#84caff',
    400: '#53b1fd',
    500: '#2e90fa',
    600: '#1570ef',
    700: '#175cd3',
    800: '#1849a9',
    900: '#194185',
  },
};

export type ColorScheme = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  description: string;
};

export const colorSchemes: Record<string, ColorScheme> = {
  ocean: {
    name: 'Ocean Blue',
    primary: 'primary',
    secondary: 'secondary', 
    accent: 'accent',
    description: 'Deep ocean blues with warm orange accents',
  },
  royal: {
    name: 'Royal Purple',
    primary: 'royal',
    secondary: 'accent',
    accent: 'secondary',
    description: 'Rich purples with forest green highlights',
  },
  forest: {
    name: 'Forest Green',
    primary: 'accent',
    secondary: 'primary',
    accent: 'royal',
    description: 'Natural forest greens with ocean blue accents',
  },
  sunset: {
    name: 'Sunset Orange',
    primary: 'secondary',
    secondary: 'royal',
    accent: 'accent',
    description: 'Warm sunset oranges with purple undertones',
  },
  teal: {
    name: 'Teal Wave',
    primary: 'teal',
    secondary: 'accent',
    accent: 'secondary',
    description: 'Refreshing teal with natural green accents',
  },
  cherry: {
    name: 'Cherry Blossom',
    primary: 'cherry',
    secondary: 'accent',
    accent: 'royal',
    description: 'Soft cherry pinks with purple and green accents',
  },
};