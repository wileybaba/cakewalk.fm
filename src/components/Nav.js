import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "./StyledComponents";

export function Nav() {
  return (
    <NavBar>
      <Link to="/" className="logo">
        <h3>🥪 lunchbreak.fm</h3>
      </Link>
      <div>
        <Link to="/stream">Stream</Link>
        <Link to="/mission">Mission</Link>
      </div>
      <div>
        <Link to="/sign-in">Log in</Link>
        <button>Sign up</button>
      </div>
    </NavBar>
  );
}
