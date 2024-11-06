import React from 'react';
import CampanyaSelector from './CampanyaSelector';
import PreguntaDiariaSelector from './PreguntaDiariaSelector';
import EventoSelector from './EventoSelector';

const MiCocina = () => {
  return (
	<>
	  <PreguntaDiariaSelector />
	  <CampanyaSelector />
	  <EventoSelector />
	</>
  );
};

export default MiCocina;