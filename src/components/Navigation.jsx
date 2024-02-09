import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { SiTrello } from "react-icons/si";

const Navigation = () => {
  return (
    <nav className="Navigation">
      <div className="wrapper-nav-left">
        <div className="logo">
          <SiTrello />
          <h3>Trello</h3>
        </div>
        <div className="nav-link">
          <NavLink to="/">Arbeitsbereiche</NavLink>
          <NavLink to="/loggedin">Zuletzt angesehen</NavLink>
        </div>
      </div>
      <div className="wrapper-nav-right">
        <div className="search">
          <input type="search" placeholder="Search" />
        </div>
        <div className="user-panel">
          <h3>O</h3>
          <h3>O</h3>
          <h3>O</h3>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
