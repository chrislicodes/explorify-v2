const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const BASE_ENDPOINT = 'https://api.spotify.com/v1/me';

export const getAccessToken = async (refresh_token: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersTopArtists = async (
  refreshToken: string,
  timeRange: 'short_term' | 'medium_term' | 'long_term',
  limit: number
) => {
  const { access_token } = await getAccessToken(refreshToken);

  return fetch(
    `${BASE_ENDPOINT}/top/artists?time_range=${timeRange}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};
