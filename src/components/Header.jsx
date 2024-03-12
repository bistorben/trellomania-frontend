import { useContext } from "react";
import "./Header.css";
import Navigation from "./Navigation.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Header = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <header className="Header">
      <Navigation />
      {!loggedIn && (
        <div className="header-teaser">
          <p>
            This project is exclusively for learning purposes. Data will be
            regularly deleted.
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
