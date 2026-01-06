import Terminal from "./components/Terminal";
import FeatureShowcase from "./components/FeatureShowcase";
import HeroInstall from "./components/HeroInstall";
import ThemeToggle from "./components/ThemeToggle";
import RotatingEarth from "./components/RotatingEarth";

export default function Home() {
  return (
    <>
      {/* Header */}
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
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </header>

      <div className="website-content">
        {/* Hero Section */}
        <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">tuck</h1>
            <p className="hero-subtitle">The modern dotfiles manager</p>
            <p className="hero-description">
              Simple, fast, and built in TypeScript. Manage your dotfiles
              with Git, sync across machines, and never lose your configs again.
            </p>
            <HeroInstall />
          </div>
        </div>
        <div className="hero-showcase">
          <div className="showcase-container">
            <Terminal autoPlay />
          </div>
        </div>
      </section>

      {/* Feature Showcases */}
      <FeatureShowcase
        title="Track any dotfile instantly"
        description="Smart category detection organizes your configs automatically. Add multiple files at once with intelligent symlink management that keeps everything in sync."
        command="tuck add ~/.zshrc ~/.gitconfig"
        link={{ text: "Learn about tracking", href: "#commands" }}
      />

      <FeatureShowcase
        title="Know your dotfiles status"
        description="See your entire configuration state at a glance. Branch info, sync status, and all tracked files organized by category - everything you need to stay in control."
        command="tuck status"
        reversed
        link={{ text: "View all commands", href: "#commands" }}
      />

      <FeatureShowcase
        title="Sync with a single command"
        description="Detect changes, commit, and push to your remote - all in one command. No more manual git workflows, just run sync and you're done."
        command="tuck sync"
        link={{ text: "See how sync works", href: "#commands" }}
      />

      <FeatureShowcase
        title="Apply dotfiles from anywhere"
        description="Bootstrap a new machine in seconds. Just provide a GitHub username and tuck will clone, backup existing configs with Time Machine snapshots, and apply everything automatically."
        command="tuck apply username"
        reversed
        link={{ text: "Learn about apply", href: "#commands" }}
      />

      <FeatureShowcase
        title="Restore when you need it"
        description="Symlink or copy, your choice. Automatic backups before every operation mean you can always restore. SSH and GPG permissions are handled correctly."
        command="tuck restore --all"
        link={{ text: "Explore restore options", href: "#commands" }}
      />

      {/* Install Section */}
      <section id="install" className="install-section">
        <div className="section-header">
          <h2 className="section-title">Quick Start</h2>
          <p className="section-subtitle">Up and running in under a minute</p>
        </div>
        <div className="install-steps">
          <div className="install-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Install tuck</h3>
              <div className="code-block">
                <code>npm install -g @prnv/tuck</code>
                <button className="copy-btn" title="Copy">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
              <p className="step-note">or use yarn, pnpm, or bun</p>
            </div>
          </div>
          <div className="install-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Initialize</h3>
              <div className="code-block">
                <code>tuck init</code>
              </div>
              <p className="step-note">Creates ~/.dotfiles with Git tracking</p>
            </div>
          </div>
          <div className="install-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Add your dotfiles</h3>
              <div className="code-block">
                <code>tuck add ~/.zshrc ~/.gitconfig ~/.vimrc</code>
              </div>
              <p className="step-note">Files are moved and symlinked automatically</p>
            </div>
          </div>
          <div className="install-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Sync everywhere</h3>
              <div className="code-block">
                <code>tuck push</code>
              </div>
              <p className="step-note">Commit and push to your remote</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Section */}
      <section id="commands" className="commands-section">
        <div className="section-header">
          <h2 className="section-title">Commands</h2>
          <p className="section-subtitle">Everything you need, nothing you don't</p>
        </div>
        <div className="commands-grid">
          <div className="command-card">
            <div className="command-header">
              <code className="command-name">tuck init</code>
            </div>
            <p className="command-description">
              Initialize tuck in the current directory or ~/.dotfiles.
              Sets up Git tracking and creates config file.
            </p>
            <div className="command-flags">
              <span className="flag">--path &lt;dir&gt;</span>
              <span className="flag">--bare</span>
            </div>
          </div>
          <div className="command-card">
            <div className="command-header">
              <code className="command-name">tuck add &lt;files&gt;</code>
            </div>
            <p className="command-description">
              Add files to be tracked. Moves files to dotfiles directory
              and creates symlinks in original location.
            </p>
            <div className="command-flags">
              <span className="flag">--copy</span>
              <span className="flag">--no-link</span>
            </div>
          </div>
          <div className="command-card">
            <div className="command-header">
              <code className="command-name">tuck status</code>
            </div>
            <p className="command-description">
              Show the status of all tracked files. Displays link status,
              modifications, and sync state.
            </p>
            <div className="command-flags">
              <span className="flag">--verbose</span>
              <span className="flag">--json</span>
            </div>
          </div>
          <div className="command-card">
            <div className="command-header">
              <code className="command-name">tuck link</code>
            </div>
            <p className="command-description">
              Create symlinks for all tracked files. Useful when setting
              up on a new machine.
            </p>
            <div className="command-flags">
              <span className="flag">--force</span>
              <span className="flag">--dry-run</span>
            </div>
          </div>
          <div className="command-card">
            <div className="command-header">
              <code className="command-name">tuck push</code>
            </div>
            <p className="command-description">
              Stage all changes, commit with a message, and push to remote.
              One command to sync everything.
            </p>
            <div className="command-flags">
              <span className="flag">-m &lt;message&gt;</span>
              <span className="flag">--no-push</span>
            </div>
          </div>
          <div className="command-card">
            <div className="command-header">
              <code className="command-name">tuck pull</code>
            </div>
            <p className="command-description">
              Pull latest changes from remote and re-link any new or
              updated dotfiles automatically.
            </p>
            <div className="command-flags">
              <span className="flag">--rebase</span>
              <span className="flag">--no-link</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <div className="how-content">
          <div className="how-text">
            <h2 className="section-title">How it works</h2>
            <p className="how-description">
              tuck uses a simple approach: your dotfiles live in a central
              directory (usually ~/.dotfiles), tracked by Git. Symlinks
              connect them to their expected locations.
            </p>
            <div className="how-diagram">
              <div className="diagram-item">
                <span className="diagram-file">~/.zshrc</span>
                <span className="diagram-arrow">→</span>
                <span className="diagram-link">~/.dotfiles/zshrc</span>
              </div>
              <div className="diagram-item">
                <span className="diagram-file">~/.gitconfig</span>
                <span className="diagram-arrow">→</span>
                <span className="diagram-link">~/.dotfiles/gitconfig</span>
              </div>
              <div className="diagram-item">
                <span className="diagram-file">~/.config/nvim</span>
                <span className="diagram-arrow">→</span>
                <span className="diagram-link">~/.dotfiles/nvim</span>
              </div>
            </div>
            <p className="how-note">
              When you run <code>tuck push</code>, changes are committed
              and pushed to your Git remote. On a new machine, just clone
              and run <code>tuck link</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Open Source Community Section */}
      <section className="community-section">
        <div className="community-content">
          <div className="community-text">
            <h2 className="section-title">Built with the open source community</h2>
          </div>
          <div className="community-globe">
            <RotatingEarth width={500} height={500} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to tuck in your dotfiles?</h2>
        <p className="cta-description">
          Join developers who never lose their configs again.
        </p>
        <div className="cta-buttons">
          <a href="#install" className="btn btn-primary btn-large">
            Install tuck
          </a>
          <a href="https://github.com/Pranav-Karra-3301/tuck" className="btn btn-ghost">
            Star on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">tuck</span>
            <p className="footer-tagline">The modern dotfiles manager</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#install">Install</a>
              <a href="#commands">Commands</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="https://github.com/Pranav-Karra-3301/tuck">GitHub</a>
              <a href="https://github.com/Pranav-Karra-3301/tuck/issues">Issues</a>
              <a href="https://github.com/Pranav-Karra-3301/tuck#readme">Docs</a>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <a href="https://twitter.com/pranavkarra">Twitter</a>
              <a href="https://github.com/Pranav-Karra-3301">GitHub</a>
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
