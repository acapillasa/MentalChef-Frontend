import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import QuickGameGame from "components/QuickGameGame";
import CrearActualizarPregunta from "components/CrearActualizarPregunta";
import PreguntasList from "components/PreguntasList";
import Register from "components/autorizacion/Register";
import MiCocina from "components/zona-pinche/MiCocina";
import EventoGame from "components/zona-pinche/EventoGame";
import PreguntaDiariaGame from "components/zona-pinche/PreguntaDiariaGame";
import CampanyaGame from "components/zona-pinche/CampanyaGame";
import TiendaVirtual from "components/tienda/TiendaVirtual";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/usuarios/isAuthenticated', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        const isAuthenticated = await response.json();
        setIsLoggedIn(isAuthenticated);
      } catch (error) {
        console.error('Error checking auth status:', error);
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
    <BrowserRouter>
      <ButtonDarkMode />
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Parallax />
              <Bienvenida />
              <Parallax />
              <Instructions />
              <GameExample />
              <Parallax />
              <QuickGame />
              <Parallax />
            </>
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={handleLogin} />}
        />
        <Route
          path="/register"
          element={
            <>
              <Parallax /> <Register /> <Parallax />
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
          path="/Tienda"
          element={
            <>
              <Parallax /> <TiendaVirtual /> <Parallax />
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
              <Parallax /> <CrearActualizarPregunta /> <Parallax />
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
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
