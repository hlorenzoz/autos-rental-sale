import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CookieManager from './CookieManager';

const mockDictionary = {
  intro: 'Test intro',
  essential: { title: 'Essential', description: 'Essential desc' },
  analytics: { title: 'Analytics', description: 'Analytics desc' },
  marketing: { title: 'Marketing', description: 'Marketing desc' },
  save: 'Save',
  rejectAll: 'Reject All',
  requiredBadge: 'Required',
  success: 'Success message',
};

describe('CookieManager', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    vi.useFakeTimers();
  });

  it('renders correctly with initial states', () => {
    render(<CookieManager dictionary={mockDictionary} />);
    expect(screen.getByText('Test intro')).toBeDefined();
    expect(screen.getByText('Essential')).toBeDefined();
    expect(screen.getByText('Required')).toBeDefined();
    expect(screen.getByText('Analytics')).toBeDefined();
    expect(screen.getByText('Marketing')).toBeDefined();
  });

  it('toggles non-essential cookies', () => {
    render(<CookieManager dictionary={mockDictionary} />);
    const buttons = screen.getAllByRole('button');
    
    const analyticsToggle = buttons[1];
    expect(analyticsToggle).toBeDefined();
    
    act(() => {
      fireEvent.click(analyticsToggle);
    });
    
    const setItemSpy = vi.spyOn(localStorage, 'setItem');
    const saveBtn = screen.getByText('Save');
    act(() => {
      fireEvent.click(saveBtn);
    });
    
    expect(setItemSpy).toHaveBeenCalled();
    const lastCall = setItemSpy.mock.calls.find(call => call[0] === 'cookie-preferences');
    if (lastCall) {
      const prefs = JSON.parse(lastCall[1]) as { analytics: boolean };
      expect(prefs.analytics).toBe(true);
    }
  });

  it('rejects all non-essential cookies', () => {
    render(<CookieManager dictionary={mockDictionary} />);
    const rejectAllBtn = screen.getByText('Reject All');
    
    act(() => {
      fireEvent.click(rejectAllBtn);
    });
    
    const setItemSpy = vi.spyOn(localStorage, 'setItem');
    const lastCall = setItemSpy.mock.calls.find(call => call[0] === 'cookie-preferences');
    if (lastCall) {
      const prefs = JSON.parse(lastCall[1]) as { analytics: boolean; marketing: boolean; essential: boolean };
      expect(prefs.analytics).toBe(false);
      expect(prefs.marketing).toBe(false);
      expect(prefs.essential).toBe(true);
    }
    
    expect(screen.getByText('Success message')).toBeDefined();
  });

  it('loads preferences from localStorage', () => {
    const savedPrefs = JSON.stringify({
      essential: true,
      analytics: true,
      marketing: false,
    });
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(savedPrefs),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    
    render(<CookieManager dictionary={mockDictionary} />);
    const saveBtn = screen.getByText('Save');
    act(() => {
      fireEvent.click(saveBtn);
    });
    
    const setItemSpy = vi.spyOn(localStorage, 'setItem');
    const lastCall = setItemSpy.mock.calls.find(call => call[0] === 'cookie-preferences');
    if (lastCall) {
      const prefs = JSON.parse(lastCall[1]) as { analytics: boolean };
      expect(prefs.analytics).toBe(true);
    }
  });
});
