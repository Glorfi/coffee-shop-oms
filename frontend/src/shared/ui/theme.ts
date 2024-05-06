// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primary: '#14473f', // #0e2e2b dark green base #14473f
  darkGreen: {
    50: '#e4fbf8',
    100: '#c3eee7',
    200: '#a0e2d8',
    300: '#7bd7c8',
    400: '#59ccb8',
    500: '#14473f',
    600: '#328a7c',
    700: '#226258',
    800: '#113c35',
    900: '#001512',
  },
  // darkGreen: {
  //   50: '#e4fbf9',
  //   100: '#c4ede9',
  //   200: '#a1e0db',
  //   300: '#7dd4cb',
  //   400: '#5cc8bd',
  //   500: '#0e2e2b',
  //   600: '#348880',
  //   700: '#24615b',
  //   800: '#123b37',
  //   900: '#001512',
  // },
  accent: {
    50: '#ffebe2',
    100: '#f6c9be',
    200: '#e9a796',
    300: '#de856d',
    400: '#d46245',
    500: '#ba482b',
    600: '#923721',
    700: '#682717',
    800: '#41160a',
    900: '#1d0400',
  },
};

const breakboints = {
  breakpoints: {
    base: '0px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

const fonts = {
  heading: `'Nunito', 'Noto Sans Armenian', sans-serif`,
  body: `'Nunito', 'Noto Sans Armenian', sans-serif`,
};

// const components = {
//   Text: textTheme,
// };

export const theme = extendTheme({ colors, breakboints, fonts });
