'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface OutputLine {
  type: 'banner' | 'input' | 'output' | 'success' | 'error' | 'dim' | 'cyan' | 'yellow' | 'box' | 'empty' | 'spinner' | 'divider' | 'prompt-line' | 'prompt-input' | 'intro' | 'bold' | 'categories';
  content: string;
}

// Start with empty terminal - content shows after command execution
const INITIAL_OUTPUT: OutputLine[] = [];

const DEMO_RESPONSES: Record<string, OutputLine[]> = {
  'tuck init': [
    { type: 'banner', content: ' ████████╗██╗   ██╗ ██████╗██╗  ██╗' },
    { type: 'banner', content: ' ╚══██╔══╝██║   ██║██╔════╝██║ ██╔╝' },
    { type: 'banner', content: '    ██║   ██║   ██║██║     █████╔╝' },
    { type: 'banner', content: '    ██║   ██║   ██║██║     ██╔═██╗' },
    { type: 'banner', content: '    ██║   ╚██████╔╝╚██████╗██║  ██╗' },
    { type: 'banner', content: '    ╚═╝    ╚═════╝  ╚═════╝╚═╝  ╚═╝' },
    { type: 'dim', content: '    Modern Dotfiles Manager' },
    { type: 'empty', content: '' },
    { type: 'intro', content: '◆  tuck init' },
    { type: 'empty', content: '' },
    { type: 'prompt-line', content: '│' },
    { type: 'output', content: '◇  Where should tuck store your dotfiles?' },
    { type: 'prompt-input', content: '│  ~/.tuck' },
    { type: 'prompt-line', content: '│' },
    { type: 'spinner', content: '◐  Creating directory structure...' },
    { type: 'success', content: '✓  Directory structure created' },
    { type: 'spinner', content: '◐  Initializing git repository...' },
    { type: 'success', content: '✓  Git repository initialized' },
    { type: 'spinner', content: '◐  Creating manifest...' },
    { type: 'success', content: '✓  Manifest created' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Scanning for dotfiles...' },
    { type: 'success', content: '✓  Found 12 dotfiles on your system' },
    { type: 'empty', content: '' },
    { type: 'dim', content: '  $ shell: 4 files' },
    { type: 'dim', content: '  ★ git: 2 files' },
    { type: 'dim', content: '  › editors: 3 files' },
    { type: 'dim', content: '  # terminal: 2 files' },
    { type: 'dim', content: '  • misc: 1 file' },
    { type: 'empty', content: '' },
    { type: 'box', content: '╭──────────────────────────────────╮' },
    { type: 'box', content: '│  ✓ Tuck initialized at ~/.tuck   │' },
    { type: 'box', content: '│                                  │' },
    { type: 'box', content: '│  Next: tuck sync                 │' },
    { type: 'box', content: '╰──────────────────────────────────╯' },
  ],
  'tuck add ~/.zshrc': [
    { type: 'empty', content: '' },
    { type: 'intro', content: '◆  tuck add' },
    { type: 'empty', content: '' },
    { type: 'output', content: 'Tracking 1 file...' },
    { type: 'divider', content: '────────────────────────────────────' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Copying ~/.zshrc...' },
    { type: 'success', content: '  ✓ ~/.zshrc [shell]' },
    { type: 'empty', content: '' },
    { type: 'success', content: '✓  Tracked 1 file' },
    { type: 'dim', content: '   Run \'tuck sync\' to commit' },
  ],
  'tuck status': [
    { type: 'empty', content: '' },
    { type: 'box', content: '╭────────────────────────────────╮' },
    { type: 'box', content: '│ tuck · Modern Dotfiles Manager │' },
    { type: 'box', content: '╰────────────────────────────────╯' },
    { type: 'empty', content: '' },
    { type: 'bold', content: 'Status:' },
    { type: 'empty', content: '' },
    { type: 'output', content: '  Tracked files: 37' },
    { type: 'output', content: '  Pending changes: none' },
    { type: 'empty', content: '' },
    { type: 'bold', content: 'Next steps:' },
    { type: 'empty', content: '' },
    { type: 'success', content: '  All synced! Your dotfiles are up to date.' },
    { type: 'empty', content: '' },
    { type: 'dim', content: '  tuck scan  - Find more dotfiles to track' },
    { type: 'dim', content: '  tuck list  - See tracked files' },
  ],
  'tuck sync': [
    { type: 'empty', content: '' },
    { type: 'intro', content: '◆  tuck sync' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Checking remote...' },
    { type: 'success', content: '✓  Up to date with remote' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Detecting changes...' },
    { type: 'success', content: '✓  Found 2 modified files' },
    { type: 'empty', content: '' },
    { type: 'yellow', content: '  ~ ~/.zshrc' },
    { type: 'yellow', content: '  ~ ~/.gitconfig' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Scanning for new dotfiles...' },
    { type: 'success', content: '✓  No new dotfiles found' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Staging changes...' },
    { type: 'success', content: '✓  Changes staged' },
    { type: 'spinner', content: '◐  Creating commit...' },
    { type: 'success', content: '✓  Committed: Update configs' },
    { type: 'spinner', content: '◐  Pushing to origin/main...' },
    { type: 'success', content: '✓  Pushed to origin/main' },
    { type: 'empty', content: '' },
    { type: 'box', content: '╭───────────────────────────╮' },
    { type: 'box', content: '│  ✓ Synced successfully!   │' },
    { type: 'box', content: '╰───────────────────────────╯' },
  ],
  'tuck push': [
    { type: 'empty', content: '' },
    { type: 'intro', content: '◆  tuck push' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Pushing to origin/main...' },
    { type: 'success', content: '✓  Pushed 2 commits to origin/main' },
    { type: 'empty', content: '' },
    { type: 'box', content: '╭─────────────────────────────────────╮' },
    { type: 'box', content: '│  Your dotfiles are synced!          │' },
    { type: 'box', content: '│                                     │' },
    { type: 'box', content: '│  On a new machine:                  │' },
    { type: 'box', content: '│  tuck apply your-username           │' },
    { type: 'box', content: '╰─────────────────────────────────────╯' },
  ],
  'help': [
    { type: 'empty', content: '' },
    { type: 'box', content: '╭────────────────────────────────╮' },
    { type: 'box', content: '│ tuck · Modern Dotfiles Manager │' },
    { type: 'box', content: '╰────────────────────────────────╯' },
    { type: 'empty', content: '' },
    { type: 'cyan', content: 'Quick Start:' },
    { type: 'output', content: '  tuck init        Set up tuck' },
    { type: 'output', content: '  tuck add <file>  Track a dotfile' },
    { type: 'output', content: '  tuck sync        Commit & push' },
    { type: 'empty', content: '' },
    { type: 'cyan', content: 'New Machine:' },
    { type: 'output', content: '  tuck apply <user>  Get dotfiles' },
    { type: 'empty', content: '' },
    { type: 'dim', content: '  tuck <cmd> --help for details' },
  ],
  'tuck add ~/.zshrc ~/.gitconfig': [
    { type: 'empty', content: '' },
    { type: 'intro', content: '◆  tuck add' },
    { type: 'empty', content: '' },
    { type: 'output', content: 'Tracking 2 files...' },
    { type: 'divider', content: '────────────────────────────────────' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  [1/2] ~/.zshrc' },
    { type: 'success', content: '  ✓ [1/2] ~/.zshrc [shell]' },
    { type: 'spinner', content: '◐  [2/2] ~/.gitconfig' },
    { type: 'success', content: '  ✓ [2/2] ~/.gitconfig [git]' },
    { type: 'empty', content: '' },
    { type: 'success', content: '✓  Tracked 2 files' },
    { type: 'empty', content: '' },
    { type: 'output', content: '◇  Sync these changes now?' },
    { type: 'prompt-input', content: '│  Yes' },
  ],
  'tuck apply username': [
    { type: 'banner', content: ' ████████╗██╗   ██╗ ██████╗██╗  ██╗' },
    { type: 'banner', content: ' ╚══██╔══╝██║   ██║██╔════╝██║ ██╔╝' },
    { type: 'banner', content: '    ██║   ██║   ██║██║     █████╔╝' },
    { type: 'banner', content: '    ██║   ██║   ██║██║     ██╔═██╗' },
    { type: 'banner', content: '    ██║   ╚██████╔╝╚██████╗██║  ██╗' },
    { type: 'banner', content: '    ╚═╝    ╚═════╝  ╚═════╝╚═╝  ╚═╝' },
    { type: 'dim', content: '    Modern Dotfiles Manager' },
    { type: 'empty', content: '' },
    { type: 'intro', content: '◆  tuck apply' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Fetching from github.com/username...' },
    { type: 'success', content: '✓  Repository cloned' },
    { type: 'empty', content: '' },
    { type: 'output', content: 'Found 5 dotfiles:' },
    { type: 'empty', content: '' },
    { type: 'cyan', content: '  $ shell (2)' },
    { type: 'dim', content: '    └── ~/.zshrc' },
    { type: 'dim', content: '    └── ~/.bash_profile' },
    { type: 'yellow', content: '  ★ git (1)' },
    { type: 'dim', content: '    └── ~/.gitconfig' },
    { type: 'cyan', content: '  › editors (2)' },
    { type: 'dim', content: '    └── ~/.vimrc' },
    { type: 'dim', content: '    └── ~/.config/nvim' },
    { type: 'empty', content: '' },
    { type: 'output', content: '◇  Apply these dotfiles?' },
    { type: 'prompt-input', content: '│  Yes, merge with existing' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Creating backup...' },
    { type: 'success', content: '✓  Backup created' },
    { type: 'spinner', content: '◐  Applying dotfiles...' },
    { type: 'success', content: '✓  Applied 5 files' },
    { type: 'empty', content: '' },
    { type: 'box', content: '╭───────────────────────────────╮' },
    { type: 'box', content: '│  ✓ Dotfiles applied!          │' },
    { type: 'box', content: '│                               │' },
    { type: 'box', content: '│  tuck status  - see details   │' },
    { type: 'box', content: '│  tuck undo    - restore       │' },
    { type: 'box', content: '╰───────────────────────────────╯' },
  ],
  'tuck restore --all': [
    { type: 'empty', content: '' },
    { type: 'intro', content: '◆  tuck restore --all' },
    { type: 'empty', content: '' },
    { type: 'output', content: 'Restoring all tracked dotfiles...' },
    { type: 'divider', content: '────────────────────────────────────' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Creating backup...' },
    { type: 'success', content: '✓  Backup created' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  [1/4] ~/.zshrc' },
    { type: 'success', content: '  ✓ [1/4] ~/.zshrc [shell]' },
    { type: 'spinner', content: '◐  [2/4] ~/.gitconfig' },
    { type: 'success', content: '  ✓ [2/4] ~/.gitconfig [git]' },
    { type: 'spinner', content: '◐  [3/4] ~/.vimrc' },
    { type: 'success', content: '  ✓ [3/4] ~/.vimrc [editors]' },
    { type: 'spinner', content: '◐  [4/4] ~/.config/nvim' },
    { type: 'success', content: '  ✓ [4/4] ~/.config/nvim [editors]' },
    { type: 'empty', content: '' },
    { type: 'box', content: '╭──────────────────────────╮' },
    { type: 'box', content: '│  ✓ Restored 4 files      │' },
    { type: 'box', content: '╰──────────────────────────╯' },
  ],
};

interface TerminalProps {
  autoPlay?: boolean;
  command?: string;
  static?: boolean;
  playOnScroll?: boolean;
}

export default function Terminal({ autoPlay = false, command, static: isStatic = false, playOnScroll = true }: TerminalProps) {
  const [lines, setLines] = useState<OutputLine[]>(INITIAL_OUTPUT);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 520, height: 380 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState(0);
  const [activeSpinnerIdx, setActiveSpinnerIdx] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const hiddenSpanRef = useRef<HTMLSpanElement>(null);
  const promptRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (hiddenSpanRef.current && promptRef.current) {
      hiddenSpanRef.current.textContent = input || '';
      const promptElement = promptRef.current;
      const promptWidth = promptElement.offsetWidth;
      const promptStyle = window.getComputedStyle(promptElement);
      const marginRight = parseFloat(promptStyle.marginRight) || 0;
      setCursorPosition(promptWidth + marginRight + hiddenSpanRef.current.offsetWidth);
    }
  }, [input]);

  // Intersection Observer for scroll-triggered playback
  useEffect(() => {
    if (!playOnScroll || hasPlayed || autoPlay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setHasPlayed(true);
          if (command) {
            setTimeout(() => executeCommand(command), 500);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (windowRef.current) {
      observer.observe(windowRef.current);
    }

    return () => observer.disconnect();
  }, [playOnScroll, hasPlayed, command, autoPlay]);

  // Auto-play demo on mount
  useEffect(() => {
    if (autoPlay && !hasPlayed) {
      setHasPlayed(true);
      const runDemo = async () => {
        await new Promise(r => setTimeout(r, 1500));
        await executeCommand('tuck init');
        await new Promise(r => setTimeout(r, 2000));
        await executeCommand('tuck add ~/.zshrc');
        await new Promise(r => setTimeout(r, 1500));
        await executeCommand('tuck status');
      };
      runDemo();
    }
  }, [autoPlay, hasPlayed]);

  // Execute single command on mount (non-scroll mode)
  useEffect(() => {
    if (command && !autoPlay && !playOnScroll) {
      const runCommand = async () => {
        await new Promise(r => setTimeout(r, 800));
        await executeCommand(command);
      };
      runCommand();
    }
  }, [command, autoPlay, playOnScroll]);

  // Dragging logic
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isStatic) return;
    if ((e.target as HTMLElement).closest('.terminal-titlebar')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position, isStatic]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    if (isStatic) return;
    e.stopPropagation();
    setIsResizing(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isStatic]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const container = windowRef.current?.parentElement;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const padding = 20;
          const newX = e.clientX - dragStart.x;
          const newY = e.clientY - dragStart.y;
          const minX = -(containerRect.width / 2) + (size.width / 2) + padding;
          const maxX = (containerRect.width / 2) - (size.width / 2) - padding;
          const minY = -(containerRect.height / 2) + (size.height / 2) + padding;
          const maxY = (containerRect.height / 2) - (size.height / 2) - padding;
          setPosition({
            x: Math.max(minX, Math.min(maxX, newX)),
            y: Math.max(minY, Math.min(maxY, newY)),
          });
        }
      }
      if (isResizing) {
        const container = windowRef.current?.parentElement;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const deltaX = e.clientX - dragStart.x;
          const deltaY = e.clientY - dragStart.y;
          const maxWidth = Math.min(800, containerRect.width - 40);
          const maxHeight = Math.min(600, containerRect.height - 40);
          setSize(prev => ({
            width: Math.max(380, Math.min(maxWidth, prev.width + deltaX)),
            height: Math.max(280, Math.min(maxHeight, prev.height + deltaY)),
          }));
          setDragStart({ x: e.clientX, y: e.clientY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, size]);

  const executeCommand = async (cmd: string) => {
    setIsTyping(true);
    setLines(prev => [...prev, { type: 'input', content: cmd }]);

    const response = DEMO_RESPONSES[cmd.toLowerCase()] || [
      { type: 'error', content: `Command not found: ${cmd}` },
      { type: 'dim', content: 'Type "help" for available commands' },
    ];

    for (let i = 0; i < response.length; i++) {
      const line = response[i];
      const isSpinner = line.type === 'spinner';
      const delay = isSpinner ? 500 : line.type === 'banner' ? 50 : 50;

      if (isSpinner) {
        // Show spinner with animation
        const currentIdx = lines.length + i + 1;
        setActiveSpinnerIdx(currentIdx);
        setLines(prev => [...prev, line]);
        await new Promise(r => setTimeout(r, delay));
        setActiveSpinnerIdx(null);
      } else {
        await new Promise(r => setTimeout(r, delay));
        setLines(prev => [...prev, line]);
      }
    }

    setIsTyping(false);
  };

  const handleCommand = async (cmd: string) => {
    if (cmd.toLowerCase() === 'clear') {
      setLines(INITIAL_OUTPUT);
      setInput('');
      return;
    }
    await executeCommand(cmd);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim() && !isTyping) {
      handleCommand(input);
    }
  };

  const renderLine = (line: OutputLine, idx: number) => {
    const isActiveSpinner = activeSpinnerIdx === idx;

    switch (line.type) {
      case 'banner':
        return <div key={idx} className="terminal-line terminal-banner">{line.content}</div>;
      case 'input':
        return (
          <div key={idx} className="terminal-line">
            <span className="terminal-prompt">
              <span className="prompt-symbol">❯</span>
            </span>
            <span className="terminal-input-text">{line.content}</span>
          </div>
        );
      case 'success':
        return <div key={idx} className="terminal-line terminal-success">{line.content}</div>;
      case 'error':
        return <div key={idx} className="terminal-line terminal-error">{line.content}</div>;
      case 'cyan':
        return <div key={idx} className="terminal-line terminal-cyan">{line.content}</div>;
      case 'yellow':
        return <div key={idx} className="terminal-line terminal-yellow">{line.content}</div>;
      case 'intro':
        return <div key={idx} className="terminal-line terminal-intro">{line.content}</div>;
      case 'bold':
        return <div key={idx} className="terminal-line terminal-bold">{line.content}</div>;
      case 'dim':
        return <div key={idx} className="terminal-line terminal-dim">{line.content}</div>;
      case 'spinner':
        return (
          <div key={idx} className={`terminal-line terminal-spinner ${isActiveSpinner ? 'spinning' : ''}`}>
            {isActiveSpinner ? line.content : line.content.replace('◐', '✓')}
          </div>
        );
      case 'divider':
        return <div key={idx} className="terminal-line terminal-divider">{line.content}</div>;
      case 'prompt-line':
        return <div key={idx} className="terminal-line terminal-prompt-line">{line.content}</div>;
      case 'prompt-input':
        return <div key={idx} className="terminal-line terminal-prompt-input">{line.content}</div>;
      case 'box':
        return <div key={idx} className="terminal-line terminal-box">{line.content}</div>;
      case 'categories':
        return <div key={idx} className="terminal-line terminal-categories">{line.content}</div>;
      case 'empty':
        return <div key={idx} className="terminal-line">&nbsp;</div>;
      default:
        return <div key={idx} className="terminal-line">{line.content}</div>;
    }
  };

  return (
    <div
      ref={windowRef}
      className={`terminal-window ${isDragging ? 'dragging' : ''} ${isStatic ? 'static' : ''}`}
      style={isStatic ? {} : {
        width: size.width,
        height: size.height,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onClick={() => inputRef.current?.focus()}
      onMouseDown={handleMouseDown}
    >
      <div className="terminal-titlebar">
        <div className="terminal-buttons">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <span className="terminal-title">tuck — ~/.tuck</span>
        <div className="terminal-spacer"></div>
      </div>
      <div className="terminal-body" ref={terminalRef}>
        {lines.map((line, idx) => renderLine(line, idx))}
        <div className="terminal-line terminal-input-line">
          <span className="terminal-prompt" ref={promptRef}>
            <span className="prompt-symbol">❯</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            spellCheck={false}
            autoComplete="off"
            placeholder={isTyping ? '' : 'try: tuck init'}
          />
          <span
            className={`terminal-cursor ${isTyping ? 'hidden' : ''}`}
            style={{ left: `${cursorPosition}px` }}
          ></span>
          <span ref={hiddenSpanRef} className="terminal-hidden-measure"></span>
        </div>
      </div>
      {!isStatic && (
        <div
          className="terminal-resize-handle"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}
