import React from "react";
import MonedaVirtual from "./MonedaVirtual";

const TiendaVirtual = () => {
  const tickets = [
    { precio: 5, descripcion: "Ticket Básico", puntos: 50 },
    { precio: 10, descripcion: "Ticket Estándar", puntos: 100 },
    { precio: 20, descripcion: "Ticket Premium", puntos: 200 },
  ];

  // Función para crear el texto rotativo
  const RotatingText = ({ text }) => {
    return (
      <div className="flex justify-center mb-8">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="text-4xl font-bold inline-block animate-spin-slow"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 text-secondary">
      <RotatingText text="Tienda Virtual" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tickets.map((ticket, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{ticket.descripcion}</h3>
              <div className="flex items-center">
                  <MonedaVirtual />
                <span className="ml-2 text-xl font-bold">{ticket.puntos} puntos</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 sm:mt-10">
              <span className="text-2xl font-bold">${ticket.precio}</span>
              <button className="bg-primary text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300">
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiendaVirtual;
