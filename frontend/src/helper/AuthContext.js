import React, { createContext, useContext, useState } from 'react';
import { getDataFromToken } from './utils';

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const storedJwt = localStorage.getItem('coffeeStoriesToken');
  const [loggedInUser, setLoggedInUser] = useState(
    storedJwt ? getDataFromToken(storedJwt) : {},
  );
  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
