'use client';

import { useEffect, useRef, useState, useCallback, ReactNode } from 'react';

interface EnvelopeRevealProps {
  children: ReactNode;
}

export default function EnvelopeReveal({ children }: EnvelopeRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeBackRef = useRef<HTMLDivElement>(null);
  const envelopeBodyRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [initialScale, setInitialScale] = useState(0.12);

  // Calculate the initial scale so the letter fits nicely in/above the envelope
  const calculateInitialScale = useCallback(() => {
    const viewportWidth = window.innerWidth;

    // We want the letter (which is viewport-sized) to appear about 380px wide initially
    // This matches the new wider envelope size (480px width, letter slightly smaller)
    const targetWidth = 380;
    const scale = targetWidth / viewportWidth;

    setInitialScale(scale);
  }, []);

  useEffect(() => {
    calculateInitialScale();
    window.addEventListener('resize', calculateInitialScale);
    return () => window.removeEventListener('resize', calculateInitialScale);
  }, [calculateInitialScale]);

  useEffect(() => {
    const envelopeBack = envelopeBackRef.current;
    const envelopeBody = envelopeBodyRef.current;
    const flap = flapRef.current;
    const letter = letterRef.current;

    if (!envelopeBack || !envelopeBody || !flap || !letter) return;

    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate center position for the letter when at initial scale
    const scaledWidth = viewportWidth * initialScale;
    const scaledHeight = viewportHeight * initialScale;

    // Initial position: centered in viewport (same as envelope)
    // Z-index layering ensures body (z:25) covers letter (z:15) where they overlap
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

      // ===== PHASE 2: Letter rises out of envelope (20% - 50%) =====
      const riseStart = 0.2;
      const riseEnd = 0.5;
      const riseProgress = Math.min(Math.max((progress - riseStart) / (riseEnd - riseStart), 0), 1);
      const letterRiseAmount = easeOutCubic(riseProgress) * 220;

      // ===== PHASE 3: Envelope drops and fades (30% - 65%) =====
      const dropStart = 0.3;
      const dropEnd = 0.65;
      const dropProgress = Math.min(Math.max((progress - dropStart) / (dropEnd - dropStart), 0), 1);
      const envelopeDrop = easeInOutQuart(dropProgress) * viewportHeight;
      const envelopeOpacity = 1 - easeOutCubic(dropProgress);

      // Apply transforms to each envelope part (all siblings, z-index handles layering)
      envelopeBack.style.transform = `translateY(${envelopeDrop}px)`;
      envelopeBack.style.opacity = String(envelopeOpacity);

      envelopeBody.style.transform = `translateY(${envelopeDrop}px)`;
      envelopeBody.style.opacity = String(envelopeOpacity);

      // Flap gets drop + rotation
      flap.style.transform = `translateY(${envelopeDrop}px) rotateX(${flapRotation}deg)`;
      flap.style.opacity = String(envelopeOpacity);

      // ===== PHASE 4: Letter scales up and moves to fill screen (40% - 100%) =====
      const scaleStart = 0.4;
      const scaleEnd = 1;
      const scaleProgress = Math.min(Math.max((progress - scaleStart) / (scaleEnd - scaleStart), 0), 1);
      const easedScaleProgress = easeInOutQuart(scaleProgress);

      // Lower flap z-index to ensure it's behind the letter/website content
      // Add class to lower z-index to 5 (below envelope-back at 10, letter at 15->35)
      // Apply as soon as letter starts rising or scaling begins
      if (riseProgress > 0 || scaleProgress > 0) {
        flap.classList.add('behind-content');
      } else {
        flap.classList.remove('behind-content');
      }

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
      const borderRadius = Math.max(0, 6 * (1 - easedScaleProgress));
      letter.style.borderRadius = `${borderRadius}px`;

      // Reduce shadow as it expands
      const shadowOpacity = 0.5 * (1 - easedScaleProgress * 0.8);
      const shadowBlur = 40 * (1 - easedScaleProgress * 0.7);
      letter.style.boxShadow = `0 8px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}), 0 2px 12px rgba(0, 0, 0, ${shadowOpacity * 0.6}), 0 0 0 1px rgba(0, 0, 0, ${0.08 * (1 - easedScaleProgress * 0.5)})`;

      // Update z-index: starts at 15 (between back=10 and body=25), rises to 35 (above flap=30)
      letter.style.zIndex = riseProgress > 0.3 ? '35' : '15';
      
      // Gradually reveal the letter by adjusting clip-path as it rises and scales
      // Initially completely hidden, then reveal as animation progresses
      if (progress < riseStart) {
        // Before letter starts rising, keep it completely hidden
        letter.style.clipPath = 'inset(50% 50% 50% 50%)';
        letter.style.opacity = '0';
      } else if (progress < scaleStart) {
        // As letter rises, start revealing it
        const revealProgress = (progress - riseStart) / (scaleStart - riseStart);
        const clipAmount = 40 * (1 - revealProgress);
        letter.style.clipPath = `inset(${clipAmount}% ${clipAmount}% ${clipAmount}% ${clipAmount}%)`;
        letter.style.opacity = String(Math.min(revealProgress * 2, 1));
      } else {
        // Once scaling starts, fully reveal
        letter.style.clipPath = 'inset(0)';
        letter.style.opacity = '1';
      }

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
        {/*
          All elements are siblings for proper z-index layering:
          - envelope-back: z-index 10 (furthest back)
          - letter: z-index 15 -> 35 (middle, rises above)
          - envelope-body: z-index 25 (covers letter)
          - envelope-flap: z-index 30 (top)
        */}

        {/* Back of envelope - lowest layer */}
        <div ref={envelopeBackRef} className="envelope-back"></div>

        {/* Letter - starts between back and body */}
        <div ref={letterRef} className="letter">
          {children}
        </div>

        {/* Front body of envelope - covers letter initially */}
        <div ref={envelopeBodyRef} className="envelope-body"></div>

        {/* Flap - highest layer */}
        <div ref={flapRef} className="envelope-flap">
          <div className="envelope-flap-front"></div>
          <div className="envelope-flap-back"></div>
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
