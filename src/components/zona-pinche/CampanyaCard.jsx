import React from 'react';
import { Link } from 'react-router-dom';

const CampanyaCard = ({ categoria }) => {
  return (
    <div className="contenido mx-4">
      <h2 className="text-2xl font-bold text-secondary mb-4">Campaña</h2>
      <Link to={`/categoria/${categoria.categoria}`}>
        <img
          src={`/images/categorias/${categoria.categoria}.jpg`} // URL de la imagen
          alt={`Imagen de ${categoria.categoria}`} // Texto alternativo para la imagen
          className="imagen-campana rounded-lg shadow-md"
        />
      </Link>
      <div className="texto-campana mt-4 text-center">
        <p className="text-lg font-medium text-secondary">
          Comida {categoria.categoria}
        </p>
      </div>
    </div>
  );
};

export default CampanyaCard;