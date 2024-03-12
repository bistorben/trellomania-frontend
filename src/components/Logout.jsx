import axios from "axios";
import "./Logout.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
// import { useNavigate, createBrowserRouter } from "react-router-dom";
import { useModal } from "../contexts/ModalContext.jsx";
// import Home from "../components/Home.jsx";

const Logout = () => {
  const { setLoggedIn, setAuthUser } = useContext(AuthContext);
  const { setIsOpen } = useModal();

  // const router = createBrowserRouter([{ path: "/", element: <Home /> }]);
  //const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     router.navigate("/");
  //     //navigate("/");
  //   }
  // }, [loggedIn]);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setLoggedIn(false);
      setIsOpen(false);
      setAuthUser(null);

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
