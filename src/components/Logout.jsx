import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Logout = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setLoggedIn(false);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>LOGOUT</h1>
      <p>Wollen sie sich ausloggen?</p>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Logout;
