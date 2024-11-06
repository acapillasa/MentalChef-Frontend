import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const EventoSelector = () => {
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
	const fetchCategorias = async () => {
	  try {
		const response = await fetch('https://10.14.1.17:8080/categorias/categoriasConEvento'); // Asegúrate de que esta URL sea correcta
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
	return <div>Cargando eventos...</div>;
  }

  if (error) {
	return <div>Error al cargar eventos: {error.message}</div>;
  }

  return (
	<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	  {eventos.map((evento, index) => (
		<EventCard
		  key={index}
		  eventName={evento.nombre}
		  timeRemaining={evento.tiempoRestante}
		  collaboratorName={evento.colaboradorNombre}
		  collaboratorImage={evento.colaboradorImagen}
		/>
	  ))}
	</div>
  );
};

export default EventoSelector;