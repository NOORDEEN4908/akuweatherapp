import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar-container">
      {/* Left Pattern */}
      <div className="side-pattern left-pattern"></div>

      {/* Centered Navbar */}
      <nav className="navbar-content">
        <ul className="nav-menu">
          <li className="nav-item"><a href="#home">Home</a></li>
          <li className="nav-item"><a href="#about">About</a></li>
          <li className="nav-item"><a href="#services">Services</a></li>
          <li className="nav-item"><a href="#contact">Contact</a></li>
          <li className="nav-item"><a href="#contact">Loging</a></li>
        </ul>
      </nav>

      {/* Right Pattern */}
      <div className="side-pattern right-pattern"></div>
    </header>
  );
};

export default Navbar;
