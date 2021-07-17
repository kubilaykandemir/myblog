import { Link } from "gatsby";
import React from "react";
import { FaTwitter, FaGithub, FaYoutube, FaPatreon } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header>
      <div className="title_container">
        <Link to="/">Kubilay Kandemir</Link>
      </div>
      <ul className="social-links">
        <li>
          <a href="https://twitter.com">
            <FaTwitter />
          </a>
        </li>
        <li>
          <a href="https://github.com/kubilaykandemir">
            <FaGithub />
          </a>
        </li>
        <li>
          <a href="https://youtube.com">
            <FaYoutube />
          </a>
        </li>
        <li>
          <a href="https://patreon.com">
            <FaPatreon />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
