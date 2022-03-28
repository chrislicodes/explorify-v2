import type { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const App: NextPage = () => {
  return (
    <>
      <p>App Protected Area</p>
      <button
        onClick={async () => {
          signOut({
            callbackUrl: `${window.location.origin}`,
          });
        }}
      >
        Sign Out
      </button>
    </>
  );
};

export default App;
