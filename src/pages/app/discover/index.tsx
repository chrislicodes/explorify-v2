import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <>
        <p>You are logged in: {JSON.stringify(session)}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return <button onClick={() => signIn()}>Login</button>;
};

export default Home;
