import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { useQuery } from "react-query";
import { fetchTrackStream } from "../services/audius";
import { Box } from "./StyledComponents";
import styled from "styled-components";

const BoxGrid = styled(Box)`
  display: grid;
  grid-gap: 1rem;
  grid-template-areas:
    "image title"
    "image description"
    "image audio";
  grid-template-columns: 175px auto;
  position: relative;

  .title {
    grid-area: title;
  }
  h1 {
    font-size: 1.5em;
    margin: 0;
  }
  h2 {
    font-size: 1.2em;
  }
  .description {
    margin: 0;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    grid-area: description;
  }

  .audio {
    grid-area: audio;
  }

  img {
    width: 175px;
    grid-area: image;
    border-radius: 4px;
  }

  @media (max-width: 760px) {
    grid-template-areas:
      "image title"
      "image description"
      "audio audio";
  }
`;

const Pill = styled.span`
  border-radius: 8px;
  width: fit-content;
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.colors.secondary};
`;

export function TrackBox({ track }) {
  const { isLoading, isError, data: streamUrl, error } = useQuery(
    ["track-stream", track.id],
    () => fetchTrackStream(track.id),
    {
      staleTime: 3.154e10,
    }
  );

  return (
    <BoxGrid background="rgba(255, 255, 255, 0.3);">
      <div className="title">
        <h3>{track.title}</h3>
        <Pill>{track.genre}</Pill>
      </div>
      <p className="description">{track.description}</p>

      <img src={track.artwork["150x150"]} />

      <div className="audio">
        <audio
          src={streamUrl}
          controls
          preload="none"
          style={{ borderRadius: "4px" }}
        />
      </div>
    </BoxGrid>
  );
}
