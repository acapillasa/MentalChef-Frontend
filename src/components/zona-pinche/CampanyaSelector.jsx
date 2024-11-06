import React, { useState, useEffect } from 'react';

const CampanyaSelector = () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('https://10.14.1.17:8080/categorias/categoriasSinEvento'); // Asegúrate de que esta URL sea correcta
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const categoriasFiltradas = data.filter(categoria => !categoria.categoria.startsWith('evento_'));
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
    setIndiceActual((prevIndice) => (prevIndice - 1 + categorias.length) % categorias.length);
  };

  const siguienteGrupo = () => {
    setIndiceActual((prevIndice) => (prevIndice + 1) % categorias.length);
  };

  if (isLoading) {
    return <div>Cargando categorías...</div>;
  }

  if (error) {
    return <div>Error al cargar categorías: {error.message}</div>;
  }

  if (categorias.length === 0) {
    return <div>No hay categorías disponibles.</div>;
  }

  return (
    <div className="campana">
      <h2 className='text-secondary'>Campaña</h2>
      <div className="contenedor-campana">
        <button className="flecha izquierda" onClick={anteriorGrupo}>&lt;</button>
        <div className="contenido">
          <img
            src={`https://10.14.1.17:8080/images/categorias/${categorias[indiceActual].categoria}.jpg`} // URL de la imagen
            alt={`Imagen de ${categorias[indiceActual].categoria}`} // Texto alternativo para la imagen
            className="imagen-campana"
          />
          <div className="texto-campana">
          <p>Comida {categorias[indiceActual].categoria}</p> {/* Mostrar el nombre de la categoría */}
          <button className="btn-empezar">Empezar</button>
          </div>
        </div>
        <button className="flecha derecha" onClick={siguienteGrupo}>&gt;</button>
      </div>
    </div>
  );
};

export default CampanyaSelector;
