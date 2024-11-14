import React, { useState } from "react";
import CampanyaCard from "./CampanyaCard";

const CampanyaSelector = ({ categorias }) => {
  const [indiceActual, setIndiceActual] = useState(0);

  const anteriorGrupo = () => {
    setIndiceActual(
      (prevIndice) => (prevIndice - 1 + categorias.length) % categorias.length
    );
  };

  const siguienteGrupo = () => {
    setIndiceActual((prevIndice) => (prevIndice + 1) % categorias.length);
  };

  if (categorias.length === 0) {
    return <div className="text-secondary">No hay categorías disponibles.</div>;
  }

  return (
    <div className="campana bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="contenedor-campana flex items-center">
        <button
          className="flecha izquierda text-primary hover:text-primary-hover"
          onClick={anteriorGrupo}
        >
          &lt;
        </button>
        <CampanyaCard categoria={categorias[indiceActual]} />
        <button
          className="flecha derecha text-primary hover:text-primary-hover"
          onClick={siguienteGrupo}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CampanyaSelector;
