"use client";

import createGlobe, { type Arc, type Marker } from "cobe";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface RotatingEarthProps {
  className?: string;
}

type Rgb = [number, number, number];

const ACCENT: Rgb = [1, 0.42, 0.21];
const SOFT_ACCENT: Rgb = [1, 0.58, 0.35];

const COMMUNITY_MARKERS: Marker[] = [
  { location: [37.7749, -122.4194], size: 0.12, color: ACCENT },
  { location: [40.7128, -74.006], size: 0.1, color: SOFT_ACCENT },
  { location: [52.52, 13.405], size: 0.09 },
  { location: [12.9716, 77.5946], size: 0.1, color: SOFT_ACCENT },
  { location: [35.6762, 139.6503], size: 0.1 },
  { location: [-23.5505, -46.6333], size: 0.09 },
  { location: [-1.2921, 36.8219], size: 0.08 },
  { location: [-33.8688, 151.2093], size: 0.08 },
];

const COMMUNITY_ARCS: Arc[] = [
  { from: [37.7749, -122.4194], to: [40.7128, -74.006], color: SOFT_ACCENT },
  { from: [40.7128, -74.006], to: [52.52, 13.405] },
  { from: [52.52, 13.405], to: [12.9716, 77.5946], color: SOFT_ACCENT },
  { from: [12.9716, 77.5946], to: [35.6762, 139.6503] },
  { from: [35.6762, 139.6503], to: [-33.8688, 151.2093], color: SOFT_ACCENT },
  { from: [12.9716, 77.5946], to: [-1.2921, 36.8219] },
  { from: [-1.2921, 36.8219], to: [-23.5505, -46.6333], color: SOFT_ACCENT },
  { from: [-23.5505, -46.6333], to: [37.7749, -122.4194] },
];

function getPalette(theme: "light" | "dark") {
  if (theme === "light") {
    return {
      baseColor: [0.92, 0.91, 0.88] as Rgb,
      glowColor: [1, 1, 1] as Rgb,
      markerColor: [0.95, 0.42, 0.21] as Rgb,
      arcColor: [1, 0.5, 0.3] as Rgb,
      dark: 0.05,
      diffuse: 1.35,
      mapBrightness: 5.3,
      mapBaseBrightness: 0.15,
    };
  }

  return {
    baseColor: [0.12, 0.12, 0.12] as Rgb,
    glowColor: [0.08, 0.08, 0.08] as Rgb,
    markerColor: [1, 0.42, 0.21] as Rgb,
    arcColor: [1, 0.56, 0.36] as Rgb,
    dark: 1,
    diffuse: 1.1,
    mapBrightness: 4.8,
    mapBaseBrightness: 0.05,
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
    const palette = getPalette(resolvedTheme);

    let phi = 0.7;
    let pointerX = 0;
    let pointerY = 0;

    const globe = createGlobe(canvas, {
      width: canvasSize * 2,
      height: canvasSize * 2,
      devicePixelRatio: 1,
      phi,
      theta: 0.28,
      dark: palette.dark,
      diffuse: palette.diffuse,
      scale: 0.92,
      opacity: 1,
      mapSamples: 18000,
      mapBrightness: palette.mapBrightness,
      mapBaseBrightness: palette.mapBaseBrightness,
      baseColor: palette.baseColor,
      markerColor: palette.markerColor,
      glowColor: palette.glowColor,
      arcColor: palette.arcColor,
      offset: [0, 0],
      markers: COMMUNITY_MARKERS,
      arcs: COMMUNITY_ARCS,
      arcWidth: 0.7,
      arcHeight: 0.16,
      markerElevation: 0.12,
    });

    let animationFrame = 0;

    const render = () => {
      if (!reduceMotion) {
        phi += 0.0035;
      }

      globe.update({
        phi: phi + pointerX * 0.18,
        theta: 0.28 + pointerY * 0.14,
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
