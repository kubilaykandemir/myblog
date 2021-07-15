import React from 'react';
import Navbar from './Navbar';
import '../styles/global.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <h1>layout</h1>
      {children}
    </div>
  );
};

export default Layout;
