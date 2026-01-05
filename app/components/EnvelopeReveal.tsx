'use client';

import { useEffect, useRef, useState, useCallback, ReactNode } from 'react';

interface EnvelopeRevealProps {
  children: ReactNode;
}

export default function EnvelopeReveal({ children }: EnvelopeRevealProps) {
  const envelopeBackRef = useRef<HTMLDivElement>(null);
  const envelopeBodyRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const flapTextRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const animationDistanceRef = useRef(1400);

  const [initialScale, setInitialScale] = useState(0.12);
  const [animationDistance, setAnimationDistance] = useState(1400);
  const [animationProgress, setAnimationProgress] = useState(0);
  const releaseThreshold = 0.98;

  // Calculate the initial scale so the letter fits the envelope on both axes
  const recalcDimensions = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Keep the letter ~380px wide and under ~240px tall while in the envelope
    const targetWidth = 380;
    const targetHeight = 240;
    const scale = Math.min(targetWidth / viewportWidth, targetHeight / viewportHeight, 1);

    setInitialScale(scale);

    // Drive the animation over ~1.6 view-heights, with a sensible floor
    const distance = Math.max(viewportHeight * 1.6, 900);
    animationDistanceRef.current = distance;
    setAnimationDistance(distance);
  }, []);

  useEffect(() => {
    recalcDimensions();
    window.addEventListener('resize', recalcDimensions);
    return () => window.removeEventListener('resize', recalcDimensions);
  }, [recalcDimensions]);

  useEffect(() => {
    const envelopeBack = envelopeBackRef.current;
    const envelopeBody = envelopeBodyRef.current;
    const flap = flapRef.current;
    const flapText = flapTextRef.current;
    const glow = glowRef.current;
    const letter = letterRef.current;
    const content = contentRef.current;

    if (!envelopeBack || !envelopeBody || !flap || !letter || !content || !glow) return;

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
    const easeInOutQuart = (t: number): number =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const applyAnimationFrame = () => {
      rafRef.current = null;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const scaledWidth = viewportWidth * initialScale;
      const scaledHeight = viewportHeight * initialScale;

      const initialX = (viewportWidth - scaledWidth) / 2;
      const initialY = (viewportHeight - scaledHeight) / 2;

      const distance = animationDistanceRef.current || animationDistance;
      // Don't cap progress at 1 - we need values > 1 for content scrolling
      const rawProgress = scrollYRef.current / distance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      
      // Update progress state for React re-renders
      setAnimationProgress(progress);

      // ===== PHASE 1: Flap opens (0% - 30%) =====
      const flapProgress = Math.min(progress / 0.3, 1);
      const flapRotation = easeOutCubic(flapProgress) * -110;

      // ===== PHASE 2: Letter rises out of envelope (20% - 50%) =====
      const riseStart = 0.2;
      const riseEnd = 0.5;
      const riseProgress = Math.min(
        Math.max((progress - riseStart) / (riseEnd - riseStart), 0),
        1
      );
      const letterRiseAmount = easeOutCubic(riseProgress) * 220;

      // ===== PHASE 3: Envelope drops and fades (30% - 65%) =====
      const dropStart = 0.3;
      const dropEnd = 0.65;
      const dropProgress = Math.min(
        Math.max((progress - dropStart) / (dropEnd - dropStart), 0),
        1
      );
      const envelopeDrop = easeInOutQuart(dropProgress) * viewportHeight;
      const envelopeOpacity = 1 - easeOutCubic(dropProgress);

      // Apply envelope transforms
      envelopeBack.style.transform = `translateY(${envelopeDrop}px)`;
      envelopeBack.style.opacity = String(envelopeOpacity);

      envelopeBody.style.transform = `translateY(${envelopeDrop}px)`;
      envelopeBody.style.opacity = String(envelopeOpacity);

      flap.style.transform = `translateY(${envelopeDrop}px) rotateX(${flapRotation}deg)`;
      flap.style.opacity = String(envelopeOpacity);

      // Animate glow - fades with envelope
      glow.style.opacity = String(envelopeOpacity);

      // Animate flap text with the flap
      if (flapText) {
        // Fade out as flap opens (0% - 30%)
        const textOpacity = 1 - flapProgress;
        flapText.style.opacity = String(Math.max(0, textOpacity));
        // Rotate with the flap (combine with translate for centering)
        flapText.style.transform = `translate(-50%, -50%) rotateX(${flapRotation}deg)`;
      }

      // ===== PHASE 4: Letter scales up and moves to fill screen (40% - 100%) =====
      const scaleStart = 0.4;
      const scaleEnd = 1;
      const scaleProgress = Math.min(
        Math.max((progress - scaleStart) / (scaleEnd - scaleStart), 0),
        1
      );
      const easedScaleProgress = easeInOutQuart(scaleProgress);

      if (riseProgress > 0 || scaleProgress > 0) {
        flap.classList.add('behind-content');
      } else {
        flap.classList.remove('behind-content');
      }

      const currentScale = initialScale + (1 - initialScale) * easedScaleProgress;
      const startX = initialX;
      const startY = initialY - letterRiseAmount;
      const currentX = startX + (0 - startX) * easedScaleProgress;
      const currentY = startY + (0 - startY) * easedScaleProgress;

      // Apply letter transforms
      letter.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
      letter.style.transformOrigin = 'top left';
      letter.style.borderRadius = `${Math.max(0, 6 * (1 - easedScaleProgress))}px`;
      letter.style.opacity = progress < riseStart ? '0' : '1';
      letter.style.zIndex = riseProgress > 0.3 ? '35' : '15';

      // Shadow during expansion - peaks in middle, fades at start and end
      const shadowIntensity = Math.sin(scaleProgress * Math.PI) * (1 - easedScaleProgress * 0.7);
      letter.style.boxShadow = shadowIntensity > 0.01
        ? `0 ${20 * shadowIntensity}px ${60 * shadowIntensity}px rgba(0, 0, 0, ${0.25 * shadowIntensity}),
           0 ${8 * shadowIntensity}px ${24 * shadowIntensity}px rgba(0, 0, 0, ${0.15 * shadowIntensity})`
        : 'none';
      
      // ===== PHASE 5: Content scrolling (100%+) =====
      // When animation is complete (progress >= 1), additional scroll drives content scrolling
      if (rawProgress >= 1) {
        // Calculate how much extra scroll beyond the animation distance
        const contentScrollAmount = scrollYRef.current - distance;
        // Scroll the content container
        content.scrollTop = Math.max(0, contentScrollAmount);
        // Enable scrolling on content
        letter.style.overflow = 'hidden';
        content.style.overflow = 'hidden';
        content.style.height = '100vh';
      } else {
        // Reset content scroll when animating
        content.scrollTop = 0;
        letter.style.overflow = 'hidden';
        content.style.overflow = 'hidden';
        content.style.height = 'auto';
      }
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(applyAnimationFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Kick off the first frame
    scrollYRef.current = window.scrollY;
    applyAnimationFrame();

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialScale, animationDistance]);

  // Determine if we're in "complete" state (animation finished)
  const isComplete = animationProgress >= releaseThreshold;

  return (
    <div
      className="envelope-container"
      style={{
        // Provide scrollable distance for animation + content
        ['--animation-distance' as string]: `${animationDistance}px`,
      }}
    >
      <div className="envelope-viewport">
        {/* Warm glow behind envelope */}
        <div ref={glowRef} className="envelope-glow"></div>

        {/* Back of envelope - lowest layer */}
        <div ref={envelopeBackRef} className="envelope-back"></div>

        {/* Letter - starts between back and body */}
        <div ref={letterRef} className="letter">
          <div ref={contentRef} className="letter-content-wrapper">
            {children}
          </div>
        </div>

        {/* Front body of envelope - covers letter initially */}
        <div ref={envelopeBodyRef} className="envelope-body">
          <img 
            src="/tuck.png" 
            alt="Tuck stamp" 
            className="envelope-stamp"
          />
        </div>

        {/* Flap - highest layer */}
        <div ref={flapRef} className="envelope-flap">
          <div className="envelope-flap-front">
            <div ref={flapTextRef} className="envelope-flap-text">
              ready for easy dotfiles?
            </div>
          </div>
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
      {/* Scroll track - provides scrollable distance for animation + content */}
      <div className="scroll-track" aria-hidden="true"></div>
    </div>
  );
}
