import React from "react";
import { useParams } from "react-router-dom";
import CrearActualizarPregunta from "./CrearActualizarPregunta";

const EditarPregunta = () => {
  const { id } = useParams();

  return (
    <div className="editar-pregunta">
      <h2>Editar Pregunta</h2>
      <CrearActualizarPregunta preguntaId={id} />
    </div>
  );
};

export default EditarPregunta;
