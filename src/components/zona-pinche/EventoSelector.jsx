import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const EventoSelector = () => {
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('/categorias/categoriasConEvento'); // Asegúrate de que esta URL sea correcta
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEventos(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (isLoading) {
    return <div className="text-secondary">Cargando eventos...</div>;
  }

  if (error) {
    return <div className="text-secondary">Error al cargar eventos: {error.message}</div>;
  }

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