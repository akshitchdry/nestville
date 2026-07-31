"use client";

import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export default function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const normalizedX =
        event.clientX / window.innerWidth - 0.5;

      const normalizedY =
        event.clientY / window.innerHeight - 0.5;

      setPosition({
        x: event.clientX,
        y: event.clientY,
        normalizedX,
        normalizedY,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );
    };
  }, []);

  return position;
}