import React, { 
  createContext, 
  useState, 
  useContext, 
  useEffect
} from "react";
import fakeAuth from "fake-auth";

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

  const currentUser = fakeAuth.getCurrentUser().then(user => user);
  
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    fakeAuth.getCurrentUser()
      .then(user => setUser(user));
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );


};
