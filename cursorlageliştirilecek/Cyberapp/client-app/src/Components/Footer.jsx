import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo2 from "../assets/logo2.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaGithub, FaPinterest } from "react-icons/fa";
import "../Components/styles/Footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setShowBackToTop(true);
      else setShowBackToTop(false);

      if (window.scrollY > 100) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer>
        <div className="container">
          <div className="logo-container">
            <Link to="/" aria-label="Ana Sayfaya Git" className="logo-link">
              <Image
                src={logo2}
                alt="Cyber Security"
                width={400}
                height={100}
                className="logo-image"
              />
            </Link>
          </div>
          <br />
          <p className="footer-description">ETÜ Siber Güvenlik Çözümleri</p>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/merve-y%C4%B1ld%C4%B1r%C4%B1m-42780132/" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaLinkedinIn />
            </a>
            <a href="https://www.instagram.com/merve_yild/" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaYoutube />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaGithub />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="icon-link">
              <FaPinterest />
            </a>
          </div>

          <div className="quick-links">
            <h3 className="link-title">Hızlı Bağlantılar</h3>
            <ul className="link-list">
              <li><Link to="/about" className="link">Hakkında</Link></li>
              <li><Link to="/contact" className="link">İletişim</Link></li>
              <li><Link to="/privacy-policy" className="link">Gizlilik Politikası</Link></li>
              <li><Link to="/terms" className="link">Şartlar</Link></li>
            </ul>
          </div>

          <div className="footer-bottom">
            <p className="footer-bottom-text">
              <span>
                <i className="ri-copyright-line"></i>
                {year} merveyildirim@erzurum.edu.tr ®
              </span>
            </p>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`back-to-top-button ${isScrolled ? "scrolled" : ""}`}
        >
          ↑ Yukarıya Dön
        </button>
      )}
    </>
  );
};

export default Footer;
