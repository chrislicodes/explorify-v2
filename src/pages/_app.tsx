import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'src/styles/theme';
import SidebarWithHeader from 'src/components/navigation';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout;

  return (
    <ChakraProvider resetCSS theme={theme}>
      <SessionProvider session={session}>
        {(getLayout && getLayout(<Component {...pageProps} />)) || (
          <SidebarWithHeader>
            <Component {...pageProps} />
          </SidebarWithHeader>
        )}
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
