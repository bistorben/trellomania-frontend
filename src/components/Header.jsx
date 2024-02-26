import { useContext } from "react";
import "./Header.css";
import Navigation from "./Navigation.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <header className="Header">
      <Navigation />
      {!loggedIn && (
        <Link
          to="https://github.com/bistorben/trellomania-frontend"
          target="_blank"
          className="teaser-student-info"
        >
          <p>
            This is a student project from Julia Erbis und Torben Bis - check
            this project out on GitHub
          </p>
          <FaGithub id="github-icon" />
        </Link>
      )}
    </header>
  );
};

export default Header;
