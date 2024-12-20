import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      {/* Left Pattern */}
      <div className="side-pattern left-pattern"></div>

      {/* Centered Navbar */}
      <div className="navbar-content">
      
        <ul className="nav-menu">
          <li className="nav-item"><a href="#home">Home</a></li>
          <li className="nav-item"><a href="#about">About</a></li>
          <li className="nav-item"><a href="#services">Services</a></li>
          <li className="nav-item"><a href="#contact">Contact</a></li>
        </ul>
      </div>

      {/* Right Pattern */}
      <div className="side-pattern right-pattern"></div>
    </div>
  );
};

export default Navbar;
