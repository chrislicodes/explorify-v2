import type { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';

const Login: NextPage = () => {
  return (
    <button
      onClick={() =>
        signIn(undefined, {
          callbackUrl: `${window.location.origin}/app`,
        })
      }
    >
      Login
    </button>
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
