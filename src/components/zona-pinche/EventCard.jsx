import React from 'react';
import { Link } from 'react-router-dom';
import { Triangle } from 'lucide-react';

const EventCard = ({ 
  eventName = "Nombre del Evento",
  collaboratorName = "Colaborador",
  link = "#" // Añade una propiedad para el enlace
}) => {
  return (
    <div className="relative w-full max-w-2xl overflow-hidden border-2 bg-primary shadow-md rounded-lg p-6">

      {/* Nombre Evento y Triángulo */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <h2 className="mb-6 text-center text-2xl font-bold">{eventName}</h2>
        <Link to={link} className="inline-block">
          <Triangle className="h-24 w-24 cursor-pointer" />
        </Link>
      </div>

      {/* Colaboración */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 shadow-sm">
        <span className="text-sm text-primary font-medium">{collaboratorName}</span>
      </div>
    </div>
  );
};

export default EventCard;