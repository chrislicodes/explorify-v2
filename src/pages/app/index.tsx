import { VStack, StackDivider, Box, chakra, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import useSWR from 'swr';
import { TopArtist } from '../api/spotify/top/artists';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ArtistImage = chakra(Image, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: (prop) =>
    ['width', 'height', 'src', 'alt', 'layout', 'priority'].includes(prop),
});

const App: NextPage = () => {
  const { data: topArtists, error } = useSWR<{ items: TopArtist[] }>(
    '/api/spotify/top/artists',
    fetcher
  );

  return (
    <>
      <p>App Protected Area</p>
      <Button
        onClick={async () => {
          signOut({
            callbackUrl: `${window.location.origin}`,
          });
        }}
        variant="solid"
        colorScheme={'green'}
      >
        Sign Out
      </Button>
      {!topArtists && <p>Loading ..</p>}
      {topArtists && (
        <VStack
          divider={<StackDivider borderColor="spotify.primary" />}
          spacing={4}
          align="stretch"
        >
          {topArtists.items.map((topArtist) => (
            <Box key={topArtist.id} display="flex" gap={3}>
              <Box width={64} height={64} position="relative">
                <ArtistImage
                  src={topArtist.images[0].url}
                  layout="fill"
                  priority
                />
              </Box>
              <Box display="flex" flexDirection="column">
                <p>Name: {topArtist.name}</p>
                <p>Popularity: {topArtist.popularity}</p>
                <p>Genres: {topArtist.genres.join(', ')}</p>
              </Box>
            </Box>
          ))}
        </VStack>
      )}
    </>
  );
};

export default App;
