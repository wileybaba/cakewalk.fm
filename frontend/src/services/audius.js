import request from "./request";

const fetchRandomAudiusEndpoint = async () => {
  const json = await request("https://api.audius.co");
  const urls = json.data;
  return urls[Math.floor(Math.random() * urls.length)];
};

export const fetchTrendingTracks = async () => {
  console.log("Fetching tracks");
  const url = `${await fetchRandomAudiusEndpoint()}/v1/tracks/trending?app_name=LUNCHTIMEFM`;
  return await request(url);
};

export const fetchTrackStream = async (trackId) => {
  const url = `${await fetchRandomAudiusEndpoint()}/v1/tracks/${trackId}/stream?app_name=LUNCHTIMEFM`;
  const response = await fetch(url);
  return response.url;
};
