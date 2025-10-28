import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const torTheme = extendTheme({
  config,
  fonts: {
    heading: `'Space Mono', monospace`,
    body: `'Roboto', sans-serif`,
  },
  colors: {
    tor: {
      // Tor purple shades
      50: '#f5e9ff',
      100: '#ddc2f4',
      200: '#c59be8',
      300: '#ad73dd',
      400: '#964cd1',
      500: '#7d33b8', // Main Tor purple
      600: '#61278f',
      700: '#461b67',
      800: '#2b1040',
      900: '#13051b',
    },
    onion: {
      // Onion-inspired warm tones
      50: '#fff5eb',
      100: '#ffe0c2',
      200: '#ffcb99',
      300: '#ffb670',
      400: '#ffa147',
      500: '#e6882d',
      600: '#b46a22',
      700: '#824c18',
      800: '#502e0d',
      900: '#1f1000',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#1A202C' : '#F7FAFC',
        color: props.colorMode === 'dark' ? 'rgba(255, 255, 255, 0.92)' : '#212335',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        tor: {
          bg: 'tor.500',
          color: 'white',
          _hover: {
            bg: 'tor.600',
          },
        },
      },
    },
    Badge: {
      variants: {
        wip: {
          bg: 'orange.500',
          color: 'white',
        },
        native: {
          bg: 'green.500',
          color: 'white',
        },
        snowflake: {
          bg: 'blue.400',
          color: 'white',
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' ? '#2D3748' : 'white',
          borderRadius: 'lg',
          overflow: 'hidden',
          transition: 'all 0.3s',
          _hover: {
            transform: 'translateY(-4px)',
            shadow: 'xl',
          },
        },
      }),
    },
  },
});

export default torTheme;
