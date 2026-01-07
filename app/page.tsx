import Terminal from "./components/Terminal";
import FeatureShowcase from "./components/FeatureShowcase";
import CommandShowcase from "./components/CommandShowcase";
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
          <a
            href="https://www.metmuseum.org/art/collection/search/11314"
            target="_blank"
            rel="noopener noreferrer"
            className="painting-attribution hero-attribution"
          >
            Lake George, Free Study, John Frederick Kensett, c. 1872
          </a>
        </div>
      </section>

      {/* Feature Showcases */}
      <FeatureShowcase
        title="Track any dotfile instantly"
        description="Smart category detection organizes your configs automatically. Let tuck init and tuck sync discover files automatically, or use tuck add for manual control. Files are copied and organized by category."
        command="tuck add ~/.zshrc ~/.gitconfig"
        link={{ text: "Learn about tracking", href: "#commands" }}
        painting={{
          src: "/paintings/heart-of-the-andes.webp",
          title: "Heart of the Andes",
          artist: "Frederic Edwin Church",
          year: "1859",
          metUrl: "https://www.metmuseum.org/art/collection/search/10481",
        }}
      />

      <FeatureShowcase
        title="Know your dotfiles status"
        description="See your entire configuration state at a glance. Branch info, sync status, and all tracked files organized by category - everything you need to stay in control."
        command="tuck status"
        reversed
        link={{ text: "View all commands", href: "#commands" }}
        painting={{
          src: "/paintings/the-gulf-stream.webp",
          title: "The Gulf Stream",
          artist: "Winslow Homer",
          year: "1899",
          metUrl: "https://www.metmuseum.org/art/collection/search/11122",
        }}
      />

      <FeatureShowcase
        title="Sync with a single command"
        description="Automatically detects changes AND new dotfiles on your system. Select what to track interactively, commit, and push - all in one command. Pulls from remote first if behind. No manual git workflows needed."
        command="tuck sync"
        link={{ text: "See how sync works", href: "#commands" }}
        painting={{
          src: "/paintings/rocky-mountains-landers-peak.webp",
          title: "The Rocky Mountains, Lander's Peak",
          artist: "Albert Bierstadt",
          year: "1863",
          metUrl: "https://www.metmuseum.org/art/collection/search/10154",
        }}
      />

      <FeatureShowcase
        title="Apply dotfiles from anywhere"
        description="Bootstrap a new machine in seconds. Just provide a GitHub username and tuck will clone their dotfiles, create Time Machine backup snapshots of your existing configs, and apply with smart merging that preserves your local customizations."
        command="tuck apply username"
        reversed
        link={{ text: "Learn about apply", href: "#commands" }}
        painting={{
          src: "/paintings/wyoming-valley-pennsylvania.webp",
          title: "Wyoming Valley, Pennsylvania",
          artist: "Jasper Francis Cropsey",
          year: "1864",
          metUrl: "https://www.metmuseum.org/art/collection/search/10589",
        }}
      />

      <FeatureShowcase
        title="Restore when you need it"
        description="Symlink or copy, your choice. Automatic backups before every operation mean you can always restore. SSH and GPG permissions are handled correctly."
        command="tuck restore --all"
        link={{ text: "Explore restore options", href: "#commands" }}
        painting={{
          src: "/paintings/hill-of-the-alhambra.webp",
          title: "The Hill of the Alhambra, Granada",
          artist: "Samuel Colman",
          year: "1865",
          metUrl: "https://www.metmuseum.org/art/collection/search/10508",
        }}
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
              <h3>Initialize (does everything!)</h3>
              <div className="code-block">
                <code>tuck init</code>
              </div>
              <p className="step-note">Scans your dotfiles, select what to track, syncs to GitHub</p>
            </div>
          </div>
          <div className="install-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Keep in sync (ongoing)</h3>
              <div className="code-block">
                <code>tuck sync</code>
              </div>
              <p className="step-note">Run anytime - detects changes, finds new files, pushes updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Section */}
      <div id="commands">
        {/* Core Commands */}
        <CommandShowcase
          title="Core Commands"
          description="What 99% of users need. Initialize, sync, and check status - the essential workflow for managing your dotfiles."
          commands={[
            {
              name: "tuck init",
              description: "Set up tuck, scan for dotfiles, select what to track, and sync - all in one. Creates ~/.tuck directory with Git tracking.",
              flags: ["-d, --dir <path>", "--from <url>"]
            },
            {
              name: "tuck sync",
              description: "Detect changes, find new files, and push to remote. Pulls first if behind, scans for new dotfiles, commits and pushes.",
              flags: ["--no-commit", "--no-push", "--no-scan"]
            },
            {
              name: "tuck status",
              description: "See what's tracked and what's changed. Shows branch info, sync status, and all tracked files by category.",
              flags: ["--short", "--json"]
            }
          ]}
          painting={{
            src: "/paintings/lake-george-free-study.webp",
            title: "Lake George, Free Study",
            artist: "John Frederick Kensett",
            year: "c. 1872",
            metUrl: "https://www.metmuseum.org/art/collection/search/11314"
          }}
        />

        {/* Backup Commands */}
        <CommandShowcase
          title="Backup Commands"
          description="Fine-grained control for creating and managing your dotfile backups. Add files, discover new ones, and sync manually."
          reversed
          commands={[
            {
              name: "tuck add <files>",
              description: "Manually track specific files. Copies files to ~/.tuck organized by category (shell, git, editors, etc).",
              flags: ["-c, --category", "--symlink"]
            },
            {
              name: "tuck scan",
              description: "Discover dotfiles on your system without syncing. Interactive selection for which files to track.",
              flags: ["-q, --quick", "-c, --category"]
            },
            {
              name: "tuck push / pull",
              description: "Manual git operations. Push commits to remote or pull latest changes. Use tuck sync for automated workflow.",
              flags: ["--force", "--rebase"]
            }
          ]}
          painting={{
            src: "/paintings/rocky-mountains-landers-peak.webp",
            title: "The Rocky Mountains, Lander's Peak",
            artist: "Albert Bierstadt",
            year: "1863",
            metUrl: "https://www.metmuseum.org/art/collection/search/10154"
          }}
        />

        {/* Restore Commands */}
        <CommandShowcase
          title="Restore Commands"
          description="Apply dotfiles from others, restore your own, or undo changes. Everything you need to use your backups across machines."
          commands={[
            {
              name: "tuck apply <user>",
              description: "Apply dotfiles from any GitHub user's repository. Smart merging preserves your local customizations.",
              flags: ["--merge", "--replace"]
            },
            {
              name: "tuck restore",
              description: "Restore dotfiles from ~/.tuck to your system. Useful when setting up on a new machine.",
              flags: ["--all", "--dry-run"]
            },
            {
              name: "tuck undo",
              description: "Restore files from Time Machine backup snapshots. Created automatically when using tuck apply.",
              flags: ["--list", "--latest"]
            }
          ]}
          painting={{
            src: "/paintings/hill-of-the-alhambra.webp",
            title: "The Hill of the Alhambra, Granada",
            artist: "Samuel Colman",
            year: "1865",
            metUrl: "https://www.metmuseum.org/art/collection/search/10508"
          }}
        />
      </div>

      {/* How It Works Section */}
      <section className="how-section">
        <div className="how-content">
          <div className="how-text">
            <h2 className="section-title">How it works</h2>
            <p className="how-description">
              tuck stores your dotfiles in ~/.tuck, organized by category.
              When you run tuck init, it scans your system and lets you 
              choose which files to track. Run tuck sync anytime to 
              detect changes and sync to your remote.
            </p>
            <div className="how-diagram">
              <div className="diagram-item">
                <span className="diagram-file">~/.zshrc</span>
                <span className="diagram-arrow">→</span>
                <span className="diagram-link">~/.tuck/files/shell/zshrc</span>
              </div>
              <div className="diagram-item">
                <span className="diagram-file">~/.gitconfig</span>
                <span className="diagram-arrow">→</span>
                <span className="diagram-link">~/.tuck/files/git/gitconfig</span>
              </div>
              <div className="diagram-item">
                <span className="diagram-file">~/.config/nvim</span>
                <span className="diagram-arrow">→</span>
                <span className="diagram-link">~/.tuck/files/editors/nvim</span>
              </div>
            </div>
            <p className="how-note">
              Run <code>tuck sync</code> to detect changes and push to remote.
              On a new machine: <code>tuck init --from &lt;repo-url&gt;</code> or <code>tuck apply username</code>
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
