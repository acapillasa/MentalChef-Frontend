import React, { useState, useEffect } from "react";

const PreguntaDiariaSelector = () => {
  return (
    <div className="campana text-secondary bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-4">Pregunta diaria</h2>
      <div className="contenedor-campana">
        <div className="contenido">
          <button
            role="button"
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
          >
            <span className="golden-text">Responder</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreguntaDiariaSelector;
