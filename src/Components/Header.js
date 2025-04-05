import React from "react";
import "./Header.css";
import { Link } from "react-router-dom"; 

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">MyWebsite</Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
