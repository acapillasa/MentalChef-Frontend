import React, { useState, useEffect } from 'react';
import PreguntaDiariaCard from './PreguntaDiariaCard';

const PreguntaDiariaSelector = ({ resultado }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [storedResultado, setStoredResultado] = useState(null);

  useEffect(() => {
    const lastAnsweredDate = localStorage.getItem('lastAnsweredDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastAnsweredDate === today) {
      setIsAnswered(true);
      const storedResult = localStorage.getItem('resultado');
      setStoredResultado(storedResult === 'true');
    } else if (resultado !== undefined) {
      setIsAnswered(true);
      setStoredResultado(resultado);
      localStorage.setItem('resultado', resultado);
      localStorage.setItem('lastAnsweredDate', today);
    }
  }, [resultado]);

  const handleQuestionClick = () => {
    console.log('Question clicked');
    setIsAnswered(true); // Actualiza el estado cuando se hace clic en la pregunta
  };

  return (
    <div className="campana text-secondary bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="contenedor-campana">
        <div className="contenido">
          <PreguntaDiariaCard 
            onQuestionClick={handleQuestionClick} 
            isAnswered={isAnswered} 
            resultado={storedResultado} // Pasar el resultado al componente PreguntaDiariaCard
          />
        </div>
      </div>
    </div>
  );
};

export default PreguntaDiariaSelector;
