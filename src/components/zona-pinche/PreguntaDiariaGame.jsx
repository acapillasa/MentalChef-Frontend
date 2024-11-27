import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const PreguntaDiariaGame = () => {
  const [pregunta, setPregunta] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [respuestaEsCorrecta, setRespuestaEsCorrecta] = useState(null);
  const [haRespondido, setHaRespondido] = useState(false);
  const [mostrarCuriosidad, setMostrarCuriosidad] = useState(false); // Estado para mostrar la curiosidad
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const lastAnsweredDate = localStorage.getItem('lastAnsweredDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastAnsweredDate === today) {
      setHaRespondido(true);
    } else {
      fetchPregunta();
    }
    setTimeout(() => {
      const gameElement = document.querySelector('.game');
      if (gameElement) {
        gameElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 700); // Add a slight delay
  }, []); // Se ejecuta solo una vez al montar el componente

  const fetchPregunta = async () => {
    try {
      const response = await fetch("/preguntas/diaria");
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
        respuestas: respuestasData.sort(() => Math.random() - 0.5), // Randomize the order of answers
      }));
    } catch (error) {
      console.error("Error al obtener la pregunta:", error);
    }
  };

  const handleSeleccionarRespuesta = (respuesta) => {
    if (!haRespondido) {
      setRespuestaSeleccionada(respuesta);
      setRespuestaEsCorrecta(respuesta.correcta);
      setHaRespondido(true);
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('lastAnsweredDate', today);
      localStorage.setItem('resultado', respuesta.correcta);
    }
  };

  const handleReiniciarJuego = () => {
    fetchPregunta(); // Vuelve a cargar una nueva pregunta
  };

  const handleClickImagen = () => {
    setMostrarCuriosidad(!mostrarCuriosidad); // Alterna la visibilidad de la curiosidad
  };

  const handleVolverMiCocina = () => {
    navigate('/MiCocina', { state: { resultado: respuestaEsCorrecta } }); // Redirige a /MiCocina con el resultado
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
        <button onClick={handleVolverMiCocina} className="reiniciar-juego">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};

export default PreguntaDiariaGame;