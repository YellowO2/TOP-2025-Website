'use client'
import { useState } from "react";

const GRID_SIZE = 100; // Adjust grid density
const PIXEL_SIZE = 24; // Adjust pixel size

const PixelGrid = () => {
  const [hoveredPixels, setHoveredPixels] = useState(new Set());

  const handleMouseEnter = (row, col) => {
    const pixelKey = `${row}-${col}`;
    setHoveredPixels((prev) => new Set(prev).add(pixelKey));

    // Remove pixel after a delay for fading effect
    setTimeout(() => {
      setHoveredPixels((prev) => {
        const newSet = new Set(prev);
        newSet.delete(pixelKey);
        return newSet;
      });
    }, 300); // Adjust fade-out delay
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen grid z-20"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${PIXEL_SIZE}px)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, ${PIXEL_SIZE}px)`,
      }}
    >
      {[...Array(GRID_SIZE)].map((_, row) =>
        [...Array(GRID_SIZE)].map((_, col) => {
          const isHovered = hoveredPixels.has(`${row}-${col}`);
          return (
            <div
              key={`${row}-${col}`}
              className={`transition-opacity duration-500 ${
                isHovered ? "opacity-100 bg-[#951010]" : "opacity-0"
              }`}
              style={{
                width: PIXEL_SIZE,
                height: PIXEL_SIZE,
              }}
              onMouseEnter={() => handleMouseEnter(row, col)}
            />
          );
        })
      )}
    </div>
  );
};

export default PixelGrid;
