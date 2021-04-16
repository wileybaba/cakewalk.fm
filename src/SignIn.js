import React, { useState } from "react";
import fakeAuth from "fake-auth";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

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
    <>
      <h3>Sign In</h3>
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
        <button type="submit">Sign In</button>
        <Link to="signup">Need an account? Click here to sign up.</Link>
      </form>
    </>
  );
}
