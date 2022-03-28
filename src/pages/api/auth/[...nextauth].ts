import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const SCOPE = [
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'user-top-read',
  'playlist-modify-private',
];

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: {
        params: { scope: SCOPE.join(' ') },
      },
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
  },
});
