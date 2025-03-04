'use client'
import { useState } from "react";

const GRID_SIZE = 100;
const PIXEL_SIZE = 10;

const PixelGrid = () => {
  const [hoveredPixels, setHoveredPixels] = useState(new Set());

  const handleMouseEnter = (row, col) => {
    const pixelKey = `${row}-${col}`;
    setHoveredPixels((prev) => new Set(prev).add(pixelKey));

    setTimeout(() => {
      setHoveredPixels((prev) => {
        const newSet = new Set(prev);
        newSet.delete(pixelKey);
        return newSet;
      });
    }, 300);
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
                isHovered ? "opacity-100 bg-white" : "opacity-0"
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
