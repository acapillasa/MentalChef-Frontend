import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import FelicidadesCard from "./FelicidadesCard";

const CampanyaGame = () => {
  const { categoria } = useParams();
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  //const [respuestaEsCorrecta, setRespuestaEsCorrecta] = useState(null);
  const [haRespondido, setHaRespondido] = useState(false);
  const [mostrarCuriosidad, setMostrarCuriosidad] = useState(false); // Estado para mostrar la curiosidad
  const [juegoTerminado, setJuegoTerminado] = useState(false); // Estado para indicar si el juego ha terminado

  useEffect(() => {
    fetchPreguntas();
  }, [categoria]); // Se ejecuta cuando cambia la categoría

  const fetchPreguntas = async () => {
    try {
      const response = await fetch(`/preguntas/categoria/${categoria}`);
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      setPreguntas(data);
      setPreguntaActual(0); // Resetea el índice de la pregunta actual
      setHaRespondido(false); // Resetea el estado de respuesta cuando se obtiene una nueva pregunta
      setRespuestaSeleccionada(null); // Resetea la respuesta seleccionada
      setMostrarCuriosidad(false); // Resetea el estado de mostrar curiosidad
      setJuegoTerminado(false); // Resetea el estado de juego terminado
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
    }
  };

  const handleSeleccionarRespuesta = (respuesta) => {
    if (!haRespondido) {
      setRespuestaSeleccionada(respuesta);
      //setRespuestaEsCorrecta(respuesta.correcta);
      setHaRespondido(true);
    }
  };

  const handleSiguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
      setHaRespondido(false);
      setRespuestaSeleccionada(null);
      setMostrarCuriosidad(false);
    } else {
      // Manejar el final de la lista de preguntas
      setJuegoTerminado(true);
    }
  };

  const handleClickImagen = () => {
    setMostrarCuriosidad(!mostrarCuriosidad); // Alterna la visibilidad de la curiosidad
  };

  if (preguntas.length === 0) {
    return <div>Cargando preguntas...</div>;
  }

  if (juegoTerminado) {
    return <FelicidadesCard />;
  }

  const pregunta = preguntas[preguntaActual];

  if (!pregunta.respuestas || pregunta.respuestas.length === 0) {
    return <div>No se encontraron respuestas.</div>;
  }

  return (
    <div className="game">
      <div className="pregunta-imagen-container" onClick={handleClickImagen}>
        <img
          src={`/${pregunta.imagen}`}
          alt="Imagen relacionada con la pregunta"
        />
        {pregunta.curiosidad && mostrarCuriosidad && ( // Muestra la curiosidad solo si está activada
          <div className="curiosidad">
            {pregunta.curiosidad}
          </div>
        )}
      </div>
      <h3 className="question">{pregunta.pregunta}</h3>
      <div className="answers-grid">
        {pregunta.respuestas.map((respuesta, index) => (
          <div
            key={index}
            className={`answer ${
              haRespondido
                ? respuesta.correcta
                  ? "correct"
                  : respuestaSeleccionada === respuesta
                  ? "incorrect"
                  : ""
                : ""
            }`}
            onClick={() => handleSeleccionarRespuesta(respuesta)}
          >
            {respuesta.respuesta}
          </div>
        ))}
      </div>

      {haRespondido && (
        <button onClick={handleSiguientePregunta} className="reiniciar-juego">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};

export default CampanyaGame;