import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CampanyaSelector from "../zona-pinche/CampanyaSelector";
import PreguntaDiariaSelector from "../zona-pinche/PreguntaDiariaSelector";
import EventoSelector from "../zona-pinche/EventoSelector";

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
        const responseEventos = await fetch("/categorias/categoriasConEvento");
        if (!responseEventos.ok) {
          throw new Error("Network response was not ok");
        }
        const dataEventos = await responseEventos.json();
        setEventos(dataEventos);

        const responseCategorias = await fetch(
          "/categorias/categoriasSinEvento"
        );
        if (!responseCategorias.ok) {
          throw new Error("Network response was not ok");
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
    return (
      <div className="text-secondary">
        Error al cargar datos: {error.message}
      </div>
    );
  }

  return (
    <div className="grid-container flex flex-col md:flex-row">
      <div className="eventos w-full md:w-1/3 h-60 md:h-auto">
        <EventoSelector eventos={eventos} />
      </div>
      <div className="flex flex-col w-full md:w-2/3">
        <div className="pregunta-diaria w-full">
          <PreguntaDiariaSelector resultado={resultado} />
        </div>
        <div className="campanya w-full">
          <CampanyaSelector categorias={categorias} />
        </div>
      </div>
    </div>
  );
};

export default MiCocina;
