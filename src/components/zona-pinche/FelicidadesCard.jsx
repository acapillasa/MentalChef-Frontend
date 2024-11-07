import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const FelicidadesCard = () => {
  const [showExtraMessage, setShowExtraMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowExtraMessage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-primary via-primary-hover to-secondary text-white rounded-lg shadow-lg flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">¡Felicidades!</h2>
      <p className="text-lg text-center">Has completado todas las preguntas.</p>
      {showExtraMessage && <p className="text-lg text-center mt-4">¡Bien hecho!</p>}
    </div>
  );
};

export default FelicidadesCard;