import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const QuickGameGame = () => {
  const [pregunta, setPregunta] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  //const [respuestaEsCorrecta, setRespuestaEsCorrecta] = useState(null);
  const [haRespondido, setHaRespondido] = useState(false);
  const [mostrarCuriosidad, setMostrarCuriosidad] = useState(false); // Estado para mostrar la curiosidad

  useEffect(() => {
    fetchPregunta();
    setTimeout(() => {
      const gameElement = document.querySelector('.game');
      if (gameElement) {
        gameElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 700); // Add a slight delay
  }, []); // Se ejecuta solo una vez al montar el componente

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchPregunta = async () => {
    try {
      const response = await fetch("/preguntas/alAzar");
      const data = await response.json();
      console.log("Pregunta:", data);
      setPregunta(data);
      setHaRespondido(false); // Resetea el estado de respuesta cuando se obtiene una nueva pregunta
      setRespuestaSeleccionada(null); // Resetea la respuesta seleccionada
      setMostrarCuriosidad(false); // Resetea el estado de mostrar curiosidad

      // Fetch answers using the question ID
      const responseRespuestas = await fetch(`/respuestas/preguntaId/${data.id}`);
      const respuestasData = await responseRespuestas.json();
      console.log("Respuestas:", respuestasData);
      setPregunta((prevPregunta) => ({
        ...prevPregunta,
        respuestas: shuffleArray(respuestasData), // Randomize the order of the answers
      }));
    } catch (error) {
      console.error("Error al obtener la pregunta:", error);
    }
  };

  const handleSeleccionarRespuesta = (respuesta) => {
    if (!haRespondido) {
      setRespuestaSeleccionada(respuesta);
      //setRespuestaEsCorrecta(respuesta.correcta);
      setHaRespondido(true);
    }
  };

  const handleReiniciarJuego = () => {
    fetchPregunta(); // Vuelve a cargar una nueva pregunta
        setTimeout(() => {
      const gameElement = document.querySelector('.game');
      if (gameElement) {
        gameElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 700); // Add a slight delay
  };

  const handleClickImagen = () => {
    setMostrarCuriosidad(!mostrarCuriosidad); // Alterna la visibilidad de la curiosidad
  };

  if (!pregunta) {
    return <div>Cargando pregunta...</div>;
  }

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
        <button onClick={handleReiniciarJuego} className="reiniciar-juego">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};

export default QuickGameGame;
