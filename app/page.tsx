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
              Simple, fast, and built in TypeScript. Track any config file —
              in your home directory or inside any git repo — sync across
              machines, and never lose your configs again. Agent-native, too:
              structured JSON output and a write-confined sandbox.
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
        description="Bootstrap a new machine in seconds. Point tuck at a GitHub, GitLab, or custom user, any git URL, a local folder, or a tarball. tuck creates Time Machine backup snapshots of your existing configs and applies with smart merging that preserves your local customizations."
        command="tuck apply <source>"
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

      <FeatureShowcase
        title="Verify nothing drifted"
        description="tuck verify compares your live files, the repo, and the manifest so you always know what's out of sync. Use --exit-code as a CI gate, --json for automation, and --fix to safely re-copy whatever drifted."
        command="tuck verify"
        reversed
        link={{ text: "See all commands", href: "#commands" }}
        painting={{
          src: "/paintings/heart-of-the-andes.webp",
          title: "Heart of the Andes",
          artist: "Frederic Edwin Church",
          year: "1859",
          metUrl: "https://www.metmuseum.org/art/collection/search/10481",
        }}
      />

      <FeatureShowcase
        title="Track configs inside your repos"
        description="Not just your home directory. Track .vscode/settings.json, CLAUDE.md, or .cursorrules that live inside a project, then sync them across machines with 'tuck repo link'. Track any config file, anywhere."
        command="tuck add --repo ."
        link={{ text: "Learn about repo tracking", href: "#commands" }}
        painting={{
          src: "/paintings/the-gulf-stream.webp",
          title: "The Gulf Stream",
          artist: "Winslow Homer",
          year: "1899",
          metUrl: "https://www.metmuseum.org/art/collection/search/11122",
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
              <p className="step-note">Scans your dotfiles, select what to track, syncs to your remote (GitHub, GitLab, or custom — or stay fully local)</p>
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
              description: "Set up tuck, scan for dotfiles, select what to track, and sync - all in one. Works with GitHub, GitLab, custom, or local-only providers. Creates ~/.tuck directory with Git tracking.",
              flags: ["--from <url>", "--bare", "-r, --remote <url>", "-y, --yes", "--json"]
            },
            {
              name: "tuck sync",
              description: "Detect changes, find new files, and push to remote. Pulls first if behind, scans for new dotfiles, commits and pushes.",
              flags: ["--json", "--plan", "--dry-run", "--no-commit", "--no-push", "-m, --message"]
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
              description: "Manually track specific files. Copies files to ~/.tuck organized by category. Use --repo to track config files that live inside any git repo, not just $HOME.",
              flags: ["--repo [dir]", "-c, --category", "--symlink", "--json", "--yes"]
            },
            {
              name: "tuck remove <files>",
              description: "Stop tracking dotfiles. Optionally delete from repository or keep original files intact.",
              flags: ["--delete", "--json"]
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
              name: "tuck apply <source>",
              description: "Apply dotfiles from anywhere: a GitHub, GitLab, or custom user or owner/repo, any git URL, a local directory, or a tarball. Smart merging preserves your local customizations.",
              flags: ["--merge", "--replace", "--dry-run", "--json", "--repo-root"]
            },
            {
              name: "tuck restore",
              description: "Restore dotfiles from ~/.tuck to your system. Useful when setting up on a new machine.",
              flags: ["--all", "--json", "--plan", "--dry-run", "--symlink"]
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
              flags: ["list", "set <name>", "scan", "scan-history", "--json"]
            },
            {
              name: "tuck config",
              description: "Customize tuck behavior - default branch, file strategy, hooks, and more.",
              flags: ["get <key>", "set <key> <value>", "list", "edit", "--json"]
            },
            {
              name: "tuck diff",
              description: "Show differences between system files and repository. Useful before syncing.",
              flags: ["--staged", "--stat", "--category", "--json"]
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

        {/* Agent-Native Commands */}
        <CommandShowcase
          title="Agent-Native"
          description="Drive tuck from AI agents and CI — structured JSON I/O, drift verification, a write-confined --root sandbox, and an MCP server. Every command supports --json, --yes, --plan, and --dry-run for safe, scriptable automation."
          commands={[
            {
              name: "tuck verify",
              description: "Detect drift between your live files, the repo, and the manifest. Gate CI on it or safely re-copy what changed.",
              flags: ["--json", "--exit-code", "--fix"]
            },
            {
              name: "tuck repo",
              description: "Manage per-machine bindings for config files tracked inside your git repos, synced across machines.",
              flags: ["link", "list", "unlink"]
            },
            {
              name: "tuck mcp serve",
              description: "Expose tuck as tools to AI agents over MCP. Pair with --root to confine every write to a sandbox.",
              flags: ["tools"]
            }
          ]}
          painting={{
            src: "/paintings/the-gulf-stream.webp",
            title: "The Gulf Stream",
            artist: "Winslow Homer",
            year: "1899",
            metUrl: "https://www.metmuseum.org/art/collection/search/11122"
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
              <div className="diagram-item">
                <span className="diagram-file">~/work/app/.vscode/settings.json</span>
                <span className="diagram-arrow">→</span>
                <span className="diagram-link">~/.tuck/files/repos/&lt;repo&gt;/.vscode/settings.json</span>
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
            <p className="community-kicker">Built on open source</p>
            <h2 className="section-title">Built with the open source community</h2>
            <p className="community-description">
              tuck stays small by leaning on tools developers already trust:
              Git for history, TypeScript for clarity, and standard package
              managers for distribution. The point is not to invent a new
              workflow, just to make dotfiles easier to keep.
            </p>
            <div className="community-tags" aria-label="Open source foundations">
              <span className="community-tag">Git-backed history</span>
              <span className="community-tag">TypeScript CLI</span>
              <span className="community-tag">npm + Homebrew installs</span>
              <span className="community-tag">GitHub collaboration</span>
            </div>
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
          <div className="community-visual" aria-hidden="true">
            <span className="community-sticker community-sticker-git">git-backed</span>
            <span className="community-sticker community-sticker-typescript">typescript</span>
            <span className="community-sticker community-sticker-npm">npm</span>
            <span className="community-sticker community-sticker-brew">homebrew</span>
            <div className="community-globe">
              <RotatingEarth className="community-cobe" />
            </div>
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
