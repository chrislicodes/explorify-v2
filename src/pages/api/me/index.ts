import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export type User = {
  name: string;
  imageUrl: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ user: User }>
) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!token || !token.accessToken) return res.status(401).end();

  return res.status(200).json({
    user: {
      name: token.name || 'No Name',
      imageUrl: token.picture || '',
    },
  });
};

export default handler;
