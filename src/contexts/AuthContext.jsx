/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("AuthProvider", loggedIn);

  const value = {
    authUser,
    setAuthUser,
    loggedIn,
    setLoggedIn,
    loading,
    setLoading,
  };

  useEffect(() => {
    console.log("Ich bin im useEffect");
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/loggedin",
          {
            withCredentials: true, // Für das Senden von Cookies bei Cross-Origin-Anfragen
          }
        );
        setLoggedIn(true);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.log(err);
        setLoggedIn(false);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
