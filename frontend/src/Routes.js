import React from "react";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { StationsPage } from "./pages/StationsPage";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { AppBox, PaddingContainer } from "./components/StyledComponents";
import { Nav } from "./components/Nav";

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
        <AppBox className="mission">
          <Nav />
          <h1>Mission</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor
            imperdiet pulvinar. Sed sit amet tellus dapibus, lacinia nisi et,
            gravida elit. Aliquam sit amet nunc vel dui semper posuere. Donec
            ultricies justo laoreet felis egestas, ut aliquam libero tempor. Ut
            eleifend pharetra turpis, sed imperdiet ligula pharetra sed. Duis eu
            condimentum massa, nec luctus risus. Curabitur id ultrices erat, ac
            interdum mauris. Curabitur nec mauris pretium, tincidunt risus sed,
            dignissim massa. Sed pretium tellus vitae ornare dapibus. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Duis ullamcorper feugiat finibus. Praesent
            finibus sem urna, eleifend tincidunt ligula vehicula id. Ut sit amet
            justo tellus.
          </p>
          <p>
            Donec venenatis dictum nibh non varius. Aliquam in porttitor ante.
            Donec a orci massa. Donec sit amet congue ante. Nulla ac condimentum
            turpis. Proin id nunc justo. Quisque vitae dolor lobortis,
            scelerisque eros a, congue ex. Morbi nisl leo, tempus non congue in,
            consequat sodales tellus. Praesent ut interdum nulla. Suspendisse
            semper, lectus vitae congue vestibulum, est ipsum mollis elit, vitae
            tincidunt diam eros vel erat. Nunc feugiat, metus eget scelerisque
            congue, lacus est eleifend risus, in semper massa mauris id ipsum.
            Duis lectus magna, auctor eget felis a, vulputate hendrerit ante.
            Donec sit amet nunc eget quam maximus laoreet.
          </p>
          <p>
            Pellentesque erat justo, egestas a est sed, volutpat scelerisque
            sapien. Integer facilisis dolor non quam convallis consequat. Mauris
            eget risus volutpat, fermentum mauris sit amet, feugiat nibh. Fusce
            vel dictum nisi. Pellentesque elit ex, consequat sit amet felis id,
            laoreet molestie erat. Cras viverra, ligula non vehicula volutpat,
            mauris orci elementum magna, rutrum facilisis mi elit a ligula.
            Fusce ut ante sit amet risus molestie porta. Maecenas viverra quam
            ut interdum efficitur. Morbi sollicitudin nunc nec lorem porta
            dapibus. Suspendisse eget nulla luctus, sollicitudin dolor id,
            sagittis quam.
          </p>
        </AppBox>
      </Route>
    </Switch>
  );
}
