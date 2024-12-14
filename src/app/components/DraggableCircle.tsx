"use client";
import { useState, useCallback, useEffect } from "react";

const DraggableCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [initialPosition] = useState({ x: 0, y: 0 }); // Initial position

  // Define container dimensions without padding
  const containerBounds = { width: 300, height: 300 };

  const handleMouseDown = (e) => {
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;

        setPosition({
          x: newX,
          y: newY,
        });
      }
    },
    [isDragging, offset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    // Adjust boundary check to snap back if out of bounds
    if (
      position.x < 0 ||
      position.y < 0 ||
      position.x > containerBounds.width - 100 || // Adjust for circle width
      position.y > containerBounds.height - 100 // Adjust for circle height
    ) {
      // Snap back to initial position if out of bounds
      setPosition(initialPosition);
    }
  }, [position, initialPosition, containerBounds]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className="relative h-screen flex justify-center items-center"
      style={{ background: "#f0f0f0" }}
    >
      {/* Container with allowed region border */}
      <div
        style={{
          width: containerBounds.width,
          height: containerBounds.height,
          border: "3px dashed gray", // Visible border for allowed area
          position: "relative",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Draggable Circle */}
        <div
          className="w-24 h-24 rounded-full bg-blue-500 cursor-pointer"
          style={{ position: "absolute", left: position.x, top: position.y }}
          onMouseDown={handleMouseDown}
        />
      </div>
      <div className="absolute top-4 right-4">
        Current Position: x: {position.x}, y: {position.y}
      </div>
    </div>
  );
};

export default DraggableCircle;
