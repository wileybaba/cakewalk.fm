import styled, { createGlobalStyle } from "styled-components";
import tinycolor from "tinycolor2";

export const GlobalStyle = createGlobalStyle`
  body {
    position: absolute;
    overflow-y: scroll;
    width: 100%;
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

  button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: .5rem 1rem;
    font-size: 1.25em;
    background-color: ${(props) => props.theme.colors?.secondary};
    color: white;
    &:hover {
      background-color: ${(props) =>
    tinycolor(props.theme.colors?.secondary)
      .darken()
      .desaturate()
      .toHexString()};
    }

    &:disabled {
      background-color: lightgray;
      cursor: not-allowed;
    }
  }

  .error {
    color: red;
    margin: 0;
  }

  a {
    color: ${(props) => props.theme.colors?.secondary};
    :hover {
      color:${(props) =>
        tinycolor(props.theme.colors?.secondary)
          .darken()
          .desaturate()
          .toHexString()};
    }
    text-decoration: none;
  }

  a.nav-link {
    color: ${(props) => props.theme.colors?.primary};
    :hover {
      color:${(props) =>
        tinycolor(props.theme.colors?.primary)
          .darken()
          .desaturate()
          .toHexString()};
    }
  }

  .mission {
    p {
      font-size: 1.365em;
    }
  }
`;

export const PaddingContainer = styled.div`
  padding: 3rem 5rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
  height: 3.5rem;

  @media only screen and (max-width: 760px) {
    display: none;
  }

  a:not(.logo) {
    margin: 0 1rem;
  }
`;

export const StyledForm = styled.form`
  input {
    margin: 0 0 0.5rem 0;
    width: 100%;
    font-size: 1.25rem;
    padding: 1.5rem 0;
    height: 3.5rem;
    border: none;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    background: #fff;
    box-sizing: border-box;
    transition: all 0.3s linear;
    color: #000;
    font-weight: 400;
    -webkit-appearance: none;
    &:focus {
      border-bottom: solid 1px ${({ theme }) => theme.colors.secondary};
      outline: 0;
      box-shadow: 0 2px 6px -8px ${({ theme }) => theme.colors.secondary};
    }
  }
  .floating-label {
    position: relative;
    label {
      color: ${({ theme }) => theme.colors.secondary};
      position: absolute;
      top: calc(50% - 1rem);
      left: 0;
      opacity: 0;
      transition: all 0.3s ease;
      cursor: text;
    }
    input:not(:placeholder-shown) {
      padding: 28px 0px 12px 0px;
    }
    input:not(:placeholder-shown) + label {
      transform: translateY(-10px);
      opacity: 0.7;
    }
  }

  button {
    width: 100%;
  }
`;

export const MobileNavBar = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  height: 3.5rem;

  @media only screen and (min-width: 761px) {
    display: none;
  }
`;

export const Box = styled.div`
  background: ${(props) => props.background ?? "rgba(255, 255, 255, 0.2)"};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 1rem;
  width: ${(props) => props.width ?? "auto"};
`;

export const AppBox = styled(Box)`
  @media only screen and (min-width: 768px) {
    padding: 2rem;
    width: 90%;
    max-height: 85vh;
  }

  overflow: auto;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > :last-child {
    margin-bottom: 2rem;
  }

  h1 {
    margin: 0;
  }

  h2 {
    font-size: 1.5em;
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

export const EmojiButton = styled.button`
  background-color: ${(props) =>
    props.active ? "rgba(255,255,255,0.4)" : "transparent"};
  font-size: 2.25em;
  :hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export const SpacerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => props.flexDirection ?? "row"};
`;

export const AnimatedGradientText = styled.h1`
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
  font-size: 5em;
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

export const HeroGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1.5fr;
  height: 100%;
  margin: 0 !important;

  @media only screen and (max-width: 1024px) {
    grid-template-rows: 1fr min-content;
    grid-template-columns: auto;
  }
`;
