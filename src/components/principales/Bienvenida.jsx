import ContadorMonedas from "components/tienda/ContadorMonedas";
import React from "react";

const Bienvenida = () => {
  return (
    <div className="content">
      <a href="/CrearPregunta">Crear Pregunta</a>
      <a href="/ListaPreguntas">Lista preguntas</a>
      <a href="/Tienda">Tienda</a>
      <ContadorMonedas />
      <h2>Bienvenidos a MentalChef</h2>
      <p>¡Pon a prueba tus conocimientos de cocina!</p>
    </div>
  );
};

export default Bienvenida;
