import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { SiTrello } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";

const Navigation = () => {
  return (
    <nav className="Navigation">
      <div className="wrapper-nav-left">
        <NavLink to="/" className="logo">
          <SiTrello />
          <h3>Trello</h3>
        </NavLink>
        <div className="nav-link">
          <NavLink to="/">Arbeitsbereiche</NavLink>
          <NavLink to="/loggedin">Zuletzt angesehen</NavLink>
        </div>
      </div>
      <div className="wrapper-nav-right">
        <div className="search">
          <label htmlFor="search">
            <IoIosSearch className="search-icon" />
          </label>
          <input type="search" placeholder="Suchen" id="search" />{" "}
        </div>
        <div className="user-panel">
          <button className="user-icon">JE</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
