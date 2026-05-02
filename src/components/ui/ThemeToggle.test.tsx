import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ThemeToggle from './ThemeToggle';

const lightLabel = 'Switch to light mode';
const darkLabel = 'Switch to dark mode';

function mockMatchMedia(prefersDark: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn().mockReturnValue(null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  });
  document.documentElement.classList.remove('dark');
  mockMatchMedia(false);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ThemeToggle', () => {
  it('renders in light mode by default when no preference set', () => {
    render(<ThemeToggle lightLabel={lightLabel} darkLabel={darkLabel} />);
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-label')).toBe(darkLabel);
  });

  it('renders in dark mode when localStorage has "dark"', () => {
    vi.stubGlobal('localStorage', { getItem: vi.fn().mockReturnValue('dark'), setItem: vi.fn(), removeItem: vi.fn() });
    act(() => {
      render(<ThemeToggle lightLabel={lightLabel} darkLabel={darkLabel} />);
    });
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-label')).toBe(lightLabel);
  });

  it('renders in light mode when localStorage has "light"', () => {
    vi.stubGlobal('localStorage', { getItem: vi.fn().mockReturnValue('light'), setItem: vi.fn(), removeItem: vi.fn() });
    act(() => {
      render(<ThemeToggle lightLabel={lightLabel} darkLabel={darkLabel} />);
    });
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-label')).toBe(darkLabel);
  });

  it('uses system preference (dark) when no localStorage entry', () => {
    mockMatchMedia(true);
    act(() => {
      render(<ThemeToggle lightLabel={lightLabel} darkLabel={darkLabel} />);
    });
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-label')).toBe(lightLabel);
  });

  it('toggles to dark on click from light and updates localStorage', () => {
    const setItemSpy = vi.fn();
    vi.stubGlobal('localStorage', { getItem: vi.fn().mockReturnValue(null), setItem: setItemSpy, removeItem: vi.fn() });
    act(() => {
      render(<ThemeToggle lightLabel={lightLabel} darkLabel={darkLabel} />);
    });
    const btn = screen.getByRole('button');
    act(() => { fireEvent.click(btn); });
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(btn.getAttribute('aria-label')).toBe(lightLabel);
  });

  it('toggles back to light on second click', () => {
    const setItemSpy = vi.fn();
    vi.stubGlobal('localStorage', { getItem: vi.fn().mockReturnValue(null), setItem: setItemSpy, removeItem: vi.fn() });
    act(() => {
      render(<ThemeToggle lightLabel={lightLabel} darkLabel={darkLabel} />);
    });
    const btn = screen.getByRole('button');
    act(() => { fireEvent.click(btn); });
    act(() => { fireEvent.click(btn); });
    expect(setItemSpy).toHaveBeenLastCalledWith('theme', 'light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(btn.getAttribute('aria-label')).toBe(darkLabel);
  });
});
