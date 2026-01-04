'use client';

import { useEffect, useRef, useState, useCallback, ReactNode } from 'react';

interface EnvelopeRevealProps {
  children: ReactNode;
}

export default function EnvelopeReveal({ children }: EnvelopeRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [initialScale, setInitialScale] = useState(0.12);

  // Calculate the initial scale so the letter fits nicely in/above the envelope
  const calculateInitialScale = useCallback(() => {
    const viewportWidth = window.innerWidth;

    // We want the letter (which is viewport-sized) to appear about 220px wide initially
    const targetWidth = 220;
    const scale = targetWidth / viewportWidth;

    setInitialScale(scale);
  }, []);

  useEffect(() => {
    calculateInitialScale();
    window.addEventListener('resize', calculateInitialScale);
    return () => window.removeEventListener('resize', calculateInitialScale);
  }, [calculateInitialScale]);

  useEffect(() => {
    const envelope = envelopeRef.current;
    const flap = flapRef.current;
    const letter = letterRef.current;

    if (!envelope || !flap || !letter) return;

    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate center position for the letter when at initial scale
    const scaledWidth = viewportWidth * initialScale;
    const scaledHeight = viewportHeight * initialScale;

    // Initial position: centered in viewport
    const initialX = (viewportWidth - scaledWidth) / 2;
    const initialY = (viewportHeight - scaledHeight) / 2;

    // Easing functions
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
    const easeInOutQuart = (t: number): number =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / scrollHeight, 0), 1);

      // ===== PHASE 1: Flap opens (0% - 30%) =====
      const flapProgress = Math.min(progress / 0.3, 1);
      const flapRotation = easeOutCubic(flapProgress) * -110;
      flap.style.transform = `rotateX(${flapRotation}deg)`;

      // ===== PHASE 2: Letter rises out of envelope (20% - 50%) =====
      const riseStart = 0.2;
      const riseEnd = 0.5;
      const riseProgress = Math.min(Math.max((progress - riseStart) / (riseEnd - riseStart), 0), 1);
      const letterRiseAmount = easeOutCubic(riseProgress) * 180;

      // ===== PHASE 3: Envelope drops and fades (30% - 65%) =====
      const dropStart = 0.3;
      const dropEnd = 0.65;
      const dropProgress = Math.min(Math.max((progress - dropStart) / (dropEnd - dropStart), 0), 1);
      const envelopeDrop = easeInOutQuart(dropProgress) * viewportHeight;
      const envelopeOpacity = 1 - easeOutCubic(dropProgress);
      envelope.style.transform = `translateY(${envelopeDrop}px)`;
      envelope.style.opacity = String(envelopeOpacity);

      // ===== PHASE 4: Letter scales up and moves to fill screen (40% - 100%) =====
      const scaleStart = 0.4;
      const scaleEnd = 1;
      const scaleProgress = Math.min(Math.max((progress - scaleStart) / (scaleEnd - scaleStart), 0), 1);
      const easedScaleProgress = easeInOutQuart(scaleProgress);

      // Scale from initialScale to 1
      const currentScale = initialScale + (1 - initialScale) * easedScaleProgress;

      // Position: start at center (adjusted for rise), end at 0,0
      // Initial center position minus rise amount
      const startX = initialX;
      const startY = initialY - letterRiseAmount;

      // End position: 0,0 (top-left corner)
      const endX = 0;
      const endY = 0;

      // Interpolate position
      const currentX = startX + (endX - startX) * easedScaleProgress;
      const currentY = startY + (endY - startY) * easedScaleProgress;

      letter.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
      letter.style.transformOrigin = 'top left';

      // Smoothly reduce border-radius as letter expands
      const borderRadius = Math.max(0, 4 * (1 - easedScaleProgress));
      letter.style.borderRadius = `${borderRadius}px`;

      // Reduce shadow as it expands
      const shadowOpacity = 0.4 * (1 - easedScaleProgress * 0.8);
      const shadowBlur = 30 * (1 - easedScaleProgress * 0.7);
      letter.style.boxShadow = `0 4px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`;

      // Update z-index as letter rises above envelope
      letter.style.zIndex = riseProgress > 0.3 ? '35' : '15';

      // Track completion
      const complete = progress >= 0.98;
      setIsComplete(complete);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialScale]);

  return (
    <div ref={containerRef} className="envelope-container">
      {/* Fixed viewport for animation */}
      <div className={`envelope-viewport ${isComplete ? 'complete' : ''}`}>
        {/* Envelope */}
        <div ref={envelopeRef} className="envelope">
          <div className="envelope-back"></div>
          <div ref={flapRef} className="envelope-flap">
            <div className="envelope-flap-front"></div>
            <div className="envelope-flap-back"></div>
          </div>
          <div className="envelope-body"></div>
        </div>

        {/* Letter - full viewport size, scaled down initially */}
        <div ref={letterRef} className="letter">
          {children}
        </div>

        {/* Scroll indicator */}
        {!isComplete && (
          <div className="scroll-indicator">
            <div className="scroll-indicator-mouse">
              <div className="scroll-indicator-wheel"></div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll spacer */}
      <div className="scroll-spacer"></div>
    </div>
  );
}
