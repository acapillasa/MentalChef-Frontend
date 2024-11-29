import React from "react";
import { Brain } from "lucide-react";

const MonedaVirtual = ({ cantidad }) => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 bg-zinc-800 rounded-full shadow-lg flex items-center justify-center">
        <Brain className="text-primary" />
      </div>
      <span className="ml-2 text-lg font-black font-mono text-primary">{cantidad}</span>
    </div>
  );
};

export default MonedaVirtual;
