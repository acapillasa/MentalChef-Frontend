import React from 'react';
import mouse from '../assets/mouse.png';

const GameExample = () => {
  return (
    <div className="game-example">
      <h3>Ejemplo de pregunta:</h3>
      <p className="question">¿Cuál es el ingrediente principal de una tortilla española?</p>
      <div className="answers-grid">
        <div className="answer">Arroz</div>
        <div className="answer correct">Patata</div>
        <div className="answer incorrect">
          <div className="mouse-answer">
            Pan
            <img
              src={mouse}
              alt="Mouse"
              className="mouse-image"
            />
          </div>
        </div>
        <div className="answer">Pasta</div>
      </div>
    </div>
  );
};

export default GameExample;
