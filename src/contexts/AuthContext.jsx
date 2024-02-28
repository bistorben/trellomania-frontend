/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const value = {
    authUser,
    setAuthUser,
    loggedIn,
    setLoggedIn,
    loading,
    setLoading,
  };

  console.log("authUSer", authUser);
  useEffect(() => {
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
        setAuthUser(response.data);
      } catch (err) {
        // console.log(err);
        setLoggedIn(false);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
