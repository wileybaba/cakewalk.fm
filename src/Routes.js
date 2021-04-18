import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { StationsPage } from "./pages/StationsPage";
import { useTheme } from "./hooks/useTheme";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import {
  AppBox,
  Container,
  SpacerContainer,
} from "./components/StyledComponents";
import { Nav } from "./components/Nav";
import { Modal } from "./components/Modal";

export function Routes({ theme, setTheme }) {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage theme={theme} setTheme={setTheme} />
      </Route>
      <Route exact path="/register">
        <LandingPage theme={theme} setTheme={setTheme}>
          <SignUp />
        </LandingPage>
      </Route>
      <Route exact path="/login">
        <LandingPage theme={theme} setTheme={setTheme}>
          <SignIn />
        </LandingPage>
      </Route>
      <Route exact path="/stream">
        <StationsPage />
      </Route>
      <Route exact path="/mission">
        <AppBox>
          <Nav />
          <h1>Mission</h1>
        </AppBox>
      </Route>
    </Switch>
  );
}
