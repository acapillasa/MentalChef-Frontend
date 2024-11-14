import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CampanyaSelector from './CampanyaSelector';
import PreguntaDiariaSelector from './PreguntaDiariaSelector';
import EventoSelector from './EventoSelector';

const MiCocina = () => {
  const location = useLocation();
  const resultado = location.state?.resultado;
  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEventos = await fetch('/categorias/categoriasConEvento');
        if (!responseEventos.ok) {
          throw new Error('Network response was not ok');
        }
        const dataEventos = await responseEventos.json();
        setEventos(dataEventos);

        const responseCategorias = await fetch('/categorias/categoriasSinEvento');
        if (!responseCategorias.ok) {
          throw new Error('Network response was not ok');
        }
        const dataCategorias = await responseCategorias.json();
        setCategorias(dataCategorias);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-secondary">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-secondary">Error al cargar datos: {error.message}</div>;
  }

  return (
    <div className="grid-container">
      <div className="eventos">
        <EventoSelector eventos={eventos} />
      </div>
      <div className="pregunta-diaria">
        <PreguntaDiariaSelector resultado={resultado} />
      </div>
      <div className="campanya">
        <CampanyaSelector categorias={categorias} />
      </div>
    </div>
  );
};

export default MiCocina;