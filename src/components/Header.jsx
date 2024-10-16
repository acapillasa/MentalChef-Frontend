import React from 'react';
import logo from '../assets/MentalChef-logo.png';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <img
          src={logo}
          alt="Logo MentalChef"
          className="logo"
        />
        <h1>
          <span className="letter">M</span>
          <span className="letter">e</span>
          <span className="letter">n</span>
          <span className="letter">t</span>
          <span className="letter">a</span>
          <span className="letter">l</span>
          <span className="letter">C</span>
          <span className="letter">h</span>
          <span className="letter">e</span>
          <span className="letter">f</span>
        </h1>
        <nav>
          <ul>
            <li>
              <a href="#jugar">Partida Rápida</a>
            </li>
            <li>
              <a href="#ranking">Ranking Mensual</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
            <li>
              <a href="#login" className="login-link">Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
