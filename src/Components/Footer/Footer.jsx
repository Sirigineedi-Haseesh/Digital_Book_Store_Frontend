import React from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
          <div className="footer-links">
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Licensing</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-copyright">
          <a href="#" className="footer-copyright-link">BookStore™</a> &copy; {new Date().getFullYear()}
        </div>
        <div className="footer-icons">
          <a href="#" className="footer-icon"><BsFacebook /></a>
          <a href="#" className="footer-icon"><BsInstagram /></a>
          <a href="#" className="footer-icon"><BsTwitter /></a>
          <a href="#" className="footer-icon"><BsGithub /></a>
          <a href="#" className="footer-icon"><BsDribbble /></a>
        </div>
      
    </footer>
  );
};

export default Footer;
