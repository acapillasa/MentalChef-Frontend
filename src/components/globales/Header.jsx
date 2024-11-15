import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "assets/MentalChef-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

const Header = ({ isLoggedIn, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch("/usuarios/me", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const username = await response.text();
          setUsername(username);
        } else {
          console.error("Failed to fetch username");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (isLoggedIn) {
      fetchUsername();
    }
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/usuarios/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        onLogout();
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
                    className="user-icon cursor-pointer w-6 h-6"
                    onClick={toggleDropdown}
                  />
                  {showDropdown && (
                    <div className="dropdown-menu flex flex-col absolute right-0 mr-3 mt-3 bg-white shadow-lg rounded" style={{ width: '200px' }}>
                      <div className="dropdown-link px-4 py-2 text-center font-bold">
                        {username}
                      </div>
                      <Link to="/MiCocina" className="dropdown-link px-4 py-2 text-center">
                        Mi Cocina
                      </Link>
                      <Link to="/Tienda" className="dropdown-link px-4 py-2 text-center">
                        Tienda
                      </Link>
                      <Link to="/CrearPregunta" className="dropdown-link px-4 py-2 text-center">
                        Crear Pregunta
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="logout-btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mt-2 text-center"
                      >
                        Log Out
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
