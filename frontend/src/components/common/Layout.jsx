import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, transparentNav = false, showFooter = true }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar transparent={transparentNav} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
