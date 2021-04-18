import React from "react";
import HeroImage from "url:../assets/images/music_white.svg";
import { useTheme } from "../hooks/useTheme";
import {
  Box,
  AppBox,
  EmojiButton,
  SpacerContainer,
  AnimatedGradientText,
  HeroGrid,
  Container,
} from "../components/StyledComponents";
import { Nav } from "../components/Nav";
import * as themes from "../themes";

export function LandingPage({ theme, setTheme, children }) {
  return (
    <Container>
      {children}
      <AppBox width="fit-content">
        <Nav />
        <HeroGrid>
          <SpacerContainer flexDirection="column">
            <div>
              <div>
                <AnimatedGradientText animate>
                  Internet radio
                </AnimatedGradientText>
                <AnimatedGradientText>built for community</AnimatedGradientText>
              </div>
              <h2>
                Radio is time tested entertainment that is here to stay.
                Cakewalk.fm is a new music community and internet radio platform
                that empowers artists, broadcasters, and listeners. Discover new
                music, ideas, and cultures. Get your music into peoples ears.
                Support your favorite artists. Broadcast your favorite music to
                the world, and get paid to do it. Welcome to the future of
                radio.
              </h2>
            </div>
            <Box>
              <div className="input-with-button">
                <input type="text" placeholder="Enter email address" />
                <button className="basic">Get early access</button>
              </div>
            </Box>
          </SpacerContainer>
          <SpacerContainer flexDirection="column">
            <img
              src={HeroImage}
              style={{
                maxWidth: "100%",
                maxHeight: "80%",
                marginBottom: "1.5rem",
              }}
            />
            <Box>
              <SpacerContainer>
                <EmojiButton
                  active={theme.name === "flamingo"}
                  onClick={() => setTheme(themes.flamingoTheme)}
                >
                  🦩
                </EmojiButton>
                <EmojiButton
                  active={theme.name === "space"}
                  onClick={() => setTheme(themes.spaceTheme)}
                >
                  🌑
                </EmojiButton>
                <EmojiButton
                  active={theme.name === "siesta"}
                  onClick={() => setTheme(themes.siestaTheme)}
                >
                  🏖️
                </EmojiButton>
                <EmojiButton
                  active={theme.name === "deep blue"}
                  onClick={() => setTheme(themes.deepBlueTheme)}
                >
                  🧿
                </EmojiButton>
                <EmojiButton
                  active={theme.name === "spring"}
                  onClick={() => setTheme(themes.springTheme)}
                >
                  🌱
                </EmojiButton>
              </SpacerContainer>
            </Box>
          </SpacerContainer>
        </HeroGrid>
      </AppBox>
    </Container>
  );
}
