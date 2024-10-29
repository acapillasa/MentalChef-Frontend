import React, { useState, useEffect } from 'react';

const CampanyaSelector = () => {
  const [categorias, setCategorias] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://10.14.1.17:8080/categorias');
        const data = await response.json();
        setCategorias(data); // Asumiendo que data es un array de objetos con la propiedad 'categoria'
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const siguienteGrupo = () => {
    setIndiceActual((prevIndice) => (prevIndice + 1) % categorias.length);
  };

  const anteriorGrupo = () => {
    setIndiceActual((prevIndice) => (prevIndice - 1 + categorias.length) % categorias.length);
  };

  if (categorias.length === 0) {
    return <div>Cargando categorías...</div>; // Mensaje mientras se cargan las categorías
  }

  return (
    <div className="campana">
      <h2>Campaña</h2>
      <div className="contenedor-campana">
        <button className="flecha izquierda" onClick={anteriorGrupo}>&lt;</button>
        <div className="contenido">
          <img
            src={`http://10.14.1.17:8080/images/categorias/${categorias[indiceActual].categoria}.jpg`} // URL de la imagen
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
