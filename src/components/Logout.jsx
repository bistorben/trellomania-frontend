import axios from "axios";
import "./Logout.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!loggedIn) {
    navigate("/");
  }
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
    <section className="Logout wrapper-form-section">
      <h1>LOG OUT</h1>
      <p>Are you sure, you want to log out?</p>

      <button onClick={logoutHandler} className="btn-valid">
        LOG OUT
      </button>
    </section>
  );
};

export default Logout;
