import React, { useState, useEffect } from 'react';

const QuickGameGame = () => {
  const [pregunta, setPregunta] = useState(null);

  useEffect(() => {
    const fetchPregunta = async () => {
        try {
          const response = await fetch('http://localhost:8080/preguntas/alAzar');
          const data = await response.json();
          console.log("Respuesta del servidor:", data);
          setPregunta(data);
        } catch (error) {
          console.error('Error al obtener la pregunta:', error);
        }
      };

    fetchPregunta();
  }, []);

  if (!pregunta) {
    return <div>Cargando pregunta...</div>;  // Mientras no haya una pregunta, muestra esto
  }

  // Verifica que "respuestas" esté presente en la pregunta antes de intentar acceder a él
  if (!pregunta.respuestas || pregunta.respuestas.length === 0) {
    return <div>No se encontraron respuestas.</div>;  // En caso de que no existan respuestas
  }

  return (
    <div className="game">
      <h3 className="question">{pregunta.pregunta}</h3>
      <div className="answers-grid">
        {pregunta.respuestas.map((respuesta, index) => (
          <div
            key={index}
            className={`answer ${respuesta.correcta ? 'correct' : 'incorrect'}`}          >
            {respuesta.respuesta}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickGameGame;
