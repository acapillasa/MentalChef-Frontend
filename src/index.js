import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./styles/scss.scss";

import Header from "./components/globales/Header";
import ButtonDarkMode from "./components/globales/ButtonDarkMode";
import Parallax from "./components/globales/Parallax";
import Bienvenida from "./components/principales/Bienvenida";
import Instructions from "./components/principales/Instructions";
import GameExample from "./components/principales/GameExample";
import QuickGame from "./components/principales/QuickGame";
import Footer from "./components/globales/Footer";
import Login from "./components/Login"; // Importa el componente de Login
import QuickGameGame from "components/QuickGameGame";
import CampanyaSelector from "components/CampanyaSelector";
import CrearPregunta from "components/CrearPregunta";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ButtonDarkMode />
    <Header />
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
        element={
          <>
            <Parallax /> <Login /> <Parallax />{" "}
          </>
        }
      />
      <Route
        path="/jugar"
        element={
          <>
            <Parallax /> <QuickGameGame /> <Parallax />{" "}
          </>
        }
      />
      <Route
        path="/MisCosas"
        element={
          <>
            <Parallax /> <CampanyaSelector /> <Parallax />{" "}
          </>
        }
      />
      <Route
        path="/CrearPregunta"
        element={
          <>
            <Parallax /> <CrearPregunta /> <Parallax />{" "}
          </>
        }
      />
    </Routes>
    <Footer />
  </BrowserRouter>
);

reportWebVitals();
