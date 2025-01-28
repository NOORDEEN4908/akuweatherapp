import React from 'react';
import { FaDiscord, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        {/* Working Hours Section */}
        <div className="footer-section">
          <h4>WORKING HOURS</h4>
          <ul>
            <li>Mon-Fri: 09:30AM - 06:00PM</li>
            <li>Tusday : 09:30AM - 06:00PM</li>
            <li>Sat: 09:30AM - 02:00PM</li>
            <li>Sun: Closed</li>
          </ul>
        </div>

        {/* Showrooms Section */}
        <div className="footer-section">
          <h4>SHOWROOMS</h4>
          <ul>
            <li>Kandy: +94 776 584 975</li>
            <li>Matara: +94 776 584 975</li>
          </ul>
        </div>

        {/* Partners Section */}
        <div className="footer-section">
          <h4>PARTNERS</h4>
          <ul>
            <li>
              <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer">
                Apple Inc.
              </a>
            </li>
            <li>
              <a href="https://www.dell.com" target="_blank" rel="noopener noreferrer">
                Dell Computers
              </a>
            </li>
            <li>
              <a href="https://www.hp.com" target="_blank" rel="noopener noreferrer">
                Hewlett Packard
              </a>
            </li>
            <li>
              <a href="https://www.lenovo.com" target="_blank" rel="noopener noreferrer">
                Lenovo Technologies
              </a>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="footer-section">
          <h4>COMPANY</h4>
          <ul>
            <li>
              <a href="/aboutus">About Us</a>
            </li>
            <li>
              <a href="/privacypolicy">Privacy Policy</a>
            </li>
            <li>
              <a href="/security">Security</a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section connect-with-us">
  <h4>CONNECT WITH US</h4>
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
    <a href="https://www.discord.com" target="_blank" rel="noopener noreferrer">
      <FaDiscord className="social-icon" />
    </a>
  </div>
</div>

      </div>

      <hr />

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Platinum &copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
