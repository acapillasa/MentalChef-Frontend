import React from "react";
import { Link } from "react-router-dom";

const QuickGame = () => {
  return (
    <div className="content">
      <h2>¿Listo para un desafío rápido?</h2>
      <p>¡Pon a prueba tus conocimientos de cocina!</p>
      <div className="partida-rapida">
        <p>¡Comienza una partida ahora!</p>
        <Link to="/jugar" className="btn-partida-rapida">
          Jugar Partida Rápida
        </Link>
      </div>
    </div>
  );
};

export default QuickGame;
