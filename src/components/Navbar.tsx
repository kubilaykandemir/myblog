import React from "react";
import { Link } from "gatsby";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
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
      <SearchBar />
    </nav>
  );
};

export default Navbar;
