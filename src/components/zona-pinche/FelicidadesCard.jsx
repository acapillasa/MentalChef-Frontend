import React from 'react';
import { Link } from 'react-router-dom';

const FelicidadesCard = () => {
  return (
    <div className="p-6 bg-gradient-to-b from-primary via-primary-hover to-secondary text-white rounded-lg shadow-lg flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">¡Felicidades!</h2>
      <p className="text-lg text-center">Has completado todas las preguntas.</p>
      <p className="text-lg text-center mt-4">¡Bien hecho!</p>
      <Link 
        to="/MiCocina" 
        className="mt-6 bg-gradient-to-r from-primary to-primary-hover text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
      >
        Volver a MiCocina
      </Link>
    </div>
  );
};

export default FelicidadesCard;