import React, { createContext, useState, useContext } from "react";
import { useQuery } from "react-query";
import { endpoint } from "./services";
import request, { gql } from "graphql-request";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (authContext === null) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider tag"
    );
  }
  return authContext;
};

export const AuthContextProvider = ({ children }) => {
  const { data: currentUser } = useQuery("current-user", async () => {
    const {
      posts: { data },
    } = await request(
      endpoint,
      gql`
        query {
          me {
            email
          }
        }
      `
    );
    return data;
  });

  const [user, setUser] = useState(currentUser);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
