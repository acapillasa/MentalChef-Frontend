import React from 'react';
import MonedaVirtual from './MonedaVirtual';

const ContadorMonedas = ({ monedasV }) => {
  return (
    <div className="flex items-center justify-center p-1 bg-white rounded-full shadow-lg">
      <div className="mr-2">
        <MonedaVirtual />
      </div>
      <div className="contador bg-primary text-white font-bold text-lg ml-2 py-1 px-5 rounded-full shadow-md">
        <span className="amount">{monedasV}</span>
      </div>
    </div>
  );
};

export default ContadorMonedas;