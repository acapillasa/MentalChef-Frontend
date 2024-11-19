import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "assets/MentalChef-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import ContadorMonedas from "../tienda/ContadorMonedas"; // Import ContadorMonedas

const Header = ({ isLoggedIn, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const [monedasV, setMonedasV] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [usernameResponse, monedasVResponse] = await Promise.all([
          fetch("/usuarios/me", {
            method: "GET",
            credentials: "include",
          }),
          fetch("/usuarios/monedasV", {
            method: "GET",
            credentials: "include",
          }),
        ]);

        if (usernameResponse.status === 401 || monedasVResponse.status === 401) {
          console.error("User is not authenticated");
          navigate("/login"); // Redirect to login page
          return;
        }

        if (usernameResponse.ok) {
          const responseText = await usernameResponse.text();
          const usernameMatch = responseText.match(/Username=(.*?),/);
          if (usernameMatch) {
            setUsername(usernameMatch[1]);
          } else {
            console.error("Username not found in response");
          }
        } else {
          console.error("Failed to fetch username");
        }

        if (monedasVResponse.ok) {
          const monedasV = await monedasVResponse.json();
          setMonedasV(monedasV);
        } else {
          console.error("Failed to fetch monedasV");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn, navigate]);

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
                <div className="mr-4 flex flex-col items-center"> {/* Center horizontally */}
                  <ContadorMonedas monedasV={monedasV} />
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="user-icon cursor-pointer w-6 h-6 mt-2" // Add margin-top for spacing
                    onClick={toggleDropdown}
                  />
                  {showDropdown && (
                    <div className="dropdown-menu flex flex-col absolute w-48 top-20 mr-3 mt-3 bg-white shadow-lg rounded" >
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
