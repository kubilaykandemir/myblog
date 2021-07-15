import React from "react";
import { FaTwitter, FaGithub, FaYoutube, FaPatreon } from "react-icons/fa";
import { Link } from "gatsby";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="title_container">
        <Link to="/">Kubilay Kandemir</Link>
      </div>
      <ul className="inside_links">
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/tags">Tags</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
      </ul>
      <ul className="outside_links">
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
    </nav>
  );
};

export default Navbar;
