import React from "react";
import { Brain } from "lucide-react";

const CoinExplanation = () => {
  return (
    <div className="content">
      <div className="w-10 h-10 bg-zinc-800 rounded-full shadow-lg flex items-center justify-center">
        <Brain className="text-primary" />
      </div>
      <h2>Gana Monedas Virtuales</h2>
      <div className="w-10 h-10 mr bg-zinc-800 rounded-full shadow-lg flex items-center justify-center">
        <Brain className="text-primary" />
      </div>
      <p>
        Participa en nuestros juegos y actividades para ganar{" "}
        <strong className="font-bold text-primary">Mental Coins</strong>. Estas
        monedas pueden ser canjeadas por vales de compra en diferentes mercados.
      </p>
      <div className="game-example">
        <div className="answers-grid">
          <div className="answer">Mercadona</div>
          <div className="answer">Alcampo</div>
          <div className="answer">Dia</div>
          <div className="answer">El Corte Inglés</div>
        </div>
      </div>
    </div>
  );
};

export default CoinExplanation;
