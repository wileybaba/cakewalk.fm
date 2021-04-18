import React, { useEffect } from "react";
import { AppBox, Container } from "../components/StyledComponents";
import { Nav } from "../components/Nav";
import { fetchTrendingTracks } from "../services/audius";
import { useQuery } from "react-query";
import { TrackBox } from "../components/TrackBox";
import styled from "styled-components";

const TrackGrid = styled.main`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export function StationsPage() {
  const { isLoading, isError, data: trendingTracks, error } = useQuery(
    "audius-trending-tracks",
    fetchTrendingTracks,
    {
      staleTime: 1.8e6,
    }
  );

  useEffect(() => {
    const onlyPlayOneIn = (container) => {
      container.addEventListener(
        "play",
        function (event) {
          const audioElements = container.getElementsByTagName("audio");
          for (let i = 0; i < audioElements.length; i++) {
            const audioElement = audioElements[i];
            if (audioElement !== event.target) {
              audioElement.pause();
            }
          }
        },
        true
      );
    };
    onlyPlayOneIn(document.body);
  }, []);

  return (
    <Container>
      <AppBox width="100%" scroll>
        <Nav />
        <h1>Audius Top 100</h1>
        {isLoading && <span>Loading...</span>}
        {isError && <span>Error: {error.message}</span>}
        <TrackGrid>
          {trendingTracks?.data.slice(0, 25).map((track) => {
            return <TrackBox key={track.id} track={track} />;
          })}
        </TrackGrid>
      </AppBox>
    </Container>
  );
}
