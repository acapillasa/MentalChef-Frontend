import React from 'react';

const QuickGame = () => {
  return (
    <div className="content">
      <h2>¿Listo para un desafío rápido?</h2>
      <p>¡Pon a prueba tus conocimientos de cocina!</p>
      <div className="partida-rapida">
        <p>¡Comienza una partida ahora!</p>
        <a href="#jugar" className="btn-partida-rapida">Jugar Partida Rápida</a>
      </div>
    </div>
  );
};

export default QuickGame;
