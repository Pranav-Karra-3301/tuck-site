'use client';

import Terminal from './Terminal';

interface FeatureShowcaseProps {
  title: string;
  description: string;
  command: string;
  reversed?: boolean;
  link?: {
    text: string;
    href: string;
  };
}

export default function FeatureShowcase({
  title,
  description,
  command,
  reversed = false,
  link,
}: FeatureShowcaseProps) {
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
        <div className="feature-showcase-terminal">
          <div className="showcase-container">
            <Terminal command={command} static />
          </div>
        </div>
      </div>
    </section>
  );
}
