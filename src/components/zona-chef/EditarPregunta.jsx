import React from "react";
import { useParams } from "react-router-dom";
import CrearActualizarPregunta from "../zona-logueado/CrearActualizarPregunta";

const EditarPregunta = () => {
  const { id } = useParams();

  return (
    <div className="editar-pregunta">
      <h2 className="mt-4 text-secondary text-center text-2xl border-b-2 border-secondary pb-2">
        Editando Pregunta y Respuestas
      </h2>
      <CrearActualizarPregunta preguntaId={id} />
    </div>
  );
};

export default EditarPregunta;
