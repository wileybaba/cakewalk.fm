import { useEffect, useState } from "react";

export function useAqi(location) {
  const [aqiData, setAqiResponse] = useState(null);
  
  const fetchAqiData = async () => {
    const API_TOKEN = "cda51ff72813a889e7e04e7892bb92458b72cae1";
    try {
      const url = `http://api.waqi.info/feed/${location}/?token=${API_TOKEN}`;

      const response = await fetch(url);
      const json = await response.json();

      return json.data;

    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchAqiData().then(data => setAqiResponse(data));
  }, [location]);

  return { aqiData, fetchAqiData };
}