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
import Login from "./components/autorizacion/Login"; // Importa el componente de Login
import QuickGameGame from "components/QuickGameGame";
import CampanyaSelector from "components/CampanyaSelector";
import CrearActualizarPregunta from "components/CrearActualizarPregunta";
import PreguntasList from "components/PreguntasList";
import EditarPregunta from "components/EditarPregunta";
import Register from "components/autorizacion/Register";

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
        path="/register"
        element={
          <>
            <Parallax /> <Register /> <Parallax />{" "}
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
            <Parallax /> <CrearActualizarPregunta /> <Parallax />{" "}
          </>
        }
      />
      <Route
        path="/ListaPreguntas"
        element={
          <>
            <Parallax /> <PreguntasList /> <Parallax />{" "}
          </>
        }
      />
      <Route
        path="/editarPregunta/:id"
        element={
          <>
            <Parallax /> <EditarPregunta /> <Parallax />{" "}
          </>
        }
      />
    </Routes>
    <Footer />
  </BrowserRouter>
);

reportWebVitals();
