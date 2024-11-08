import React from 'react';
import MonedaVirtual from './MonedaVirtual';

const ContadorMonedas = () => {
  return (
    <div className="flex items-center justify-center p-3 bg-white rounded-full shadow-lg">
      <div className="mr-5">
        <MonedaVirtual />
      </div>
      <div className="contador bg-primary text-white font-bold text-2xl ml-4 py-2 px-10 rounded-full shadow-md">
        <span className="amount">47</span>
      </div>
    </div>
  );
};

export default ContadorMonedas;