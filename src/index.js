import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./styles/scss.scss";
import "./styles/tailwind.css";
import './styles/output.css';
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
import EditarPregunta from "components/EditarPregunta";
import Register from "components/autorizacion/Register";
import MiCocina from "components/zona-pinche/MiCocina";

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
        path="/MiCocina"
        element={
          <>
            <Parallax /> <MiCocina /> <Parallax />{" "}
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
