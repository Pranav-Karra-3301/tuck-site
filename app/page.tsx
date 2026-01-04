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

        {/* About Section */}
        <section className="about-section">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <p className="about-text">
              We're a team of passionate creators dedicated to building exceptional
              digital experiences. Our mission is to combine beautiful design with
              cutting-edge technology to deliver products that users love.
            </p>
            <p className="about-text">
              With years of experience in the industry, we understand what it takes
              to create solutions that are both functional and delightful. Every
              project is an opportunity to push boundaries and set new standards.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3 className="service-title">Web Development</h3>
              <p className="service-description">
                Custom web applications built with modern frameworks and best practices.
                Responsive, fast, and user-friendly.
              </p>
            </div>
            <div className="service-card">
              <h3 className="service-title">UI/UX Design</h3>
              <p className="service-description">
                Thoughtful design that puts users first. We create interfaces that
                are intuitive, accessible, and beautiful.
              </p>
            </div>
            <div className="service-card">
              <h3 className="service-title">Consulting</h3>
              <p className="service-description">
                Expert guidance to help you make the right technology decisions
                for your business needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <h2 className="section-title">Get in Touch</h2>
          <p className="contact-text">
            Have a project in mind? We'd love to hear from you.
          </p>
          <a href="mailto:hello@tuck.com" className="hero-button">
            Contact Us
          </a>
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
