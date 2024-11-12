import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

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
import EditarPregunta from "components/EditarPregunta";
import Register from "components/autorizacion/Register";
import MiCocina from "components/zona-pinche/MiCocina";
import EventoGame from "components/zona-pinche/EventoGame"; // Importa el nuevo componente
import PreguntaDiariaGame from "components/zona-pinche/PreguntaDiariaGame"; // Importa el componente para la pregunta diaria
import CampanyaGame from "components/zona-pinche/CampanyaGame"; // Importa el componente para el detalle de la categoría
import TiendaVirtual from "components/tienda/TiendaVirtual";

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
        path="/Tienda"
        element={
          <>
            <Parallax /> <TiendaVirtual /> <Parallax />{" "}
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
            <Parallax /> <CrearActualizarPregunta /> <Parallax />{" "}
          </>
        }
      />
      <Route
        path="/evento/:categoria" // Nueva ruta para el detalle del evento
        element={
          <>
            <Parallax /> <EventoGame /> <Parallax />{" "}
          </>
        }
      />
      <Route
        path="/preguntaDiaria" // Nueva ruta para la pregunta diaria
        element={
          <>
            <Parallax /> <PreguntaDiariaGame /> <Parallax />{" "}
          </>
        }
      />
      <Route
        path="/categoria/:categoria" // Nueva ruta para el detalle de la categoría
        element={
          <>
            <Parallax /> <CampanyaGame /> <Parallax />{" "}
          </>
        }
      />
    </Routes>
    <Footer />
  </BrowserRouter>
);

reportWebVitals();
