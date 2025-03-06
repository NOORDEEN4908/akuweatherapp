import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>STAY UPDATED</h4>
          <p>Subscribe for the latest weather updates and alerts.</p>
          <input type="email" placeholder="Enter your email" className="footer-input" style={{ marginTop: '10px' }}/>
          <button className="footer-button" style={{ marginTop: '10px' }}>Subscribe</button>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Weather Resources Section */}
        <div className="footer-section">
          <h4>WEATHER RESOURCES</h4>
          <ul>
            <li><a href="/radar">Live Radar</a></li>
            <li><a href="/forecasts">Weather Forecasts</a></li>
            <li><a href="/alerts">Severe Weather Alerts</a></li>
            <li><a href="/climate">Climate Reports</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section connect-with-us">
          <h4>FOLLOW US ON</h4>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <hr />

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Akurana Weather &copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
