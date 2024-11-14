import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "assets/MentalChef-logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isLoggedIn, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="Logo MentalChef" className="logo" />
        </Link>
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
            <li className="relative">
              {isLoggedIn ? (
                <div className="user-menu">
                  <FontAwesomeIcon 
                    icon={faUserTie} 
                    className="user-icon w-6 h-6" 
                    onClick={toggleDropdown} 
                  />
                  {showDropdown && (
                    <div className="dropdown-menu flex flex-col absolute right-0 mt-2 bg-white shadow-lg rounded">
                      <Link to="/MiCocina" className="dropdown-link hover:text-black px-4 py-2">Mi Cocina</Link>
                      <button 
                        onClick={onLogout} 
                        className="logout-btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="login-link">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
