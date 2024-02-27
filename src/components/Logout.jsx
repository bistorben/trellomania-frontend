import axios from "axios";
import "./Logout.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext.jsx";

const Logout = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const { setIsOpen } = useModal();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/");
  //   }
  // }, [loggedIn, navigate]);

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
      setIsOpen(false);
      navigate("/");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="Logout">
      <h1>LOG OUT</h1>
      <p>Are you sure, you want to log out?</p>
      <div className="btn-wrapper">
        <button onClick={logoutHandler} className="btn-valid">
          LOG OUT
        </button>
      </div>
    </section>
  );
};

export default Logout;
