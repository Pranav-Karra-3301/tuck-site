'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface OutputLine {
  type: 'banner' | 'input' | 'output' | 'success' | 'error' | 'dim' | 'cyan' | 'box-start' | 'box-content' | 'box-end' | 'empty' | 'progress' | 'spinner';
  content: string;
  prefix?: string;
}

// Start with empty terminal - banner shows after tuck init
const INITIAL_OUTPUT: OutputLine[] = [];

const DEMO_RESPONSES: Record<string, OutputLine[]> = {
  'tuck init': [
    { type: 'banner', content: `
 ████████╗██╗   ██╗ ██████╗██╗  ██╗
 ╚══██╔══╝██║   ██║██╔════╝██║ ██╔╝
    ██║   ██║   ██║██║     █████╔╝
    ██║   ██║   ██║██║     ██╔═██╗
    ██║   ╚██████╔╝╚██████╗██║  ██╗
    ╚═╝    ╚═════╝  ╚═════╝╚═╝  ╚═╝` },
    { type: 'dim', content: '    Modern Dotfiles Manager' },
    { type: 'empty', content: '' },
    { type: 'cyan', content: '◆  tuck init' },
    { type: 'empty', content: '' },
    { type: 'output', content: '│' },
    { type: 'output', content: '◇  Where should tuck store your dotfiles?' },
    { type: 'dim', content: '│  ~/.tuck' },
    { type: 'output', content: '│' },
    { type: 'spinner', content: '◐  Creating directory structure...' },
    { type: 'success', content: '✓  Directory structure created' },
    { type: 'spinner', content: '◐  Initializing git repository...' },
    { type: 'success', content: '✓  Git repository initialized' },
    { type: 'spinner', content: '◐  Creating manifest...' },
    { type: 'success', content: '✓  Manifest created' },
    { type: 'empty', content: '' },
    { type: 'box-start', content: '╭─────────────────────────────────────╮' },
    { type: 'box-content', content: '│  ✓ Tuck initialized successfully!  │' },
    { type: 'box-end', content: '╰─────────────────────────────────────╯' },
  ],
  'tuck add ~/.zshrc': [
    { type: 'empty', content: '' },
    { type: 'cyan', content: 'Tracking 1 file...' },
    { type: 'dim', content: '──────────────────────────────────────────────────' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  [1/1] Tracking ~/.zshrc' },
    { type: 'progress', content: '  ✓ [1/1] ~/.zshrc [shell]' },
    { type: 'empty', content: '' },
    { type: 'success', content: '✓ Tracked 1 file successfully' },
  ],
  'tuck status': [
    { type: 'empty', content: '' },
    { type: 'cyan', content: 'Repository Status' },
    { type: 'dim', content: '──────────────────────────────────────────────────' },
    { type: 'empty', content: '' },
    { type: 'output', content: '  Branch: main' },
    { type: 'success', content: '  Status: Clean' },
    { type: 'empty', content: '' },
    { type: 'cyan', content: 'Tracked Files (3)' },
    { type: 'progress', content: '  ✓ ~/.zshrc        → linked [shell]' },
    { type: 'progress', content: '  ✓ ~/.gitconfig    → linked [git]' },
    { type: 'progress', content: '  ✓ ~/.vimrc        → linked [editors]' },
    { type: 'empty', content: '' },
    { type: 'success', content: '✓ All files are synced' },
  ],
  'tuck sync': [
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Staging changes...' },
    { type: 'success', content: '✓  Changes staged' },
    { type: 'spinner', content: '◐  Creating commit...' },
    { type: 'success', content: '✓  Committed: a1b2c3d' },
    { type: 'empty', content: '' },
    { type: 'box-start', content: '╭────────────────────────────╮' },
    { type: 'box-content', content: '│  ✓ Synced successfully!   │' },
    { type: 'box-end', content: '╰────────────────────────────╯' },
  ],
  'tuck push': [
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Pushing to origin/main...' },
    { type: 'success', content: '✓  Pushed to origin/main' },
    { type: 'empty', content: '' },
    { type: 'box-start', content: '╭─────────────────────────────────────────────────╮' },
    { type: 'box-content', content: '│  Your dotfiles are now synced to GitHub!       │' },
    { type: 'box-content', content: '│                                                 │' },
    { type: 'box-content', content: '│  On a new machine, run:                         │' },
    { type: 'box-content', content: '│    tuck apply your-username                     │' },
    { type: 'box-end', content: '╰─────────────────────────────────────────────────╯' },
  ],
  'help': [
    { type: 'empty', content: '' },
    { type: 'box-start', content: '╭───────────────────────────────────╮' },
    { type: 'box-content', content: '│  tuck · Modern Dotfiles Manager  │' },
    { type: 'box-end', content: '╰───────────────────────────────────╯' },
    { type: 'empty', content: '' },
    { type: 'cyan', content: 'Quick Start:' },
    { type: 'output', content: '  tuck init          Set up tuck' },
    { type: 'output', content: '  tuck add <file>    Start tracking a dotfile' },
    { type: 'output', content: '  tuck sync          Commit your changes' },
    { type: 'output', content: '  tuck push          Push to GitHub' },
    { type: 'empty', content: '' },
    { type: 'cyan', content: 'On a New Machine:' },
    { type: 'output', content: '  tuck apply <user>  Apply dotfiles from GitHub' },
  ],
  'tuck add ~/.zshrc ~/.gitconfig': [
    { type: 'empty', content: '' },
    { type: 'cyan', content: 'Tracking 2 files...' },
    { type: 'dim', content: '──────────────────────────────────────────────────' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  [1/2] Tracking ~/.zshrc' },
    { type: 'progress', content: '  ✓ [1/2] ~/.zshrc [shell]' },
    { type: 'spinner', content: '◐  [2/2] Tracking ~/.gitconfig' },
    { type: 'progress', content: '  ✓ [2/2] ~/.gitconfig [git]' },
    { type: 'empty', content: '' },
    { type: 'success', content: '✓ Tracked 2 files successfully' },
  ],
  'tuck apply username': [
    { type: 'empty', content: '' },
    { type: 'cyan', content: '◆  tuck apply' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Fetching dotfiles from github.com/username/dotfiles...' },
    { type: 'success', content: '✓  Repository cloned' },
    { type: 'empty', content: '' },
    { type: 'output', content: 'Found 5 dotfiles to apply:' },
    { type: 'dim', content: '  • ~/.zshrc [shell]' },
    { type: 'dim', content: '  • ~/.gitconfig [git]' },
    { type: 'dim', content: '  • ~/.vimrc [editors]' },
    { type: 'dim', content: '  • ~/.tmux.conf [terminal]' },
    { type: 'dim', content: '  • ~/.config/nvim [editors]' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Creating Time Machine snapshot...' },
    { type: 'success', content: '✓  Snapshot created: 2025-01-05-143022' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Applying dotfiles...' },
    { type: 'success', content: '✓  Applied 5 files successfully' },
    { type: 'empty', content: '' },
    { type: 'box-start', content: '╭───────────────────────────────────────╮' },
    { type: 'box-content', content: '│  ✓ Dotfiles applied successfully!   │' },
    { type: 'box-content', content: '│                                      │' },
    { type: 'box-content', content: '│  Run \'tuck status\' to see details   │' },
    { type: 'box-end', content: '╰───────────────────────────────────────╯' },
  ],
  'tuck restore --all': [
    { type: 'empty', content: '' },
    { type: 'cyan', content: '◆  tuck restore --all' },
    { type: 'empty', content: '' },
    { type: 'output', content: 'Restoring all tracked dotfiles...' },
    { type: 'dim', content: '──────────────────────────────────────────────────' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  Backing up existing files...' },
    { type: 'success', content: '✓  Backups created' },
    { type: 'empty', content: '' },
    { type: 'spinner', content: '◐  [1/4] Restoring ~/.zshrc' },
    { type: 'progress', content: '  ✓ [1/4] ~/.zshrc → symlinked' },
    { type: 'spinner', content: '◐  [2/4] Restoring ~/.gitconfig' },
    { type: 'progress', content: '  ✓ [2/4] ~/.gitconfig → symlinked' },
    { type: 'spinner', content: '◐  [3/4] Restoring ~/.vimrc' },
    { type: 'progress', content: '  ✓ [3/4] ~/.vimrc → symlinked' },
    { type: 'spinner', content: '◐  [4/4] Restoring ~/.config/nvim' },
    { type: 'progress', content: '  ✓ [4/4] ~/.config/nvim → symlinked' },
    { type: 'empty', content: '' },
    { type: 'box-start', content: '╭────────────────────────────╮' },
    { type: 'box-content', content: '│  ✓ Restored 4 files       │' },
    { type: 'box-end', content: '╰────────────────────────────╯' },
  ],
};

interface TerminalProps {
  autoPlay?: boolean;
  command?: string; // Single command to auto-execute
  static?: boolean; // If true, terminal is not draggable/resizable
}

export default function Terminal({ autoPlay = false, command, static: isStatic = false }: TerminalProps) {
  const [lines, setLines] = useState<OutputLine[]>(INITIAL_OUTPUT);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 520, height: 380 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState(0);

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

  // Calculate cursor position based on input text
  useEffect(() => {
    if (hiddenSpanRef.current && promptRef.current) {
      hiddenSpanRef.current.textContent = input || '';
      // Get the prompt element's width including its margin-right (8px in CSS)
      const promptElement = promptRef.current;
      const promptWidth = promptElement.offsetWidth;
      const promptStyle = window.getComputedStyle(promptElement);
      const marginRight = parseFloat(promptStyle.marginRight) || 0;
      
      setCursorPosition(promptWidth + marginRight + hiddenSpanRef.current.offsetWidth);
    }
  }, [input]);

  // Auto-play demo on mount
  useEffect(() => {
    if (autoPlay) {
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
  }, [autoPlay]);

  // Execute single command on mount
  useEffect(() => {
    if (command && !autoPlay) {
      const runCommand = async () => {
        await new Promise(r => setTimeout(r, 800));
        await executeCommand(command);
      };
      runCommand();
    }
  }, [command, autoPlay]);

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
          const padding = 20; // Min distance from container edges

          // Calculate new position relative to container center
          const newX = e.clientX - dragStart.x;
          const newY = e.clientY - dragStart.y;

          // Calculate bounds - terminal can move freely but stay within container
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

          // Calculate max size based on container
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

    // Add input line
    setLines(prev => [...prev, { type: 'input', content: cmd }]);

    const response = DEMO_RESPONSES[cmd.toLowerCase()] || [
      { type: 'error', content: `Command not found: ${cmd}` },
      { type: 'dim', content: 'Type "help" for available commands' },
    ];

    // Simulate typing delay
    for (let i = 0; i < response.length; i++) {
      await new Promise(r => setTimeout(r, response[i].type === 'spinner' ? 400 : 80));
      setLines(prev => [...prev, response[i]]);
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
    switch (line.type) {
      case 'banner':
        return <pre key={idx} className="terminal-banner">{line.content}</pre>;
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
      case 'dim':
        return <div key={idx} className="terminal-line terminal-dim">{line.content}</div>;
      case 'progress':
        return <div key={idx} className="terminal-line terminal-progress">{line.content}</div>;
      case 'spinner':
        return <div key={idx} className="terminal-line terminal-spinner">{line.content}</div>;
      case 'box-start':
      case 'box-end':
        return <div key={idx} className="terminal-line terminal-box-border">{line.content}</div>;
      case 'box-content':
        return <div key={idx} className="terminal-line terminal-box-content">{line.content}</div>;
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
