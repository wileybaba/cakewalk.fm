import React, { useState } from "react";
import fakeAuth from "fake-auth";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";
import { Modal } from "./components/Modal";
import { StyledForm } from "./components/StyledComponents";

export function SignIn() {
  const [error, setError] = useState();

  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const { user, setUser } = useAuthContext();

  const handleLogin = (data) => {
    const { username, password } = data;

    fakeAuth
      .signin(username, password)
      .then((response) => {
        setUser(response.user);
        if (user?.location && user?.aqi) {
          history.push("/home");
        } else {
          history.push("/preferences");
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Modal cleanup={() => history.push("/")}>
      <span style={{ fontSize: "3em" }}>🍱 Its lunchtime.</span>
      <p>Lets get you logged in.</p>
      <StyledForm
        onSubmit={handleSubmit(handleLogin)}
        style={{ marginBottom: "1.5rem" }}
      >
        {error && <p className="error">{error.message}</p>}
        <div className="floating-label">
          <input
            placeholder="Email"
            type="text"
            name="email"
            id="email"
            {...register("email")}
          />
          <label htmlFor="email">Email:</label>
        </div>

        <div className="floating-label">
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            {...register("password")}
          />
          <label htmlFor="email">Password:</label>
        </div>
        <button type="submit">Sign In</button>
        <Link to="signup">Need an account? Click here to sign up.</Link>
      </StyledForm>
    </Modal>
  );
}
