import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'src/styles/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
