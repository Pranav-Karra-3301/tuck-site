import Terminal from "./components/Terminal";
import FeatureShowcase from "./components/FeatureShowcase";
import CommandShowcase from "./components/CommandShowcase";
import HeroInstall from "./components/HeroInstall";
import RotatingEarth from "./components/RotatingEarth";
import CopyButton from "./components/CopyButton";
import ComparisonTable from "./components/ComparisonTable";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <article className="website-content">
        {/* Print-only header */}
        <header className="print-header">
          <h1>tuck</h1>
          <p className="print-tagline">The Modern Dotfiles Manager</p>
          <p className="print-url">https://tuck.sh</p>
        </header>

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
        <div className="hero-showcase" aria-hidden="true">
          <div className="showcase-container">
            <Terminal autoPlay />
          </div>
          <a
            href="https://www.metmuseum.org/art/collection/search/11314"
            target="_blank"
            rel="noopener noreferrer"
            className="painting-attribution hero-attribution"
            tabIndex={-1}
          >
            Lake George, Free Study, John Frederick Kensett, c. 1872
          </a>
        </div>
      </section>

      {/* Feature Showcases */}
      <div id="features">
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
      </div>

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
                <CopyButton text="npm install -g @prnv/tuck" />
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
              flags: ["--from <url>", "--bare", "-r, --remote"]
            },
            {
              name: "tuck sync",
              description: "Detect changes, find new files, and push to remote. Pulls first if behind, scans for new dotfiles, commits and pushes.",
              flags: ["--no-commit", "--no-push", "--no-scan", "-m, --message"]
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
              flags: ["-c, --category", "--symlink", "-f, --force"]
            },
            {
              name: "tuck remove <files>",
              description: "Stop tracking dotfiles. Optionally delete from repository or keep original files intact.",
              flags: ["--delete", "--keep-original"]
            },
            {
              name: "tuck list",
              description: "List all tracked files. Filter by category or output as JSON for scripting.",
              flags: ["-c, --category", "--paths", "--json"]
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
              flags: ["--merge", "--replace", "--dry-run"]
            },
            {
              name: "tuck restore",
              description: "Restore dotfiles from ~/.tuck to your system. Useful when setting up on a new machine.",
              flags: ["--all", "--dry-run", "--symlink"]
            },
            {
              name: "tuck undo",
              description: "Restore files from Time Machine backup snapshots. Created automatically when using tuck apply.",
              flags: ["--list", "--latest", "--file <path>"]
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

        {/* Security & Config Commands */}
        <CommandShowcase
          title="Security & Config"
          description="Manage secrets safely and customize tuck to your workflow. Keep sensitive data out of git while staying productive."
          reversed
          commands={[
            {
              name: "tuck secrets",
              description: "Manage local secrets for placeholder replacement. Scan files and git history for exposed secrets.",
              flags: ["list", "set <name>", "scan", "scan-history"]
            },
            {
              name: "tuck config",
              description: "Customize tuck behavior - default branch, file strategy, hooks, and more.",
              flags: ["get <key>", "set <key> <value>", "list", "edit"]
            },
            {
              name: "tuck diff",
              description: "Show differences between system files and repository. Useful before syncing.",
              flags: ["--staged", "--stat", "--category"]
            }
          ]}
          painting={{
            src: "/paintings/wyoming-valley-pennsylvania.webp",
            title: "Wyoming Valley, Pennsylvania",
            artist: "Jasper Francis Cropsey",
            year: "1864",
            metUrl: "https://www.metmuseum.org/art/collection/search/10589"
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

      {/* Comparison Table Section */}
      <ComparisonTable />

      {/* Open Source Community Section */}
      <section className="community-section">
        <div className="community-content">
          <div className="community-text">
            <h2 className="section-title">Built with the open source community</h2>
            <div className="community-buttons">
              <a
                href="https://github.com/Pranav-Karra-3301/tuck"
                target="_blank"
                rel="noopener noreferrer"
                className="community-button"
              >
                Contribute to tuck
              </a>
              <a
                href="https://github.com/Pranav-Karra-3301/tuck-site"
                target="_blank"
                rel="noopener noreferrer"
                className="community-button secondary"
              >
                Help improve this website
              </a>
            </div>
          </div>
          <div className="community-globe" aria-hidden="true">
            <RotatingEarth width={500} height={500} />
          </div>
        </div>
      </section>

      {/* Install Section */}
      <section className="install-section">
        <h2 className="section-title">Install tuck</h2>
        <p className="install-subtitle">Choose your preferred method</p>
        <div className="install-methods">
          <div className="install-method">
            <span className="install-label">npm</span>
            <div className="code-block">
              <code>npm install -g @prnv/tuck</code>
              <CopyButton text="npm install -g @prnv/tuck" />
            </div>
          </div>
          <div className="install-method">
            <span className="install-label">brew</span>
            <div className="code-block">
              <code>brew install prnv/tap/tuck</code>
              <CopyButton text="brew install prnv/tap/tuck" />
            </div>
          </div>
          <div className="install-method">
            <span className="install-label">curl</span>
            <div className="code-block">
              <code>curl -fsSL https://tuck.sh/install.sh | bash</code>
              <CopyButton text="curl -fsSL https://tuck.sh/install.sh | bash" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </article>
    </>
  );
}
