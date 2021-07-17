import React from "react";
import { Link } from "gatsby";

const Navbar: React.FC = () => {
  return (
    <nav>
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
    </nav>
  );
};

export default Navbar;
