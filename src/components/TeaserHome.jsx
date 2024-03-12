import "./TeaserHome.css";
import { BsFillGearFill } from "react-icons/bs";

import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const TeaserHome = () => {
  return (
    <section className="TeaserHome">
      <div className="teaser-container">
        <FaGithub className="github-icon" />
        <h3>Student project</h3>
        <p>
          This is a student project by Julia Erbis and Torben Bis. Check out
          this project on GitHub.
        </p>
        <Link
          to="https://github.com/bistorben/trellomania-frontend"
          target="_blank"
        >
          Check it out!
        </Link>
      </div>
      <div className="teaser-container">
        <BsFillGearFill className="gear-icon" />
        <h3>Attention</h3>
        <p>
          This project is not yet optimized for mobile views. We are currently
          focusing on functionalities and the desktop view.
        </p>
      </div>
    </section>
  );
};

export default TeaserHome;

{
  /* <p>

</p>
<FaGithub id="github-icon" /> */
}
