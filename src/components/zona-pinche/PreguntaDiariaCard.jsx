import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const PreguntaDiariaCard = ({ 
  onQuestionClick = () => console.log('Question clicked'),
  isAnswered = false,
  resultado = null // Recibir el resultado
}) => {
  const handleKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && !isAnswered) {
      event.preventDefault();
      onQuestionClick();
    }
  };

  return (
    <div className="p-6">
      {/* Título */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <Sparkles className="h-5 w-5 text-white" />
        <h2 className="text-center text-2xl font-bold">Pregunta diaria</h2>
        <Sparkles className="h-5 w-5 text-white" />
      </div>

      {/* Botón Central */}
      <Link to={isAnswered ? "#" : "/preguntaDiaria"} className="block">
        <div 
          onClick={!isAnswered ? onQuestionClick : undefined}
          onKeyDown={!isAnswered ? handleKeyDown : undefined}
          className={`mx-auto block w-full max-w-md cursor-pointer rounded-lg 
            transform transition-all duration-200 
            hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isAnswered 
              ? resultado === true 
                ? 'bg-correcto hover:bg-green-600 focus:ring-correcto' 
                : 'bg-incorrecto hover:bg-red-600 focus:ring-incorrecto'
              : 'bg-rojo-fuego hover:bg-primary-hover focus:ring-primary-hover'
            }`}
          role="button"
          tabIndex={0}
          aria-pressed={isAnswered}
        >
          <div className="flex h-24 items-center justify-center">
            <span className="text-lg font-medium text-white">
              {isAnswered 
                ? resultado === true 
                  ? '¡Correcto!' 
                  : '¡Incorrecto!' 
                : 'Responder pregunta'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PreguntaDiariaCard;