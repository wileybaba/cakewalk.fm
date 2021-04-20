import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "./StyledComponents";

export function Nav() {
  return (
    <NavBar>
      <Link to="/" className="logo nav-link">
        <h3>🍱{"  "}lunchbreak.fm</h3>
      </Link>
      <div>
        <Link to="/stream" className="nav-link">
          Stream
        </Link>
        <Link to="/mission" className="nav-link">
          Mission
        </Link>
      </div>
      <div>
        <Link to="/login" className="nav-link">
          Log in
        </Link>
        <Link to="/register">
          <button>Sign up</button>
        </Link>
      </div>
    </NavBar>
  );
}
