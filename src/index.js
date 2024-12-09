import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Cookies from "js-cookie"; // Import js-cookie

import "./styles/scss.scss";
import "./styles/tailwind.css";
import "./styles/output.css";
import Header from "./components/globales/Header";
import ButtonDarkMode from "./components/globales/ButtonDarkMode";
import Parallax from "./components/globales/Parallax";
import Bienvenida from "./components/principales/Bienvenida";
import Instructions from "./components/principales/Instructions";
import GameExample from "./components/principales/GameExample";
import QuickGame from "./components/principales/QuickGame";
import Footer from "./components/globales/Footer";
import Login from "./components/autorizacion/Login";
import QuickGameGame from "components/globales/QuickGameGame";
import CrearActualizarPregunta from "components/zona-logueado/CrearActualizarPregunta";
import PreguntasList from "components/zona-chef/PreguntasList";
import Register from "components/autorizacion/Register";
import MiCocina from "components/zona-logueado/MiCocina";
import EventoGame from "components/zona-pinche/EventoGame";
import PreguntaDiariaGame from "components/zona-pinche/PreguntaDiariaGame";
import CampanyaGame from "components/zona-pinche/CampanyaGame";
import TiendaVirtual from "components/tienda/TiendaVirtual";
import RegisterChef from "components/autorizacion/RegisterChef";
import EditarPregunta from "components/zona-chef/EditarPregunta";
import PreguntaDiariaSelector from "./components/zona-pinche/PreguntaDiariaSelector";
import EditarPerfil from "components/zona-logueado/EditarPerfil";
import HistorialCompras from "components/zona-logueado/HistorialCompras";
import CoinExplanation from "components/principales/CoinExplanation";
import CrearCategoria from "components/zona-chef/CrearCategoria";
import GestionarCategorias from "components/zona-chef/GestionarCategorias";
import Ranking from "components/globales/Ranking";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState(null);
  const location = useLocation(); // Move useLocation inside the App component
  const resultado = location.state?.resultado;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/usuarios/isAuthenticated", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });
        const isAuthenticated = await response.json();
        setIsLoggedIn(isAuthenticated);

        if (isAuthenticated) {
          const userResponse = await fetch("/usuarios/me", {
            method: "GET",
            credentials: "include",
          });
          const userData = await userResponse.json();
          console.log("User data:", userData);
          setRole(userData.role);
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsAuthChecked(true);
      }
    };

    checkAuthStatus();
  }, []);

  if (!isAuthChecked) {
    return <div>Cargando...</div>;
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
    Cookies.set("jwt", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("jwt");
  };

  return (
    <>
      <ButtonDarkMode />
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Parallax />
              {role === "ROLE_PINCHE" ? (
                <div className="pregunta-diaria w-full">
                  <PreguntaDiariaSelector resultado={resultado} />
                </div>
              ) : (
                <Bienvenida />
              )}
              <Parallax />
              <Instructions />
              <GameExample />
              <Parallax />
              <CoinExplanation />
              <Parallax />
              <QuickGame />
              <Parallax />
            </>
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
        <Route
          path="/register"
          element={
            <>
              <Parallax /> <Register /> <Parallax />
            </>
          }
        />
        <Route
          path="/EditarPerfil"
          element={
            <>
              <Parallax /> <EditarPerfil user={userData} /> <Parallax />
            </>
          }
        />
        <Route
          path="/CrearChef"
          element={
            <>
              <Parallax /> <RegisterChef /> <Parallax />
            </>
          }
        />
        <Route
          path="/CrearCategoria"
          element={
            <>
              <Parallax /> <CrearCategoria /> <Parallax />
            </>
          }
        />
        <Route
          path="/GestionarCategorias"
          element={
            <>
              <Parallax /> <GestionarCategorias /> <Parallax />
            </>
          }
        />
        <Route
          path="/jugar"
          element={
            <>
              <Parallax /> <QuickGameGame /> <Parallax />
            </>
          }
        />
        <Route
          path="/MiCocina"
          element={
            <>
              <Parallax /> <MiCocina /> <Parallax />
            </>
          }
        />
        <Route
          path="/ranking"
          element={
            <>
              <Parallax /> <Ranking /> <Parallax />
            </>
          }
        />
        <Route
          path="/Tienda"
          element={
            <>
              <Parallax /> <TiendaVirtual /> <Parallax />
            </>
          }
        />
        <Route
          path="/HistorialCompras"
          element={
            <>
              <Parallax /> <HistorialCompras /> <Parallax />
            </>
          }
        />
        <Route
          path="/CrearPregunta"
          element={
            <>
              <Parallax /> <CrearActualizarPregunta /> <Parallax />
            </>
          }
        />
        <Route
          path="/ListaPreguntas"
          element={
            <>
              <Parallax /> <PreguntasList /> <Parallax />
            </>
          }
        />
        <Route
          path="/editarPregunta/:id"
          element={
            <>
              <Parallax /> <EditarPregunta /> <Parallax />
            </>
          }
        />
        <Route
          path="/evento/:categoria"
          element={
            <>
              <Parallax /> <EventoGame /> <Parallax />
            </>
          }
        />
        <Route
          path="/preguntaDiaria"
          element={
            <>
              <Parallax /> <PreguntaDiariaGame /> <Parallax />
            </>
          }
        />
        <Route
          path="/categoria/:categoria"
          element={
            <>
              <Parallax /> <CampanyaGame /> <Parallax />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
