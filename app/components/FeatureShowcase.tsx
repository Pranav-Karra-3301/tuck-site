'use client';

import Terminal from './Terminal';

interface PaintingInfo {
  src: string;
  title: string;
  artist: string;
  year: string;
  metUrl: string;
}

interface FeatureShowcaseProps {
  title: string;
  description: string;
  command: string;
  reversed?: boolean;
  link?: {
    text: string;
    href: string;
  };
  painting?: PaintingInfo;
}

export default function FeatureShowcase({
  title,
  description,
  command,
  reversed = false,
  link,
  painting,
}: FeatureShowcaseProps) {
  const terminalStyle = painting
    ? { backgroundImage: `url(${painting.src})` }
    : undefined;

  return (
    <section className={`feature-showcase ${reversed ? 'reversed' : ''}`}>
      <div className="feature-showcase-content">
        <div className="feature-text">
          <h2 className="feature-title">{title}</h2>
          <p className="feature-description">{description}</p>
          {link && (
            <a href={link.href} className="feature-link">
              {link.text} <span className="arrow">→</span>
            </a>
          )}
        </div>
        <div
          className={`feature-showcase-terminal ${painting ? 'has-painting' : ''}`}
          style={terminalStyle}
        >
          <div className="showcase-container">
            <Terminal command={command} static />
          </div>
          {painting && (
            <a
              href={painting.metUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="painting-attribution"
            >
              {painting.title}, {painting.artist}, {painting.year}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
