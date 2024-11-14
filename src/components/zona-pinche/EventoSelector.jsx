import React from 'react';
import EventCard from './EventCard';

const EventoSelector = ({ eventos }) => {
  const obtenerNombreEvento = (categoria) => {
    const partes = categoria.split('_');
    return `evento ${partes.slice(2).join(' ')}`;
  };

  const obtenerNombreColaborador = (categoria) => {
    const partes = categoria.split('_');
    return partes.slice(2).join(' ');
  };

  return (
    <div className="eventos-container">
      {eventos.map((evento, index) => (
        <EventCard
          key={index}
          eventName={obtenerNombreEvento(evento.categoria)}
          collaboratorName={obtenerNombreColaborador(evento.categoria)}
          link={`/evento/${evento.categoria}`}
        />
      ))}
    </div>
  );
};

export default EventoSelector;