"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface RotatingEarthProps {
  className?: string;
}

type Rgb = [number, number, number];

function getPalette(theme: "light" | "dark") {
  if (theme === "light") {
    return {
      baseColor: [0.9, 0.88, 0.84] as Rgb,
      glowColor: [1, 1, 1] as Rgb,
      markerColor: [1, 0.42, 0.21] as Rgb,
      dark: 0.05,
      diffuse: 1.35,
      mapBrightness: 5,
      mapBaseBrightness: 0.12,
    };
  }

  return {
    baseColor: [0.16, 0.16, 0.16] as Rgb,
    glowColor: [0.07, 0.07, 0.07] as Rgb,
    markerColor: [1, 0.42, 0.21] as Rgb,
    dark: 1,
    diffuse: 1.1,
    mapBrightness: 4.3,
    mapBaseBrightness: 0.04,
  };
}

export default function RotatingEarth({ className = "" }: RotatingEarthProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState(520);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const syncSize = (width: number) => {
      if (!width) return;

      const nextSize = Math.round(Math.min(Math.max(width, 260), 560));
      setCanvasSize((current) => (Math.abs(current - nextSize) < 4 ? current : nextSize));
    };

    syncSize(container.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        syncSize(entry.contentRect.width);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const palette = getPalette(resolvedTheme);

    let phi = 0.65;
    let pointerX = 0;
    let pointerY = 0;

    const globe = createGlobe(canvas, {
      width: canvasSize,
      height: canvasSize,
      devicePixelRatio,
      phi,
      theta: 0.22,
      dark: palette.dark,
      diffuse: palette.diffuse,
      scale: 0.98,
      opacity: 1,
      mapSamples: 18000,
      mapBrightness: palette.mapBrightness,
      mapBaseBrightness: palette.mapBaseBrightness,
      baseColor: palette.baseColor,
      markerColor: palette.markerColor,
      glowColor: palette.glowColor,
      offset: [0, 0],
    });

    let animationFrame = 0;

    const render = () => {
      if (!reduceMotion) {
        phi += 0.0024;
      }

      globe.update({
        phi: phi + pointerX * 0.12,
        theta: 0.22 + pointerY * 0.08,
      });

      animationFrame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
    };

    const handlePointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      globe.destroy();
    };
  }, [canvasSize, resolvedTheme]);

  return (
    <div ref={containerRef} className={`rotating-earth ${className}`.trim()}>
      <canvas ref={canvasRef} className="rotating-earth-canvas" />
    </div>
  );
}
