import React from "react";
import FloatingSky from "./components/FloatingSky";
import InteractableStars from "./components/InteractableStars";
import "./components/FloatingSky.css";
import "./index.css";

function App() {
  return (
    <div className="relative min-h-screen bg-[#010118] overflow-hidden">
      {/* Background stars canvas */}
      <FloatingSky numBackgroundStars={450} />

      {/* Interactable stars and moons */}
      <InteractableStars numStars={20} numMoons={1} />

      {/* Optional central content */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-40 pointer-events-none">
        {/* Add content here if needed */}
      </div>
    </div>
  );
}

export default App;
