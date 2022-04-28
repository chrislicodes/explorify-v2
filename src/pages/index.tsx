import { Box, Button } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Login: NextPageWithLayout = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        onClick={() =>
          signIn('spotify', {
            callbackUrl: `${window.location.origin}/app`,
          })
        }
        variant="solid"
        colorScheme={'green'}
      >
        Login To Spotify
      </Button>
    </Box>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
