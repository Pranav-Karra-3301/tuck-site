'use client';

import ThemeToggle from "./ThemeToggle";

interface FooterProps {
  /** When true, uses absolute paths (e.g., /#features) for cross-page navigation */
  isSubPage?: boolean;
}

export default function Footer({ isSubPage = false }: FooterProps) {
  const prefix = isSubPage ? "/" : "";

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">tuck</span>
          <p className="footer-tagline">The modern dotfiles manager</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <a href={`${prefix}#features`}>Features</a>
            <a href={`${prefix}#install`}>Install</a>
            <a href={`${prefix}#commands`}>Commands</a>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="https://github.com/Pranav-Karra-3301/tuck">GitHub</a>
            <a href="https://github.com/Pranav-Karra-3301/tuck/issues">Issues</a>
            <a href="https://github.com/Pranav-Karra-3301/tuck#readme">Docs</a>
            <a href="/llm.txt">llm.txt</a>
          </div>
          <div className="footer-column">
            <h4>Connect</h4>
            <a href="https://twitter.com/pranavkarra">Twitter</a>
            <a href="https://github.com/Pranav-Karra-3301">GitHub</a>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-locations">
          <p className="locations-text">
            Made with love in{" "}
            <span className="location-name">San Francisco</span>
            <span className="location-map-container">
              <img src="/sf.png" alt="San Francisco" className="location-map" />
              <span className="location-pin"></span>
            </span>
            {" "}and{" "}
            <span className="location-name">State College</span>
            <span className="location-map-container">
              <img src="/sc.png" alt="State College" className="location-map" />
              <span className="location-pin"></span>
            </span>
          </p>
        </div>
        <ThemeToggle />
        <p className="footer-copyright">&copy; {new Date().getFullYear()} tuck. MIT License.</p>
      </div>
    </footer>
  );
}
