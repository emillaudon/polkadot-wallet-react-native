import React, { createContext, useState, useEffect } from 'react';
import { auth } from './firebase';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loggedUser) => {
      setUser(loggedUser);
      setIsLoading(false);
    });

    return unsubscribe;
  });

  const logIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, user, logIn }}>
      {children}
    </AuthContext.Provider>
  );
}
