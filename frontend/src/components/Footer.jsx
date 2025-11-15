import React from "react";
import "./Footer.css";
import { FaInstagram, FaLinkedin, FaBehance } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-section">

       
      {/* CONTENEDOR PRINCIPAL */}
      <div className="section-content">

      {/* COPYRIGHT */}
        <p className="copyright-text">
          ©2025 Game Library — by Camila
        </p>

      {/* REDES SOCIALES */}
        <div className="social-link-list">
          <a
            href="https://www.instagram.com/aliz._.vm?igsh=cTE5ZmtqengxeTJ5"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.linkedin.com/in/camila-vega-37aa91358/"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.behance.net/camilamontaa1"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaBehance />
          </a>
        </div>
        
      {/* POLÍTICAS */}
        <p className="policy-text">
          <a href="#" className="policy-link">Privacy Policy</a>
          <span className="separator"></span>
          <a href="#" className="policy-link">Refund Policy</a>
        </p>

      </div>
    </footer>
  );
}