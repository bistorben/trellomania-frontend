import "./Navigation.css"
import { NavLink } from "react-router-dom";

const Navigation = () => {
  
  return (
    <nav className="Navigation">
      <NavLink to="/" >Home</NavLink>
      <NavLink to="/loggedin" >Home2</NavLink>
    </nav>
  );
};

export default Navigation;