'use client';

type CellValue = 'yes' | 'no' | 'partial' | 'planned' | string;

interface FeatureRow {
  feature: string;
  tuck: CellValue;
  chezmoi: CellValue;
  dotbot: CellValue;
  rcm: CellValue;
  vcsh: CellValue;
  yadm: CellValue;
  bareGit: CellValue;
  stow: CellValue;
}

const tools = [
  { key: 'tuck', name: 'tuck', highlight: true },
  { key: 'chezmoi', name: 'chezmoi', highlight: false },
  { key: 'dotbot', name: 'dotbot', highlight: false },
  { key: 'rcm', name: 'rcm', highlight: false },
  { key: 'vcsh', name: 'vcsh', highlight: false },
  { key: 'yadm', name: 'yadm', highlight: false },
  { key: 'bareGit', name: 'bare git', highlight: false },
  { key: 'stow', name: 'GNU Stow', highlight: false },
] as const;

const features: FeatureRow[] = [
  // === tuck unique features ===
  {
    feature: 'Automatic dotfile discovery',
    tuck: 'yes',
    chezmoi: 'no',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Secret scanning',
    tuck: 'yes',
    chezmoi: 'no',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Git history secret scanning',
    tuck: 'yes',
    chezmoi: 'no',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Time Machine backups',
    tuck: 'yes',
    chezmoi: 'no',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Smart merge with preserve markers',
    tuck: 'yes',
    chezmoi: 'no',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Auto-categorization',
    tuck: 'yes',
    chezmoi: 'no',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'GitHub repo auto-setup',
    tuck: 'yes',
    chezmoi: 'no',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Interactive CLI prompts',
    tuck: 'yes',
    chezmoi: 'partial',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  // === Standard features ===
  {
    feature: 'Distribution',
    tuck: 'npm, brew, binary',
    chezmoi: 'Single binary',
    dotbot: 'Python package',
    rcm: 'Multiple files',
    vcsh: 'Single script or package',
    yadm: 'Single script',
    bareGit: '-',
    stow: 'Perl script',
  },
  {
    feature: 'Install method',
    tuck: 'Many',
    chezmoi: 'Many',
    dotbot: 'git submodule',
    rcm: 'Many',
    vcsh: 'Many',
    yadm: 'Many',
    bareGit: 'Manual',
    stow: 'Many',
  },
  {
    feature: 'Non-root install on bare system',
    tuck: 'yes',
    chezmoi: 'yes',
    dotbot: 'partial',
    rcm: 'yes',
    vcsh: 'yes',
    yadm: 'yes',
    bareGit: 'yes',
    stow: 'yes',
  },
  {
    feature: 'Windows support',
    tuck: 'partial',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'yes',
    bareGit: 'yes',
    stow: 'partial',
  },
  {
    feature: 'Bootstrap requirements',
    tuck: 'Node.js 18+, Git',
    chezmoi: 'None',
    dotbot: 'Python, git',
    rcm: 'Bash',
    vcsh: 'sh, git',
    yadm: 'git',
    bareGit: 'git',
    stow: 'Perl',
  },
  {
    feature: 'Source repos',
    tuck: 'Single',
    chezmoi: 'Single',
    dotbot: 'Single',
    rcm: 'Multiple',
    vcsh: 'Multiple',
    yadm: 'Single',
    bareGit: 'Single',
    stow: 'Single',
  },
  {
    feature: 'dotfiles are...',
    tuck: 'Files or Symlinks',
    chezmoi: 'Files',
    dotbot: 'Symlinks',
    rcm: 'Symlinks',
    vcsh: 'Files',
    yadm: 'Files',
    bareGit: 'Files',
    stow: 'Symlinks',
  },
  {
    feature: 'Config file',
    tuck: 'Optional',
    chezmoi: 'Required',
    dotbot: 'Optional',
    rcm: 'None',
    vcsh: 'Optional',
    yadm: 'Optional',
    bareGit: 'Optional',
    stow: 'None',
  },
  {
    feature: 'Private files',
    tuck: 'yes',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'yes',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Show differences without applying',
    tuck: 'yes',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'yes',
    vcsh: 'yes',
    yadm: 'yes',
    bareGit: 'yes',
    stow: 'yes',
  },
  {
    feature: 'Whole file encryption',
    tuck: 'planned',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'yes',
    yadm: 'yes',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Password manager integration',
    tuck: 'no',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Machine-to-machine file differences',
    tuck: 'planned',
    chezmoi: 'Templates',
    dotbot: 'Alternative files',
    rcm: 'Alternative files',
    vcsh: 'Branches',
    yadm: 'Alt files, templates',
    bareGit: 'partial',
    stow: 'no',
  },
  {
    feature: 'Custom variables in templates',
    tuck: 'planned',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Executable files',
    tuck: 'yes',
    chezmoi: 'yes',
    dotbot: 'yes',
    rcm: 'yes',
    vcsh: 'yes',
    yadm: 'yes',
    bareGit: 'yes',
    stow: 'yes',
  },
  {
    feature: 'File creation with initial contents',
    tuck: 'no',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'yes',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Externals',
    tuck: 'no',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'no',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Manage partial files',
    tuck: 'planned',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'partial',
    yadm: 'yes',
    bareGit: 'partial',
    stow: 'no',
  },
  {
    feature: 'File removal',
    tuck: 'yes',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'yes',
    yadm: 'yes',
    bareGit: 'no',
    stow: 'yes',
  },
  {
    feature: 'Directory creation',
    tuck: 'yes',
    chezmoi: 'yes',
    dotbot: 'yes',
    rcm: 'yes',
    vcsh: 'yes',
    yadm: 'yes',
    bareGit: 'yes',
    stow: 'yes',
  },
  {
    feature: 'Run scripts (hooks)',
    tuck: 'yes',
    chezmoi: 'yes',
    dotbot: 'yes',
    rcm: 'yes',
    vcsh: 'yes',
    yadm: 'yes',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Run once scripts',
    tuck: 'yes',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'yes',
    yadm: 'yes',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Machine-to-machine symlink differences',
    tuck: 'no',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'partial',
    vcsh: 'yes',
    yadm: 'partial',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Shell completion',
    tuck: 'no',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'yes',
    yadm: 'yes',
    bareGit: 'yes',
    stow: 'no',
  },
  {
    feature: 'Archive import',
    tuck: 'partial',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'yes',
    yadm: 'no',
    bareGit: 'no',
    stow: 'no',
  },
  {
    feature: 'Archive export',
    tuck: 'partial',
    chezmoi: 'yes',
    dotbot: 'no',
    rcm: 'no',
    vcsh: 'yes',
    yadm: 'no',
    bareGit: 'yes',
    stow: 'no',
  },
  {
    feature: 'Implementation language',
    tuck: 'TypeScript',
    chezmoi: 'Go',
    dotbot: 'Python',
    rcm: 'Bash',
    vcsh: 'POSIX Shell',
    yadm: 'Bash',
    bareGit: 'C',
    stow: 'Perl',
  },
];

function CellContent({ value }: { value: CellValue }) {
  if (value === 'yes') {
    return <span className="cell-icon cell-yes" aria-label="Supported">&#10003;</span>;
  }
  if (value === 'no') {
    return <span className="cell-icon cell-no" aria-label="Not supported">&#10005;</span>;
  }
  if (value === 'partial') {
    return <span className="cell-icon cell-partial" aria-label="Partial support">!?</span>;
  }
  if (value === 'planned') {
    return <span className="cell-icon cell-planned" aria-label="Planned">Planned</span>;
  }
  return <span className="cell-text">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <section className="comparison-section" id="compare">
      <div className="section-header">
        <h2 className="section-title">How tuck compares</h2>
        <p className="section-subtitle">Feature comparison with other dotfile managers</p>
      </div>
      
      <div className="comparison-table-wrapper">
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-header">Feature</th>
                {tools.map((tool) => (
                  <th 
                    key={tool.key} 
                    className={`tool-header ${tool.highlight ? 'highlight' : ''}`}
                  >
                    {tool.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <tr key={index}>
                  <td className="feature-cell">{row.feature}</td>
                  {tools.map((tool) => (
                    <td 
                      key={tool.key} 
                      className={`value-cell ${tool.highlight ? 'highlight' : ''}`}
                    >
                      <CellContent value={row[tool.key as keyof FeatureRow] as CellValue} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="comparison-legend">
        <div className="legend-item">
          <span className="cell-icon cell-yes">&#10003;</span>
          <span>Supported</span>
        </div>
        <div className="legend-item">
          <span className="cell-icon cell-partial">!?</span>
          <span>Partial / Manual effort</span>
        </div>
        <div className="legend-item">
          <span className="cell-icon cell-planned">Planned</span>
          <span>Coming soon</span>
        </div>
        <div className="legend-item">
          <span className="cell-icon cell-no">&#10005;</span>
          <span>Not supported</span>
        </div>
      </div>
    </section>
  );
}
