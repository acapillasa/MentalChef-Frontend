import React from "react";
import { Brain } from "lucide-react";

const MonedaVirtual = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-14 h-14 bg-zinc-800 rounded-full shadow-lg flex items-center justify-center">
        <Brain className="w-8 h-8 text-primary" />
      </div>
    </div>
  );
};

export default MonedaVirtual;
