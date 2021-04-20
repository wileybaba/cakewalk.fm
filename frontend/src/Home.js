import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";
import { useAqi } from "./useAqi";
import fakeAuth from "fake-auth";
import { useTheme } from "./hooks/useTheme";

export function Home() {
  const { user } = useAuthContext();

  const { aqiData } = useAqi(user?.location);

  const history = useHistory();

  const handleSignOut = () => {
    fakeAuth.signout().then(() => {
      history.push("/signin");
    });
  };

  if (!aqiData || !user) return <strong>Loading...</strong>;

  if (aqiData === "Unknown station") {
    return (
      <>
        <p className="error">
          No AQI station was found near the location you entered.
        </p>
        <p>
          Please{" "}
          <Link to="/preferences">
            <button>Edit your preferences</button>
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h3>Welcome, {user.email}</h3>

      {user.aqi < aqiData.aqi ? <span>⚠️</span> : <span>🌱</span>}

      <p>
        In <strong>{aqiData.city?.name}</strong>, the current AQI is{" "}
        <strong>{aqiData?.aqi}</strong>
      </p>

      {user.aqi < aqiData.aqi && (
        <p>
          This AQI exceeds your threshold of <strong>{user.aqi}</strong> by{" "}
          <strong>{aqiData.aqi - user.aqi}</strong>
        </p>
      )}

      {user.aqi > aqiData.aqi && (
        <p>
          You are in the clear. The current AQI is{" "}
          <strong>{user.aqi - aqiData.aqi}</strong> less than your threshold of{" "}
          <strong>{user.aqi}</strong>
        </p>
      )}

      <Link to="/preferences">
        <button>Edit preferences</button>
      </Link>
      <br />
      <button
        style={{ backgroundColor: "salmon" }}
        onClick={() => handleSignOut()}
      >
        Sign out
      </button>
    </>
  );
}
