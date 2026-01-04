import EnvelopeReveal from "./components/EnvelopeReveal";

export default function Home() {
  return (
    <EnvelopeReveal>
      <div className="website-content">
        {/* Navbar */}
        <nav className="navbar">
          <span className="navbar-brand">Tuck</span>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Welcome to Tuck</h1>
          <p className="hero-subtitle">
            A beautifully crafted experience delivered straight to you.
            Discover what makes us different.
          </p>
          <a href="#features" className="hero-button">
            Get Started
          </a>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">Simple Design</h3>
              <p className="feature-description">
                Clean and minimal interfaces that focus on what matters most.
                No clutter, just clarity.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Fast Performance</h3>
              <p className="feature-description">
                Built with speed in mind. Experience lightning-fast load times
                and smooth interactions.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Modern Stack</h3>
              <p className="feature-description">
                Powered by the latest technologies to ensure reliability,
                security, and scalability.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            &copy; 2025 Tuck. All rights reserved.
          </p>
        </footer>
      </div>
    </EnvelopeReveal>
  );
}
