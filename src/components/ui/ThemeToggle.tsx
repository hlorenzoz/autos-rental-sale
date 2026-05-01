import { useState, useEffect } from 'react';

interface ThemeToggleProps {
  lightLabel: string;
  darkLabel: string;
}

export default function ThemeToggle({ lightLabel, darkLabel }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
    } else if (stored === 'light') {
      setIsDark(false);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? lightLabel : darkLabel}
      className="rounded-full w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors duration-300"
    >
      {isDark ? (
        <span className="material-symbols-outlined filled">dark_mode</span>
      ) : (
        <span className="material-symbols-outlined filled">light_mode</span>
      )}
    </button>
  );
}
