import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { SiTrello } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Navigation = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <nav
      className={`Navigation ${loggedIn ? "nav-logged-in" : "nav-logged-out"}`}
    >
      <div className="wrapper-nav-left">
        <NavLink to="/" className="logo">
          <SiTrello style={{ color: loggedIn ? undefined : "#0c66e4" }} />
          <h3>Trellomania</h3>
        </NavLink>
        <div className="nav-link">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
      </div>
      <div className="wrapper-nav-right">
        {loggedIn && (
          <div className="search">
            <label htmlFor="search">
              <IoIosSearch className="search-icon" />
            </label>
            <input type="search" placeholder="Suchen" id="search" />{" "}
          </div>
        )}

        <div className="user-panel">
          {/* <NavLink to="/register" className="user-icon">
            JE
          </NavLink> */}
          {loggedIn ? (
            <NavLink to="/logout">Logout</NavLink>
          ) : (
            <>
              <NavLink to="/login" id="login-link">
                Log in
              </NavLink>
              <NavLink to="/register" id="register-link">
                Get Trello for free
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
