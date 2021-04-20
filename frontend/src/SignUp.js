import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";
import { Modal } from "./components/Modal";
import { StyledForm } from "./components/StyledComponents";
import { request, gql } from "graphql-request";
import { useMutation } from "react-query";
import { endpoint } from "./services";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const history = useHistory();

  const { setUser } = useAuthContext();

  const signUpMutation = useMutation(async ({ username, email, password }) => {
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
        username,
        email,
        password,
      }
    );
    return token;
  });

  const handleSignUp = (formData) => {
    signUpMutation.mutate(formData);
  };

  useEffect(() => {
    if (signUpMutation.isSuccess) {
      history.push("/dashboard");
    }
  }, [signUpMutation]);

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
        onSubmit={handleSubmit(handleSignUp)}
        style={{ marginBottom: "1rem" }}
      >
        {signUpMutation.isError &&
          signUpMutation.error.response.errors.map((err) => (
            <p key={new Date().getTime()} className="error">
              {err.message}
            </p>
          ))}

        <div className="floating-label">
          <input
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            {...register("username", {
              required: "Please enter a username",
            })}
          />
          <label htmlFor="username">Username:</label>
        </div>
        {errors.username && <p className="error">{errors.username.message}</p>}

        <div className="floating-label">
          <input
            placeholder="Email"
            type="text"
            name="email"
            id="email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /(.+)@(.+){2,}\.(.+){2,}/,
                message: "Please enter a valid email",
              },
            })}
          />
          <label htmlFor="email">Email:</label>
        </div>
        {errors.email && <p className="error">{errors.email.message}</p>}

        <div className="floating-label">
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            {...register("password", {
              required: "Please enter a password",
              min: {
                value: 7,
                message: "Your password must be 7 or more characters",
              },
              max: {
                value: 42,
                message: "Your password must less than 42 characters",
              },
            })}
          />
          <label htmlFor="password">Password:</label>
        </div>

        <div className="floating-label">
          <input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            id="confirm-password"
            {...register("confirmPassword")}
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
        </div>

        <button
          type="submit"
          id="sign-up-submit"
          disabled={signUpMutation.isLoading || !isValid}
        >
          {signUpMutation.isLoading ? "Loading..." : "Submit"}
        </button>
      </StyledForm>
      <Link to="signin">Already have an account? Click here to sign in.</Link>
    </Modal>
  );
}
