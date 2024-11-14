import ContadorMonedas from "components/tienda/ContadorMonedas";
import React from "react";
import { Link } from "react-router-dom";

const Bienvenida = () => {
  return (
    <div className="content">
      <Link to="/CrearPregunta">Crear Pregunta</Link>
      <Link to="/ListaPreguntas">Lista preguntas</Link>
      <Link to="/Tienda">Tienda</Link>
      <ContadorMonedas />
      <h2>Bienvenidos a MentalChef</h2>
      <p>¡Pon a prueba tus conocimientos de cocina!</p>
    </div>
  );
};

export default Bienvenida;
