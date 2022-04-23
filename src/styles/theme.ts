import {
  Colors,
  extendTheme,
  ThemeConfig,
  ThemeOverride,
} from '@chakra-ui/react';
import { mode, Styles } from '@chakra-ui/theme-tools';

const colors: Colors = {
  spotify: {
    primary: '#1db954',
    logo: '#1ed760',
  },
  shades: {
    black: '#121212',
    gray_1: '#1c1c1c',
    gray_1_90: 'rgba(28, 28, 28, 0.9)',
    gray_1_70: 'rgba(28, 28, 28, 0.7)',
    gray_1_50: 'rgba(28, 28, 28, 0.5)',
    gray_1_30: 'rgba(28, 28, 28, 0.3)',
    gray_2: '#2e2e2e',
    gray_3: '#5c5c5c',
    gray_4: '#9c9898',
    gray_5: '#a3a3a3',
    gray_6: '#b6b6b6',
    white: '#f1f1f1',
  },
};

const config: ThemeConfig = {
  useSystemColorMode: true,
};

const styles: Styles = {
  global: (props) => ({
    'html, body': {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      backgroundColor: mode('shades.white', 'shades.gray_1')(props),
      overflowX: 'hidden',
    },
  }),
};

const fonts = {
  heading: 'Roboto, sans-serif',
  body: 'Roboto, sans-serif',
};

const overrides: ThemeOverride = {
  colors,
  config,
  styles,
  fonts,
};

export const theme = extendTheme(overrides);
