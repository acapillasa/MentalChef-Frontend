import React, { useState, useEffect } from "react";
import CampanyaCard from "./CampanyaCard";

const CampanyaSelector = () => {
  const [categorias, setCategorias] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(
          "https://10.14.1.17:8080/categorias/categoriasSinEvento"
        ); // Asegúrate de que esta URL sea correcta
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const categoriasFiltradas = data.filter(
          (categoria) => !categoria.categoria.startsWith("evento_")
        );
        setCategorias(categoriasFiltradas);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const anteriorGrupo = () => {
    setIndiceActual(
      (prevIndice) => (prevIndice - 1 + categorias.length) % categorias.length
    );
  };

  const siguienteGrupo = () => {
    setIndiceActual((prevIndice) => (prevIndice + 1) % categorias.length);
  };

  if (isLoading) {
    return <div className="text-secondary">Cargando categorías...</div>;
  }

  if (error) {
    return (
      <div className="text-secondary">
        Error al cargar categorías: {error.message}
      </div>
    );
  }

  if (categorias.length === 0) {
    return <div className="text-secondary">No hay categorías disponibles.</div>;
  }

  return (
    <div className="campana bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="contenedor-campana flex items-center">
        <button
          className="flecha izquierda text-primary hover:text-primary-hover"
          onClick={anteriorGrupo}
        >
          &lt;
        </button>
        <CampanyaCard categoria={categorias[indiceActual]} />
        <button
          className="flecha derecha text-primary hover:text-primary-hover"
          onClick={siguienteGrupo}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CampanyaSelector;
