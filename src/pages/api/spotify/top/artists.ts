import { getUsersTopArtists } from 'src/lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { ImageObject, UserTopArtistResponse } from 'src/types/spotify';

export type TopArtist = {
  id: string;
  genres: string[];
  images: ImageObject[];
  popularity: number;
  name: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ items: TopArtist[] }>
) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!token || !token.accessToken) return res.status(401).end();

  const response = await getUsersTopArtists(
    token.accessToken,
    'short_term',
    10
  );

  const { items }: UserTopArtistResponse = await response.json();

  return res.status(200).json({
    items: items.map((artist) => ({
      id: artist.id,
      genres: artist.genres,
      images: artist.images,
      popularity: artist.popularity,
      name: artist.name,
    })),
  });
};

export default handler;
