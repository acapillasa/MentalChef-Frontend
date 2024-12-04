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
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (retryCount = 3) => {
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
          const userDetails = await usernameResponse.json();
          if (userDetails && userDetails.username) {
            setUsername(userDetails.username);
            setRole(userDetails.role); // Set the role
            console.log("Rol de " + userDetails.username + " - " + userDetails.role);
          } else {
            console.error("Username not found in response");
          }
        } else {
          console.error("Failed to fetch username");
        }

        if (monedasVResponse.ok) {
          const monedasV = await monedasVResponse.json();
          if (monedasV !== null && monedasV !== undefined) {
            setMonedasV(monedasV);
          } else {
            console.error("monedasV is null or undefined");
          }
        } else {
          console.error("Failed to fetch monedasV");
        }
      } catch (error) {
        if (retryCount > 0) {
          console.warn(`Retrying fetchUserData... (${3 - retryCount + 1})`);
          fetchUserData(retryCount - 1);
        } else {
          console.error("Error:", error);
        }
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".dropdown-menu") && !event.target.closest(".user-icon")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

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

  const handleLinkClick = () => {
    setShowDropdown(false);
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
            <Link to="/jugar">
              Partida Rapida
            </Link>
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
                    <div className="dropdown-menu flex flex-col absolute w-48 top-20 mr-3 mt-3 bg-white shadow-lg rounded z-50">
                      <div className="dropdown-link px-4 py-2 text-center font-bold">
                        {username}
                      </div>
                      <Link to="/MiCocina" className="dropdown-link px-4 py-2 text-center" onClick={handleLinkClick}>
                        Mi Cocina
                      </Link>
                      <Link to="/Tienda" className="dropdown-link px-4 py-2 text-center" onClick={handleLinkClick}>
                        Tienda
                      </Link>
                      <Link to="/CrearPregunta" className="dropdown-link px-4 py-2 text-center" onClick={handleLinkClick}>
                        Crear Pregunta
                      </Link>
                      <Link to="/EditarPerfil" className="dropdown-link px-4 py-2 text-center" onClick={handleLinkClick}>
                        Editar Perfil
                      </Link>
                      {role === "ROLE_CHEF" && (
                        <>
                          <Link to="/ListaPreguntas" className="dropdown-link px-4 py-2 text-center" onClick={handleLinkClick}>
                            Lista Preguntas
                          </Link>
                          <Link to="/CrearChef" className="dropdown-link px-4 py-2 text-center" onClick={handleLinkClick}>
                            Registrar Chef
                          </Link>
                          <Link to="/CrearEvento" className="dropdown-link px-4 py-2 text-center" onClick={handleLinkClick}>
                            Crear Evento
                          </Link>
                          <Link to="/GestionarCategorias" className="dropdown-link px-4 py-2 text-center" onClick={handleLinkClick}>
                            Gestionar categorias
                          </Link>
                        </>
                      )}
                      <Link to="/HistorialCompras" className="dropdown-link px-4 py-2 text-center" onClick={handleLinkClick}>
                        Historial de Compras
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
