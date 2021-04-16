import React from "react";
import fakeAuth from "fake-auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAuthContext } from "./AuthProvider";

export function Preferences() {
  const { user, setUser } = useAuthContext();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      location: user.location,
      aqi: user.aqi,
    },
  });

  const history = useHistory();

  const handleUpdateProfile = (data) => {
    fakeAuth
      .updateProfile(data)
      .then(() => {
        fakeAuth.getCurrentUser().then((user) => {
          setUser(user);
          history.push("/home");
        });
      })
      .catch((error) => alert(error));
  };

  const handleSignOut = () => {
    fakeAuth.signout().then(() => {
      history.push("/signin");
    });
  };

  return (
    <>
      <h3>Welcome, {user?.email}</h3>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <p>Where are you located? Simply enter a city name.</p>
        <input type="text" placeholder="Location" {...register("location")} />
        <p>
          When air quality exceeds
          <input
            type="number"
            placeholder="AQI"
            style={{ width: "4rem", margin: "0 .5rem" }}
            {...register("aqi")}
          />
          please notify me.
        </p>
        <button type="submit">Save Preferences</button>
      </form>
      <button
        style={{ backgroundColor: "salmon" }}
        onClick={() => handleSignOut()}
      >
        Sign out
      </button>
    </>
  );
}
