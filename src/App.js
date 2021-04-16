import React, { useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { Preferences } from "./Preferences";
import { Home } from "./Home";
import { AuthContextProvider, useAuthContext } from "./AuthProvider";
import * as themes from "./themes";
import HeroImage from "url:./assets/images/music_white.svg";
import tinycolor from "tinycolor2";
import ReactAudioPlayer from "react-audio-player";

const GlobalStyle = createGlobalStyle`
  body {
    position: absolute;
    margin: 0;
    font-family: "Roboto Condensed", sans-serif;
    color: ${(props) => props.theme.colors?.primary ?? "whitesmoke"};
    line-height: 1.5;
    font-weight: 400;
    transition: all 0.3s linear;

    background: ${(props) => props.theme.backgroundColor};
    background-image: ${(props) => props.theme.backgroundImage};

    h1, h2, h3, h4, h5, h6 {
      margin: 0 0 .5rem 0;
    }
  }

  img {
    transition: opacity 1s ease-in-out;
  }

  button {
    border: none;
    border-radius: 4px;
    padding: .5rem 1rem;
    cursor: pointer;
    font-size: 1.25em;

    &.basic {
      background-color: ${(props) => props.theme.colors?.secondary};
      color: white;

      &:hover {
        background-color: ${(props) =>
          tinycolor(props.theme.colors?.secondary)
            .darken()
            .desaturate()
            .toHexString()};
      }
    }
  }

  .error {
    color: red;
  }

  a {
    color: dodgerblue;
    :hover {
      color: #1E80FF;
    }
    text-decoration: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Box = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 1rem;
  width: ${(props) => props.width ?? "auto"};
`;

const AppBox = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin: 1.5rem;
    padding: 2rem;
  }

  h1 {
    margin: 0;
  }

  h2 {
    font-size: 1.65em;
    margin: 2rem 0;
    line-height: 1.2;
  }

  .input-with-button {
    display: grid;
    grid-template-columns: repeat(2, auto);
    overflow: auto;
  }

  input {
    width: 100%;
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 1.25rem;
    background: gunsmoke;
    font-size: 1.25em;
  }

  input:focus {
    border: 2px solid ${(props) => props.theme.colors?.secondary};
  }
`;

const EmojiButton = styled.button`
  background-color: ${(props) =>
    props.active ? "rgba(255,255,255,0.4)" : "transparent"};
  font-size: 2.25em;
  :hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const SpacerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => props.flexDirection ?? "row"};
`;

const AnimatedGradientText = styled.h1`
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: ${(props) => props.theme.heroGradient};
  background-size: 300%;
  background-position: 100%;
  animation: ${(props) =>
    props.animate
      ? "animated-gradient-text 3.5s infinite alternate-reverse"
      : ""};

  color: transparent;
  font-size: 6em;
  line-height: 0.9;

  @keyframes animated-gradient-text {
    from {
      background-position: 0%;
    }
    to {
      background-position: 100%;
    }
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 2fr;
  height: 100%;

  @media only screen and (max-width: 1024px) {
    grid-template-rows: 1fr min-content;
    grid-template-columns: auto;
  }
`;

function PrivateRoute({ children, ...rest }) {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <div>
          <h3>Bienvenidos.</h3>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>{" "}
          or{" "}
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
        </div>
      </Route>

      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <PrivateRoute exact path="/preferences">
        <Preferences />
      </PrivateRoute>
      <PrivateRoute exact path="/home">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default function App() {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : themes.spaceTheme;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <GlobalStyle />
        <Container>
          <AppBox width="fit-content">
            <HeroGrid>
              {/* <Nav>
                  <h3>cakewalk.fm</h3>
                  <div>
                    <a href="#">Features</a>
                    <a href="#">Features</a>
                  </div>
                </Nav> */}
              <SpacerContainer flexDirection="column">
                <div>
                  <div>
                    <AnimatedGradientText animate>
                      Internet radio
                    </AnimatedGradientText>
                    <AnimatedGradientText>
                      in the age of cryptocurrency
                    </AnimatedGradientText>
                  </div>
                  <h2>
                    Radio is time tested entertainment that is here to stay.
                    Cakewalk.fm is a new music community and internet radio
                    platform that empowers artists, broadcasters, and listeners.
                    Discover new music, ideas, and cultures. Get your music into
                    peoples ears. Support your favorite artists. Broadcast your
                    favorite music to the world, and get paid to do it. Welcome
                    to the future of radio.
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
                <img src={HeroImage} style={{ maxWidth: "100%" }} />
                {/* <ReactAudioPlayer
                src="https://playerservices.streamtheworld.com/api/livestream-redirect/WFANAM.mp3"
                autoPlay
                controls
              /> */}
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
      </AuthContextProvider>
    </ThemeProvider>
  );
}
