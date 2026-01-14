import ThemeToggle from "../components/ThemeToggle";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - tuck",
  description: "Privacy Policy for tuck, the modern dotfiles manager.",
};

export default function PrivacyPage() {
  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <a
            href="https://github.com/Pranav-Karra-3301/tuck"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            aria-label="View on GitHub"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </header>

      <div className="website-content">
        <section className="legal-section">
          <div className="legal-content">
            <Link href="/" className="legal-back">&larr; Back to home</Link>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-updated">Last updated: January 14, 2025</p>

            <div className="legal-text">
              <h2>Overview</h2>
              <p>
                tuck is an open-source dotfiles manager. We are committed to protecting your privacy.
                This Privacy Policy explains how we handle information when you use our software and website.
              </p>

              <h2>Information We Collect</h2>
              <p>
                <strong>tuck CLI:</strong> The tuck command-line tool runs entirely on your local machine.
                We do not collect, transmit, or store any of your personal data, configuration files, or usage information.
                Your dotfiles remain on your machine and any Git repositories you configure.
              </p>
              <p>
                <strong>Website:</strong> Our website does not use cookies or tracking technologies.
                We do not collect personal information through the website.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                tuck integrates with Git for version control. When you use tuck with GitHub, GitLab, or other
                Git hosting providers, your interactions with those services are governed by their respective privacy policies.
              </p>

              <h2>Data Storage</h2>
              <p>
                All your configuration data is stored locally on your machine in the <code>~/.tuck</code> directory
                and any Git repositories you configure. We have no access to this data.
              </p>

              <h2>Open Source</h2>
              <p>
                tuck is open source software. You can review our source code at any time on{" "}
                <a href="https://github.com/Pranav-Karra-3301/tuck" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>{" "}
                to verify our privacy practices.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify users of any material changes
                by updating the &quot;Last updated&quot; date at the top of this page.
              </p>

              <h2>Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please open an issue on our{" "}
                <a href="https://github.com/Pranav-Karra-3301/tuck/issues" target="_blank" rel="noopener noreferrer">
                  GitHub repository
                </a>.
              </p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">tuck</span>
              <p className="footer-tagline">The modern dotfiles manager</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="/#features">Features</a>
                <a href="/#install">Install</a>
                <a href="/#commands">Commands</a>
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
            <p className="footer-copyright">&copy; 2025 tuck. MIT License.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
