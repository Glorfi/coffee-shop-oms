// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primary: '#0e2e2b', // (Navy Blue)
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
