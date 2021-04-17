import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { StationsPage } from "./pages/StationsPage";
import { useTheme } from "./hooks/useTheme";
import { SignIn } from "./SignIn";
import { AppBox } from "./components/StyledComponents";
import { Nav } from "./components/Nav";

export function Routes({ theme, setTheme }) {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage theme={theme} setTheme={setTheme} />
      </Route>
      <Route exact path="/signin">
        <SignIn />
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
