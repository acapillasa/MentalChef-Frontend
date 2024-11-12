import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PreguntasList = () => {
  const [preguntas, setPreguntas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPreguntas();
  }, []);

  const fetchPreguntas = async () => {
    try {
      const response = await fetch("https://10.14.1.17:8080/preguntas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPreguntas(data);
    } catch (error) {
      console.error("Error al obtener preguntas:", error);
    }
  };

  const handleUpdate = (id) => {
    console.log(`Actualizar pregunta con id: ${id}`);
    navigate(`/editarPregunta/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://10.14.1.17:8080/preguntas/eliminar/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPreguntas(preguntas.filter((pregunta) => pregunta.id !== id));
      } else {
        console.error("Error al eliminar la pregunta");
      }
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error);
    }
  };

  const handleVerify = async (id) => {
    try {
      const response = await fetch(`/preguntas/verificar/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchPreguntas();
      } else {
        console.error("Error al verificar la pregunta");
      }
    } catch (error) {
      console.error("Error al verificar pregunta:", error);
    }
  };

  return (
    <div className="preguntas-container">
      <h2 className="titulo">Lista de Preguntas</h2>
      <ul className="preguntas-lista">
        {preguntas.map((pregunta) => (
          <li key={pregunta.id} className="pregunta-item">
            <div className="pregunta-content">
              <strong className="pregunta-texto">{pregunta.pregunta}</strong>
              <p className="pregunta-detalle">
                Dificultad: {pregunta.dificultad}
              </p>
              <p className="pregunta-detalle">
                Verificado: {pregunta.verificado ? "Sí" : "No"}
              </p>
            </div>
            <div className="pregunta-botones">
              <button onClick={() => handleUpdate(pregunta.id)}>
                Actualizar
              </button>
              <button onClick={() => handleDelete(pregunta.id)}>
                Eliminar
              </button>
              {!pregunta.verificado && (
                <button onClick={() => handleVerify(pregunta.id)}>
                  Verificar
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreguntasList;
