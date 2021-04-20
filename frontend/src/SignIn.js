import request, { gql } from "graphql-request";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";
import { Modal } from "./components/Modal";
import { StyledForm } from "./components/StyledComponents";
import { endpoint } from "./services";

export function SignIn() {
  const [error, setError] = useState();

  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const { user, setUser } = useAuthContext();

  const signInMutation = useMutation(async ({ login, password }) => {
    const token = await request(
      endpoint,
      gql`
        mutation($username: String!, $email: String!, $password: String!) {
          signUp(username: $username, email: $email, password: $password) {
            token
          }
        }
      `,
      {
        login,
        password,
      }
    );
    return token;
  });

  const handleSignIn = (formData) => {
    signInMutation.mutate(formData);
  };

  return (
    <Modal cleanup={() => history.push("/")}>
      <span style={{ fontSize: "3em" }}>🍱 Its lunchtime.</span>
      <p>Lets get you logged in.</p>
      <StyledForm
        onSubmit={handleSubmit(handleSignIn)}
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
