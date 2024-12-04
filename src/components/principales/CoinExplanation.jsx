import React, { useState, useRef, useEffect } from "react";
import { Brain } from "lucide-react";

const CoinExplanation = () => {
  const [showBills, setShowBills] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
    }
  }, []);

  const handleMouseEnter = () => {
    setShowBills(true);
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setShowBills(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="content">
      <audio ref={audioRef} src="/images/audios/money.mp3" preload="auto" />
      <div className="w-10 h-10 bg-zinc-800 rounded-full shadow-lg flex items-center justify-center">
        <Brain className="text-primary" />
      </div>
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2>Gana Monedas Virtuales</h2>
        {showBills && (
          <div className="bills-animation">
            <img src="/images/bill.png" alt="Bill" className="bill falling-bill" />
            <img src="/images/bill.png" alt="Bill" className="bill falling-bill" />
            <img src="/images/bill.png" alt="Bill" className="bill falling-bill" />
            <img src="/images/bill.png" alt="Bill" className="bill falling-bill" />
            <img src="/images/bill.png" alt="Bill" className="bill falling-bill" />
            <img src="/images/bill.png" alt="Bill" className="bill falling-bill" />
          </div>
        )}
      </div>
      <div className="w-10 h-10 mr bg-zinc-800 rounded-full shadow-lg flex items-center justify-center">
        <Brain className="text-primary" />
      </div>
      <p>
        Participa en nuestros juegos y actividades para ganar{" "}
        <strong className="font-bold text-primary">Mental Coins</strong>. Estas
        monedas pueden ser canjeadas por vales de compra en diferentes mercados.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-center">
        <img src="/images/tienda/mercadona.jpg" alt="Mercadona" />
        <img src="/images/tienda/carrefour.jpg" alt="Carrefour" />
        <img src="/images/tienda/elcorteingles.jpg" alt="El Corte Ingles" className="sm:col-span-2 sm:justify-self-center md:col-span-1 md:justify-self-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-4 justify-items-center items-center md:col-span-3">
        <img src="/images/tienda/eroski.jpg" alt="Eroski" />
        <img src="/images/tienda/alcampo.jpg" alt="Alcampo" />
      </div>
    </div>
  );
};

export default CoinExplanation;
