import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import "../styles/main.scss";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
