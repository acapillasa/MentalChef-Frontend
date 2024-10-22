import React, { useState } from 'react';
import './PreguntaGrupos.scss';

const gruposPreguntas = [
  { img: 'images/foto1.jpg', texto: 'Grupo 1' },
  { img: 'images/foto2.jpg', texto: 'Grupo 2' },
  { img: 'images/foto3.jpg', texto: 'Grupo 3' },
  { img: 'images/foto4.jpg', texto: 'Grupo 4' }
];

const CampañaSelector = () => {
  const [indiceActual, setIndiceActual] = useState(0);

  const siguienteGrupo = () => {
    setIndiceActual((prevIndice) => (prevIndice + 1) % gruposPreguntas.length);
  };

  const anteriorGrupo = () => {
    setIndiceActual((prevIndice) => (prevIndice - 1 + gruposPreguntas.length) % gruposPreguntas.length);
  };

  return (
    <div className="campana">
      <h2>Campaña</h2>
      <div className="contenedor-campana">
        <button className="flecha izquierda" onClick={anteriorGrupo}>&lt;</button>
        <div className="contenido">
          <img src={gruposPreguntas[indiceActual].img} alt="Imagen del grupo" className="imagen-campana" />
          <div className="texto-campana">
            <p>{gruposPreguntas[indiceActual].texto}</p>
            <button className="btn-empezar">Empezar</button>
          </div>
        </div>
        <button className="flecha derecha" onClick={siguienteGrupo}>&gt;</button>
      </div>
    </div>
  );
};

export default CampañaSelector;
