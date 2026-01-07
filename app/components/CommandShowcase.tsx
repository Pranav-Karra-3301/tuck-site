'use client';

interface Command {
  name: string;
  description: string;
  flags: string[];
}

interface PaintingInfo {
  src: string;
  title: string;
  artist: string;
  year: string;
  metUrl: string;
}

interface CommandShowcaseProps {
  title: string;
  description: string;
  commands: Command[];
  reversed?: boolean;
  painting: PaintingInfo;
}

export default function CommandShowcase({
  title,
  description,
  commands,
  reversed = false,
  painting,
}: CommandShowcaseProps) {
  return (
    <section className={`command-showcase ${reversed ? 'reversed' : ''}`}>
      <div className="command-showcase-content">
        <div className="command-showcase-text">
          <h2 className="command-showcase-title">{title}</h2>
          <p className="command-showcase-description">{description}</p>
        </div>
        <div
          className="command-showcase-panel"
          style={{ backgroundImage: `url(${painting.src})` }}
        >
          <div className="command-showcase-cards">
            {commands.map((cmd, index) => (
              <div key={index} className="command-showcase-card">
                <code className="command-showcase-name">{cmd.name}</code>
                <p className="command-showcase-cmd-description">{cmd.description}</p>
                <div className="command-showcase-flags">
                  {cmd.flags.map((flag, i) => (
                    <span key={i} className="command-showcase-flag">{flag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <a
            href={painting.metUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="painting-attribution"
          >
            {painting.title}, {painting.artist}, {painting.year}
          </a>
        </div>
      </div>
    </section>
  );
}
