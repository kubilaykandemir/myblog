import React from "react";
import { Link } from "gatsby";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="inside_links">
        <li>
          <Link to="/">Anasayfa</Link>
        </li>
        <li>
          <Link to="/categories">Kategoriler</Link>
        </li>
        <li>
          <Link to="about">Hakkimda</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
