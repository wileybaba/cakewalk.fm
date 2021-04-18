import React, { useState } from "react";
import fakeAuth from "fake-auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";
import { Modal } from "./components/Modal";
import { StyledForm } from "./components/StyledComponents";
import { PasswordValidator } from "./components/PasswordValidator";

export function SignUp() {
  const [error, setError] = useState();

  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const { setUser } = useAuthContext();

  const handleLogin = (data) => {
    const { username, password } = data;
    fakeAuth
      .signup(username, password)
      .then(() =>
        fakeAuth.signin(username, password).then((response) => {
          setUser(response.user);
          history.push("/preferences");
        })
      )
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Modal cleanup={() => history.push("/")}>
      <span style={{ fontSize: "3em" }}>🍱 Its lunchtime.</span>
      <p>We are excited to welcome you to our community.</p>
      <ul style={{ listStyle: "none" }}>
        <li>🔊 Stream awesome music and shows</li>
        <li>🎙️ Create your own live broadcast</li>
        <li>🫂 Engage with your fellow listeners</li>
      </ul>
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

        <div className="floating-label">
          <input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            id="confirm-password"
            {...register("confirmPassword")}
          />
          <label htmlFor="email">Confirm Password:</label>
        </div>

        <button type="submit" id="sign-up-submit">
          Submit
        </button>
      </StyledForm>
      <Link to="signin">Already have an account? Click here to sign in.</Link>
    </Modal>
  );
}
