import React from 'react';
import { useLocation } from 'react-router-dom';
import CampanyaSelector from './CampanyaSelector';
import PreguntaDiariaSelector from './PreguntaDiariaSelector';
import EventoSelector from './EventoSelector';

const MiCocina = () => {
  const location = useLocation();
  const resultado = location.state?.resultado;

  return (
    <div className="grid-container">
      <div className="eventos">
        <EventoSelector />
      </div>
      <div className="pregunta-diaria">
        <PreguntaDiariaSelector resultado={resultado} />
      </div>
      <div className="campanya">
        <CampanyaSelector />
      </div>
    </div>
  );
};

export default MiCocina;