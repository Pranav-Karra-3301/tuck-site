'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from './ThemeProvider';

// Returns false during SSR and the first client (hydration) render, then true.
const noopSubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // The persisted preference is only known on the client. To keep the first
  // client render identical to the server render (which always sees 'system'),
  // defer reflecting the real active theme until after hydration. Prevents a
  // hydration attribute mismatch for returning visitors with a stored theme,
  // without a setState-in-effect (forbidden by the lint config).
  const hydrated = useHydrated();
  const active = hydrated ? theme : 'system';

  return (
    <div className="theme-toggle">
      <button
        onClick={() => setTheme('system')}
        className={`theme-btn ${active === 'system' ? 'active' : ''}`}
        aria-label="System theme"
        title="System"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </button>
      <button
        onClick={() => setTheme('light')}
        className={`theme-btn ${active === 'light' ? 'active' : ''}`}
        aria-label="Light theme"
        title="Light"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`theme-btn ${active === 'dark' ? 'active' : ''}`}
        aria-label="Dark theme"
        title="Dark"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    </div>
  );
}

