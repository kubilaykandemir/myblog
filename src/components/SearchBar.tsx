import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
  return (
    <form action="/" method="get" autoComplete="off">
      <label htmlFor="post-search">
        <span className="visually-hidden">Search Blog Posts</span>
      </label>
      <input
        onChange={() => console.log("asd")}
        type="text"
        id="post-search"
        placeholder="Search Blog Posts"
        name="s"
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
