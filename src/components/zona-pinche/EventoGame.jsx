import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import FelicidadesCard from './FelicidadesCard'; // Import FelicidadesCard

const EventoGame = () => {
  const { categoria } = useParams();
  const [preguntas, setPreguntas] = useState([]);
  const [currentPreguntaIndex, setCurrentPreguntaIndex] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [haRespondido, setHaRespondido] = useState(false);
  const [mostrarCuriosidad, setMostrarCuriosidad] = useState(false); // Estado para mostrar la curiosidad
  const [showFelicidades, setShowFelicidades] = useState(false); // Estado para mostrar FelicidadesCard

  useEffect(() => {
    fetchPreguntas();
  }, [categoria]); // Se ejecuta cuando cambia la categoría

  const fetchRespuestas = async (preguntaId) => {
    try {
      const response = await fetch(`/respuestas/preguntaId/${preguntaId}`);
      const data = await response.json();
      return data.sort(() => Math.random() - 0.5); // Randomize the order of answers
    } catch (error) {
      console.error("Error al obtener las respuestas:", error);
      return [];
    }
  };

  const fetchPreguntas = async () => {
    try {
      const response = await fetch(`/preguntas/categoria/${categoria}`);
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      for (const pregunta of data) {
        pregunta.respuestas = await fetchRespuestas(pregunta.id);
      }
      setPreguntas(data);
      setCurrentPreguntaIndex(0);
      setHaRespondido(false); // Resetea el estado de respuesta cuando se obtiene una nueva pregunta
      setRespuestaSeleccionada(null); // Resetea la respuesta seleccionada
      setMostrarCuriosidad(false); // Resetea el estado de mostrar curiosidad
      setShowFelicidades(false); // Resetea el estado de mostrar FelicidadesCard
    } catch (error) {
      console.error("Error al obtener la pregunta:", error);
    }
  };

  const handleSeleccionarRespuesta = (respuesta) => {
    if (!haRespondido) {
      setRespuestaSeleccionada(respuesta);
      setHaRespondido(true);
    }
  };

  const handleSiguientePregunta = async () => {
    if (currentPreguntaIndex < preguntas.length - 1) {
      setCurrentPreguntaIndex(currentPreguntaIndex + 1);
      setHaRespondido(false);
      setRespuestaSeleccionada(null);
      setMostrarCuriosidad(false);
    } else {
      try {
        const response = await fetch('/usuarios/monedasV/evento', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al enviar las monedas');
        }

        console.log('Monedas enviadas exitosamente');
        setShowFelicidades(true); // Show FelicidadesCard when no more questions are available
      } catch (error) {
        console.error('Error al enviar las monedas:', error);
      }
    }
  };

  const handleClickImagen = () => {
    setMostrarCuriosidad(!mostrarCuriosidad); // Alterna la visibilidad de la curiosidad
  };

  if (preguntas.length === 0) {
    return <div>Cargando pregunta...</div>;
  }

  if (showFelicidades) {
    return <FelicidadesCard />;
  }

  const pregunta = preguntas[currentPreguntaIndex];

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

export default EventoGame;