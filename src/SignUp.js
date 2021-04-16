import React, { useState } from "react";
import fakeAuth from "fake-auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

export function SignUp() {
  const [error, setError] = useState();

  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const { setUser } = useAuthContext();

  const handleLogin = (data) => {
    const { username, password } = data;
    fakeAuth
      .signup(username, password)
      .then(() => fakeAuth
        .signin(username, password)
        .then((response) => { 
          setUser(response.user);
          history.push("/preferences");
        })
      )
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit(handleLogin)}>
        {error && <p className="error">{error.message}</p>}
        <input 
          type="username" 
          name="username" 
          placeholder="Username" 
          {...register("username")} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          {...register("Password")} 
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="signin">Already have an account? Click here to sign in.</Link>
    </>
  );
}
